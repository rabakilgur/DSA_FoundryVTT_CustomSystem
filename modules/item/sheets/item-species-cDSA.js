import ItemSheetcDSA from "../item-sheet.js"

export default class ItemSpeciescDSA extends ItemSheetcDSA {
    constructor(item, options) {
        options.width = 530
        options.height = 570
        super(item, options);
        this.mce = null;
    }

    async getData() {
        const data = await super.getData();
        data['hasLocalization'] = game.i18n.has(`Racedescr.${this.item.name}`)
        return data
    }
}