import ItemSheetcDSA from "../item-sheet.js";
import cDSA from "../../system/config-cDSA.js"

export default class DiseaseSheetcDSA extends ItemSheetcDSA {
	_getHeaderButtons() {
		let buttons = super._getHeaderButtons();
		buttons.unshift({
			class: "rolleffect",
			icon: `fas fa-dice-d20`,
			onclick: async ev => this.setupEffect(ev)
		})
		return buttons
	}
	async getData() {
		const data = await super.getData()
		data["resistances"] = cDSA.magicResistanceModifiers
		return data
	}
}