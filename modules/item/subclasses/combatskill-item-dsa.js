import ActorcDSA from "../../actor/actor-cDSA.js";
import DicecDSA from "../../system/dice-cDSA.js";
import ItemcDSA from "../item-cDSA.js";

export default class CombatskillcDSA extends ItemcDSA {
	static chatData(data, name) {
		return [
			this._chatLineHelper("Description", game.i18n.localize(`Combatskilldescr.${name}`)),
		]
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

		let dialogOptions = {
			title: title,
			template: "/systems/cDSA_beta/templates/dialog/combatskill-dialog.html",
			data: {
				rollMode: options.rollMode
			},
			callback: (html) => {
				cardOptions.rollMode = html.find('[name="rollMode"]').val();
				testData.testModifier = Number(html.find('[name="testModifier"]').val());
				testData.situationalModifiers = ActorcDSA._parseModifiers('[name="situationalModifiers"]')
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
