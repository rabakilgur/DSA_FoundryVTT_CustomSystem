import cDSAStatusEffects from "../../status/status_effects.js"
import AdvantageRulescDSA from "../../system/advantage-rules-cDSA.js"
import cDSA from "../../system/config-cDSA.js"
import DicecDSA from "../../system/dice-cDSA.js"
import ItemcDSA from "../item-cDSA.js"
import ActorcDSA from "../../actor/actor-cDSA.js";
export default class TraitItemcDSA extends ItemcDSA {

	static chatData(data, name) {
		let res = []
		switch (data.traitType.value) {
			case "meleeAttack":
				res = [
					this._chatLineHelper("attack", data.at.value),
					this._chatLineHelper("damage", data.damage.value),
					this._chatLineHelper("reach", data.reach.value)
				]
			case "rangeAttack":
				res = [
					this._chatLineHelper("attack", data.at.value),
					this._chatLineHelper("damage", data.damage.value),
					this._chatLineHelper("reach", data.reach.value),
					this._chatLineHelper("reloadTime", data.reloadTime.value)
				]
			case "armor":
				res = [
					this._chatLineHelper("protection", data.damage.value),
				]
			case "general":
				res = []
			case "familiar":
				res = [
					this._chatLineHelper("APValue", data.APValue.value),
					this._chatLineHelper("AsPCost", data.AsPCost.value),
					this._chatLineHelper("duration", data.duration.value),
					this._chatLineHelper("aspect", data.aspect.value)
				]
		}
		if (data.effect.value != "")
			res.push(this._chatLineHelper("effect", data.effect.value))
		return res
	}
	static getSituationalModifiers(situationalModifiers, actor, data, source) {
		source = source.data ? (source.data.data == undefined ? source : source.data) : source
		let traitType = source.data.traitType.value
		let combatSpecAbs = actor.items.filter(x => x.type == "specialability" && ["Combat", "animal"].includes(x.data.data.category.value) && x.data.data.effect.value != "")
		let combatskills = []
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
		if (data.mode == "attack" && traitType == "meleeAttack") {
			let targetWeaponsize = "short"
			if (game.user.targets.size) {
				game.user.targets.forEach(target => {
					let defWeapon = target.actor.items.filter(x => x.data.type == "meleeweapon" && x.data.data.worn.value)
					if (defWeapon.length > 0)
						targetWeaponsize = defWeapon[0].data.data.reach.value
				});
			}
			mergeObject(data, {
				weaponSizes: cDSA.meleeRanges,
				melee: true,
				showAttack: true,
				targetWeaponSize: targetWeaponsize,
				combatSpecAbs: combatskills
			});
		} else if (data.mode == "attack" && traitType == "rangeAttack") {
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
		let mode = options["mode"]
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
				let attackOfOpportunity = html.find('[name="opportunityAttack"]').is(":checked") ? -4 : 0
				testData.attackOfOpportunity = attackOfOpportunity != 0
				testData.situationalModifiers.push({
					name: game.i18n.localize("opportunityAttack"),
					value: attackOfOpportunity
				}, {
					name: game.i18n.localize("attackFromBehind"),
					value: html.find('[name="attackFromBehind"]').is(":checked") ? -4 : 0
				}, {
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
				testData.situationalModifiers.push(...ItemcDSA.getSpecAbModifiers(html, mode))
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
