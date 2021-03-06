import ItemcDSA from "../item-cDSA.js";

export default class CantripItemcDSA extends ItemcDSA {
    static chatData(data, name) {
        return [
            this._chatLineHelper("duration", data.duration.value),
            this._chatLineHelper("targetCategory", data.targetCategory.value),
            this._chatLineHelper("feature", data.feature.value),
        ]
    }
}