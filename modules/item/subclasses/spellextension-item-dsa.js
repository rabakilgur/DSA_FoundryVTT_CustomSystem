import ItemcDSA from "../item-cDSA.js";

export default class SpellextensionItemcDSA extends ItemcDSA {
    static chatData(data, name) {
        return [
            this._chatLineHelper("target", data.source),
            this._chatLineHelper("category", data.category),
        ]
    }
}