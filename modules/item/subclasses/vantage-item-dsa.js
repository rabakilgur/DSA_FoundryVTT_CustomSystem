import ItemcDSA from "../item-cDSA.js";

export default class VantageItemcDSA extends ItemcDSA {
	static chatData(data, name) {
		return [
			this._chatLineHelper("effect", data.effect.value),
		]
	}
}