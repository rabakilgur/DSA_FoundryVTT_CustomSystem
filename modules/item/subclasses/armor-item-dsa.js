import ItemcDSA from "../item-cDSA.js"

export default class ArmorItemcDSA extends ItemcDSA {
	static chatData(data, name) {
		let properties = [
			this._chatLineHelper("protection", data.protection.value),
			this._chatLineHelper("encumbrance", data.encumbrance.value)
		]
		if (data.effect.value != "")
			properties.push(this._chatLineHelper("effect", data.effect.value))

		return properties
	}
}