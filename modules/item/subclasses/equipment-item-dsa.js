import ItemcDSA from "../item-cDSA.js";

export default class EquipmentItemcDSA extends ItemcDSA {
	static chatData(data, name) {
		return [
			this._chatLineHelper("equipmentType", game.i18n.localize(data.equipmentType.value))
		]
	}
}