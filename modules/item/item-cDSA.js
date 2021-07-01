import cDSA_Utility from "../system/utility-cDSA.js";
import DicecDSA from "../system/dice-cDSA.js"

export default class ItemcDSA extends Item {
	static defaultImages = {
		"advantage": "systems/cDSA_beta/icons/categories/Vorteil.webp",
		"disadvantage": "systems/cDSA_beta/icons/categories/Nachteil.webp",
		"armor": "systems/cDSA_beta/icons/categories/Armor.webp",
		"meleeweapon": "systems/cDSA_beta/icons/categories/Meleeweapon.webp",
		"rangeweapon": "systems/cDSA_beta/icons/categories/Rangeweapon.webp",
		"equipment": "systems/cDSA_beta/icons/categories/Equipment.webp",
		"consumable": "systems/cDSA_beta/icons/categories/Equipment.webp",
		"liturgy": "systems/cDSA_beta/icons/categories/Liturgy.webp",
		"spell": "systems/cDSA_beta/icons/categories/Spell.webp",
		"ammunition": "systems/cDSA_beta/icons/categories/Munition.webp",
		"career": "systems/cDSA_beta/icons/categories/Career.webp",
		"magictrick": "systems/cDSA_beta/icons/categories/Spelltrick.webp",
		"blessing": "systems/cDSA_beta/icons/categories/Blessing.webp",
		"combatskill": "systems/cDSA_beta/icons/categories/Combat_Skill.webp",
		"skill": "systems/cDSA_beta/icons/categories/Skill.webp",
		"Geweihte": "systems/cDSA_beta/icons/categories/Geweihte.webp",
		"Weltliche": "systems/cDSA_beta/icons/categories/Weltliche.webp",
		"Zauberer": "systems/cDSA_beta/icons/categories/Zauberer.webp",
		"ritual": "systems/cDSA_beta/icons/categories/ritual.webp",
		"ceremony": "systems/cDSA_beta/icons/categories/ceremony.webp",
		"abilityclerical": "systems/cDSA_beta/icons/categories/ability_clerical.webp",
		"abilityCombat": "systems/cDSA_beta/icons/categories/ability_combat.webp",
		"abilityfatePoints": "systems/cDSA_beta/icons/categories/ability_fate_points.webp",
		"abilitygeneral": "systems/cDSA_beta/icons/categories/ability_general.webp",
		"specialability": "systems/cDSA_beta/icons/categories/ability_general.webp",
		"abilitymagical": "systems/cDSA_beta/icons/categories/ability_magical.webp",
		"abilitylanguage": "systems/cDSA_beta/icons/categories/Ability_Language.webp",
		"abilitystaff": "systems/cDSA_beta/icons/categories/ability_staff.webp",
		"abilityanimal": "systems/cDSA_beta/icons/categories/ability_animal.webp",
		"trait": "systems/cDSA_beta/icons/categories/trait.webp",
		"Tiere": "systems/cDSA_beta/icons/categories/Tiere.webp",
		"aggregatedTest": "systems/cDSA_beta/icons/categories/aggregated_test.webp",
		"poison": "systems/cDSA_beta/icons/categories/poison.webp",
		"disease": "systems/cDSA_beta/icons/categories/disease.webp",
		"spellextension": "systems/cDSA_beta/icons/categories/Spellextension.webp",
		"species": "icons/environment/people/group.webp"
	}

	static defaultIcon(data) {
		if (!data.img || data.img == "") {
			if (data.type in this.defaultImages) {
				data.img = this.defaultImages[data.type]
			} else {
				data.img = "systems/cDSA_beta/icons/blank.webp";
			}
		}
	}

	static async create(data, options) {
		this.defaultIcon(data)
		super.create(data, options);
	}

	static getSpecAbModifiers(html, mode) {
		let res = []
		for (let k of html.find('.specAbs')) {
			let step = Number($(k).attr("data-step"))
			if (step > 0) {
				let val = mode == "attack" ? $(k).attr("data-atbonus") : $(k).attr("data-pabonus")
				res.push({
					name: $(k).find('a').text(),
					value: Number(val) * step,
					damageBonus: $(k).attr("data-tpbonus"),
					step: step
				})
			}
		}
		return res
	}

	static parseEffect(effect, actor) {
		let itemModifiers = {}
		let regex = new RegExp(game.i18n.localize("CHARAbbrev.GS"), "gi")
		for (let mod of effect.split(",").map(x => x.trim())) {
			let vals = mod.replace(/(\s+)/g, ' ').trim().split(" ")
			vals[0] = vals[0].replace(regex, actor.data.data.status.speed.max)
			if (vals.length == 2) {
				if (!isNaN(vals[0]) || /[+-]\d[+-]\d/.test(vals[0]) || /\d[dDwW]\d/.test(vals[0])) {
					if (itemModifiers[vals[1].toLowerCase()] == undefined) {
						itemModifiers[vals[1].toLowerCase()] = [vals[0]]
					} else {
						itemModifiers[vals[1].toLowerCase()].push(vals[0])
					}
				}
			}
		}
		return itemModifiers
	}

