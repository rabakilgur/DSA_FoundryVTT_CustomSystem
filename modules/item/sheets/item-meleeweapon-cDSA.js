import ItemSheetcDSA from "../item-sheet.js";
import cDSA from "../../system/config-cDSA.js"
import cDSA_Utility from "../../system/utility-cDSA.js";


export default class MeleeweaponSheetcDSA extends ItemSheetcDSA {
	async getData() {
		const data = await super.getData()
		let chars = cDSA.characteristics;
		chars["ge/kk"] = game.i18n.localize("CHAR.GEKK")
		chars["-"] = "-";
		data['characteristics'] = chars;
		data['twoHanded'] = /\(2H/.test(this.item.name)
		data['combatskills'] = await cDSA_Utility.allCombatSkillsList("melee")
		data['ranges'] = cDSA.meleeRanges;
		if (this.item.options.actor) {
			let combatSkill = this.item.options.actor.data.items.find(x => x.type == "combatskill" && x.name == this.item.data.data.combatskill.value)
			data['canBeOffHand'] = combatSkill && !(combatSkill.data.weapontype.twoHanded) && this.item.data.data.worn.value
		}
		data['isShield'] = this.item.data.data.combatskill.value == game.i18n.localize("LocalizedIDs.shields")
		data['shieldSizes'] = cDSA.shieldSizes
		return data
	}
}