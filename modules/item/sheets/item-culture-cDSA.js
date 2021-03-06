import ItemSheetcDSA from "../item-sheet.js"

export default class ItemCulturecDSA extends ItemSheetcDSA {
    constructor(item, options) {
        options.width = 700
        options.height = 700
        super(item, options);
        this.mce = null;
    }

}