	static _chatLineHelper(key, val) {
		return `<b>${game.i18n.localize(key)}</b>: ${val ? val : "-"}`
	}

	static setupDialog(ev, options, item, actor) {
		return null
	}

	setupEffect(ev, options = {}) {
		return ItemcDSA.getSubClass(this.data.type).setupDialog(ev, options, this)
	}

	static checkEquality(item, item2) {
		return item2.type == item.type && item.name == item2.name && item.data.description.value == item2.data.description.value
	}

	static async combineItem(item1, item2, actor) {
		item1 = duplicate(item1)
		item1.data.quantity.value += item2.data.quantity.value
		await actor.updateEmbeddedEntity("OwnedItem", item1)
	}

	static areEquals(item, item2) {
		if (item.type != item2.type)
			return false
		return ItemcDSA.getSubClass(item.type).checkEquality(item, item2)
	}

	static async stackItems(stackOn, newItem, actor) {
		return ItemcDSA.getSubClass(stackOn.type).combineItem(stackOn, newItem, actor)
	}

	_setupCardOptions(template, title) {
		let speaker = ChatMessage.getSpeaker()
			//if (speaker.actor == this.data._id) {
		return {
			speaker: {
				alias: speaker.alias,
				scene: speaker.scene
			},
			flags: {
				img: speaker.token ? canvas.tokens.get(speaker.token).data.img : this.img
			},
			title: title,
			template: template,
		}
	}

	async itemTest({ testData, cardOptions }, options = {}) {
		testData = await DicecDSA.rollDices(testData, cardOptions);
		let result = DicecDSA.rollTest(testData);

		result.postFunction = "itemTest";

		if (game.user.targets.size) {
			cardOptions.isOpposedTest = testData.opposable
			if (cardOptions.isOpposedTest)
				cardOptions.title += ` - ${game.i18n.localize("Opposed")}`;
			else {
				game.user.updateTokenTargets([]);
			}
		}

		if (testData.extra.ammo && !testData.extra.ammoDecreased) {
			testData.extra.ammoDecreased = true
			testData.extra.ammo.data.quantity.value--;
			this.updateEmbeddedEntity("OwnedItem", { _id: testData.extra.ammo._id, "data.quantity.value": testData.extra.ammo.data.quantity.value });
		}

		if (!options.suppressMessage)
			DicecDSA.renderRollCard(cardOptions, result, options.rerenderMessage).then(msg => {
				//OpposedcDSA.handleOpposedTarget(msg)
			})

		return { result, cardOptions };
	}



	static chatData(data, name) {
		return []
	}

	static getSubClass(type) {
		if (game.cDSA.config.ItemSubclasses[type])
			return game.cDSA.config.ItemSubclasses[type]
		else
			return ItemcDSA
	}

	async postItem() {
		let chatData = duplicate(this.data);
		const properties = ItemcDSA.getSubClass(this.data.type).chatData(duplicate(chatData.data), this.name)

		chatData["properties"] = properties

		chatData.hasPrice = "price" in chatData.data;
		if (chatData.hasPrice) {
			let price = chatData.data.price.value;
			if (chatData.data.QL)
				price *= chatData.data.QL

			chatData.data.price.D = Math.floor(price / 10);
			price -= chatData.data.price.D * 10;
			chatData.data.price.S = Math.floor(price);
			price -= chatData.data.price.S;
			chatData.data.price.H = Math.floor(price / 0.1);
			price -= (chatData.data.price.H * 0.1);
			chatData.data.price.K = Math.round(price / 0.01);

			properties.push(`<b>${game.i18n.localize("price")}</b>: ${chatData.data.price.D} <div title="${game.i18n.localize("Money-D")}" class="chatmoney money-D"></div>, ${chatData.data.price.S} <div title="${game.i18n.localize("Money-S")}" class="chatmoney money-S"></div>, ${chatData.data.price.H} <div title="${game.i18n.localize("Money-H")}" class="chatmoney money-H"></div>, ${chatData.data.price.K} <div title="${game.i18n.localize("Money-K")}" class="chatmoney money-K"></div>`);
		}

		if (chatData.img.includes("/blank.webp"))
			chatData.img = null;

		renderTemplate('systems/cDSA_beta/templates/chat/post-item.html', chatData).then(html => {
			let chatOptions = cDSA_Utility.chatDataSetup(html)

			chatOptions["flags.transfer"] = JSON.stringify({
				type: "postedItem",
				payload: this.data,
			})
			chatOptions["flags.recreationData"] = chatData;
			ChatMessage.create(chatOptions)
		});
	}

}
