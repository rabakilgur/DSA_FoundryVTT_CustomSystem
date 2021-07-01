import cDSAStatusEffects from "../../status/status_effects.js";
import AdvantageRulescDSA from "../../system/advantage-rules-cDSA.js";
import cDSA from "../../system/config-cDSA.js";
import DicecDSA from "../../system/dice-cDSA.js";
import ItemcDSA from "../item-cDSA.js";
import ActorcDSA from "../../actor/actor-cDSA.js";
import cDSA_Utility from "../../system/utility-cDSA.js";
export default class RangeweaponItemcDSA extends ItemcDSA {
	static chatData(data, name) {
		let res = [
			this._chatLineHelper("damage", data.damage.value),
			this._chatLineHelper("combatskill", data.combatskill.value),
			this._chatLineHelper("reach", data.reach.value)
		]
		if (data.effect.value != "")
			res.push(this._chatLineHelper(cDSA_Utility.replaceConditions("effect", data.effect.value)))

		return res
	}
	static getSituationalModifiers(situationalModifiers, actor, data, source) {
		if (data.mode == "attack") {
			source = source.data ? (source.data.data == undefined ? source : source.data) : source
			let toSearch = [source.data.combatskill.value.toLowerCase(), game.i18n.localize("LocalizedIDs.all")]
			let combatSpecAbs = actor.items.filter(x => x.type == "specialability" && x.data.data.category.value == "Combat" && x.data.data.effect.value != "" && x.data.data.list.value.split(",").map(x => x.trim().toLowerCase()).filter(y => toSearch.includes(y)).length > 0)
			let combatskills = []
			situationalModifiers.push(...AdvantageRulescDSA.getVantageAsModifier(actor.data, game.i18n.localize('LocalizedIDs.restrictedSenseSight'), -2))
			let targetSize = "average"
			if (game.user.targets.size) {
				game.user.targets.forEach(target => {
					let tar = target.actor.data.data.size
					if (tar)
						targetSize = tar.value
				});
			}
			let rangeOptions = {...cDSA.rangeWeaponModifiers }
			delete rangeOptions[AdvantageRulescDSA.hasVantage(actor, game.i18n.localize('LocalizedIDs.senseOfRange')) ? "long" : "rangesense"]
			for (let com of combatSpecAbs) {
				let effects = ItemcDSA.parseEffect(com.data.data.effect.value, actor)

				let bonus = effects[game.i18n.localize("LocalizedAbilityModifiers.at")] || 0
				let tpbonus = effects[game.i18n.localize("LocalizedAbilityModifiers.tp")] || 0
				if (bonus != 0 || tpbonus != 0)
					combatskills.push({
						name: com.name,
						atbonus: bonus,
						tpbonus: tpbonus,
						label: `${game.i18n.localize("LocalizedAbilityModifiers.at")}: ${bonus}, ${game.i18n.localize("LocalizedAbilityModifiers.tp")}: ${tpbonus}`,
						steps: com.data.data.step.value
					})
			}
			mergeObject(data, {
				rangeOptions: rangeOptions,
				sizeOptions: cDSA.rangeSizeCategories,
				visionOptions: cDSA.rangeVision,
				mountedOptions: cDSA.mountedRangeOptions,
				shooterMovementOptions: cDSA.shooterMovementOptions,
				targetMovementOptions: cDSA.targetMomevementOptions,
				targetSize: targetSize,
				combatSpecAbs: combatskills,
				aimOptions: cDSA.aimOptions
			});
		}
	}

	static setupDialog(ev, options, item, actor) {
		let mode = options.mode
		let title = game.i18n.localize(item.name) + " " + game.i18n.localize(mode + "test");

		let testData = {
			opposable: true,
			source: item,
			mode: mode,
			extra: {
				actor: actor.data,
				options: options
			}
		};

		if (actor.data.type != "creature" && mode != "damage") {
			let itemData = item.data.data ? item.data.data : item.data

			if (itemData.ammunitiongroup.value == "-") {
				testData.extra.ammo = duplicate(item)
				if ((testData.extra.ammo.data.quantity.value <= 0)) {
					ui.notifications.error(game.i18n.localize("DSAError.NoAmmo"))
					return
				}
			} else {
				testData.extra.ammo = duplicate(actor.getEmbeddedEntity("OwnedItem", itemData.currentAmmo.value))
				if (!testData.extra.ammo || itemData.currentAmmo.value == "" || testData.extra.ammo.data.quantity.value <= 0) {
					ui.notifications.error(game.i18n.localize("DSAError.NoAmmo"))
					return
				}
			}
		}

		let data = {
			rollMode: options.rollMode,
			mode: mode
		}
		let situationalModifiers = actor ? cDSAStatusEffects.getRollModifiers(actor, item, { mode: mode }) : []
		this.getSituationalModifiers(situationalModifiers, actor, data, item)
		data["situationalModifiers"] = situationalModifiers

		let dialogOptions = {
			title: title,
			template: "/systems/cDSA_beta/templates/dialog/combatskill-enhanced-dialog.html",
			data: data,
			callback: (html) => {
				cardOptions.rollMode = html.find('[name="rollMode"]').val();
				testData.testModifier = Number(html.find('[name="testModifier"]').val());
				testData.situationalModifiers = ActorcDSA._parseModifiers('[name="situationalModifiers"]')
				testData.rangeModifier = html.find('[name="distance"]').val()
				testData.sizeModifier = cDSA.rangeSizeModifier[html.find('[name="size"]').val()]
				testData.visionModifier = Number(html.find('[name="vision"]').val())
				testData.opposingWeaponSize = html.find('[name="weaponsize"]').val()
				testData.defenseCount = Number(html.find('[name="defenseCount"]').val())
				testData.narrowSpace = html.find('[name="narrowSpace"]').is(":checked")
				testData.doubleAttack = html.find('[name="doubleAttack"]').is(":checked") ? -2 : 0
				testData.wrongHand = html.find('[name="wrongHand"]').is(":checked") ? -4 : 0
				testData.situationalModifiers.push({
					name: game.i18n.localize("target") + " " + html.find('[name="targetMovement"] option:selected').text(),
					value: Number(html.find('[name="targetMovement"]').val()) || 0
				}, {
					name: game.i18n.localize("shooter") + " " + html.find('[name="shooterMovement"] option:selected').text(),
					value: Number(html.find('[name="shooterMovement"]').val()) || 0
				}, {
					name: game.i18n.localize("mount") + " " + html.find('[name="mountedOptions"] option:selected').text(),
					value: Number(html.find('[name="mountedOptions"]').val()) || 0
				}, {
					name: game.i18n.localize("rangeMovementOptions.QUICKCHANGE"),
					value: html.find('[name="quickChange"]').is(":checked") ? -4 : 0
				}, {
					name: game.i18n.localize("MODS.combatTurmoil"),
					value: html.find('[name="combatTurmoil"]').is(":checked") ? -2 : 0
				}, {
					name: game.i18n.localize("aim"),
					value: Number(html.find('[name="aim"]').val()) || 0
				})
				testData.situationalModifiers.push(...ItemcDSA.getSpecAbModifiers(html, "attack"))
				return { testData, cardOptions };
			}
		};

		let cardOptions = actor._setupCardOptions("systems/cDSA_beta/templates/chat/roll/combatskill-card.html", title)

		return DicecDSA.setupDialog({
			dialogOptions: dialogOptions,
			testData: testData,
			cardOptions: cardOptions
		});
	}
}
