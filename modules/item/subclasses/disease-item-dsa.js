import DicecDSA from "../../system/dice-cDSA.js";
import cDSA_Utility from "../../system/utility-cDSA.js";
import ItemcDSA from "../item-cDSA.js";

export default class DiseaseItemcDSA extends ItemcDSA {
	static chatData(data, name) {
		return [
			this._chatLineHelper("stepValue", data.step.value),
			this._chatLineHelper("incubation", data.incubation.value),
			this._chatLineHelper("damage", cDSA_Utility.replaceDies(data.damage.value)),
			this._chatLineHelper("duration", data.duration.value),
			this._chatLineHelper("source", cDSA_Utility.replaceDies(data.source.value)),
			this._chatLineHelper("treatment", data.treatment.value),
			this._chatLineHelper("antidot", data.antidot.value),
			this._chatLineHelper("resistanceModifier", data.resistance.value)
		]
	}
	static getSituationalModifiers(situationalModifiers, actor, data, source) {
		source = source.data ? (source.data.data == undefined ? source : source.data) : source
		let skMod = 0
		let zkMod = 0
		if (game.user.targets.size) {
			game.user.targets.forEach(target => {
				skMod = target.actor.data.data.status.soulpower.max * -1
				zkMod = target.actor.data.data.status.toughness.max * -1
				situationalModifiers.push(...AdvantageRulescDSA.getVantageAsModifier(target.actor.data, game.i18n.localize("LocalizedIDs.ResistanttoDisease"), -1))
			});
		}
		mergeObject(data, {
			SKModifier: skMod,
			ZKModifier: zkMod,
			hasSKModifier: source.data.resistance.value == "SK",
			hasZKModifier: source.data.resistance.value == "ZK"
		})
	}
	static setupDialog(ev, options, item, actor) {
		let title = item.name + " " + game.i18n.localize(item.type) + " " + game.i18n.localize("Test");

		let testData = {
			opposable: false,
			source: item.data,
			extra: {
				options: options
			}
		};
		let data = {
			rollMode: options.rollMode
		}
		let situationalModifiers = []
		this.getSituationalModifiers(situationalModifiers, actor, data, item)
		data["situationalModifiers"] = situationalModifiers

		let dialogOptions = {
			title: title,
			template: "/systems/cDSA_beta/templates/dialog/poison-dialog.html",
			data: data,
			callback: (html) => {
				cardOptions.rollMode = html.find('[name="rollMode"]').val();
				testData.testModifier = Number(html.find('[name="testModifier"]').val());
				testData.situationalModifiers = ActorcDSA._parseModifiers('[name="situationalModifiers"]')
				testData.situationalModifiers.push({
					name: game.i18n.localize("zkModifier"),
					value: html.find('[name="zkModifier"]').val() || 0
				})
				testData.situationalModifiers.push({
					name: game.i18n.localize("skModifier"),
					value: html.find('[name="skModifier"]').val() || 0
				})
				return { testData, cardOptions };
			}
		};

		let cardOptions = item._setupCardOptions(`systems/cDSA_beta/templates/chat/roll/${item.type}-card.html`, title)

		return DicecDSA.setupDialog({
			dialogOptions: dialogOptions,
			testData: testData,
			cardOptions: cardOptions
		});
	}
}
