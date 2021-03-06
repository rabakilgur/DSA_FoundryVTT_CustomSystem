import ItemSheetcDSA from "../item-sheet.js";

export default class SpellExtensionSheetcDSA extends ItemSheetcDSA {
    async getData() {
        const data = await super.getData();
        data['categories'] = ["spell", "liturgy", "ritual", "ceremony"]
        return data
    }
}