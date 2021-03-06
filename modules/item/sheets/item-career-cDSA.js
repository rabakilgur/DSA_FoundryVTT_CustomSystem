import ItemSheetcDSA from "../item-sheet.js"
import cDSA from "../../system/config-cDSA.js"

export default class ItemCareercDSA extends ItemSheetcDSA {
    constructor(item, options) {
        options.width = 700
        options.height = 700
        super(item, options);
        this.mce = null;
    }

    async getData() {
        const data = await super.getData();
        let chars = duplicate(cDSA.characteristics)
        chars["-"] = "-"
        data["mageLevels"] = cDSA.mageLevels
        data['guidevalues'] = chars;
        return data
    }
}