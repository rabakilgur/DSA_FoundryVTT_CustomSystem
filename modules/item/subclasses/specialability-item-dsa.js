import ItemcDSA from "../item-cDSA.js";

export default class SpecialAbilityItemcDSA extends ItemcDSA {
    static chatData(data, name) {
        return [
            this._chatLineHelper("rule", data.rule.value),
        ]
    }
}