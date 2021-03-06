import ItemcDSA from "../item-cDSA.js";

export default class AmmunitionItemcDSA extends ItemcDSA {
    static chatData(data, name) {
        return [
            this._chatLineHelper("ammunitiongroup", game.i18n.localize(data.ammunitiongroup.value))
        ]
    }
}