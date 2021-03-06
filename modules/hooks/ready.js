import RitualItemcDSA from "../item/subclasses/ritual-item-dsa.js";
import SpellItemcDSA from "../item/subclasses/spell-item-dsa.js";
import DiseaseItemcDSA from "../item/subclasses/disease-item-dsa.js";
import cDSATutorial from "../system/tutorial.js";
import LiturgyItemcDSA from "../item/subclasses/liturgy-item-dsa.js";
import CeremonyItemcDSA from "../item/subclasses/ceremony-item-dsa.js";
import VantageItemcDSA from "../item/subclasses/vantage-item-dsa.js";
import aggregatedTestItemcDSA from "../item/subclasses/aggregatedTest-item-dsa.js";
import TraitItemcDSA from "../item/subclasses/trait-item-dsa.js";
import BlessingItemcDSA from "../item/subclasses/blessing-item-dsa.js";
import CantripItemcDSA from "../item/subclasses/cantrip-item-dsa.js";
import SpecialAbilityItemcDSA from "../item/subclasses/specialability-item-dsa.js";
import PoisonItemcDSA from "../item/subclasses/poison-item-dsa.js";
import ArmorItemcDSA from "../item/subclasses/armor-item-dsa.js";
import RangeweaponItemcDSA from "../item/subclasses/rangeweapon-item.dsa.js";
import MeleeweaponcDSA from "../item/subclasses/meleeweapon-item-dsa.js";
import AmmunitionItemcDSA from "../item/subclasses/ammunition-item-dsa.js";
import EquipmentItemcDSA from "../item/subclasses/equipment-item-dsa.js";
import CombatskillcDSA from "../item/subclasses/combatskill-item-dsa.js";
import SkillItemcDSA from "../item/subclasses/skill-item-dsa.js";
import ConsumableItemDSA from "../item/subclasses/consumable-item-dsa.js";
import SpellextensionItemcDSA from "../item/subclasses/spellextension-item-dsa.js";
import SpeciesItemcDSA from "../item/subclasses/species-item-dsa.js"

export default function() {
	Hooks.on("ready", async() => {
		game.socket.on("system.cDSA", data => {
			if (data.type == "target" && game.user.isGM) {
				let scene = game.scenes.get(data.payload.scene)
				let token = new Token(scene.getEmbeddedEntity("Token", data.payload.target))
				token.actor.update({
					"flags.oppose": data.payload.opposeFlag
				})
			} else if (data.type == "updateMsg" && game.user.isGM) {
				game.messages.get(data.payload.id).update(data.payload.updateData)
			} else if (data.type == "deleteMsg" && game.user.isGM) {
				game.messages.get(data.payload.id).delete()
			} else if (game.user.isGM) {
				console.warn(`Unhandled socket data type ${data.type}`)
			}
		})



		if (game.modules.get("vtta-tokenizer") && game.modules.get("vtta-tokenizer").active && !game.settings.get("cDSA", "tokenizerSetup") && game.user.isGM) {
			game.settings.set("vtta-tokenizer", "default-frame-pc", "systems/cDSA/icons/backgrounds/token_green.webp")
			game.settings.set("vtta-tokenizer", "default-frame-npc", "systems/cDSA/icons/backgrounds/token_black.webp")
			game.settings.set("cDSA", "tokenizerSetup", true)
		}
		if (game.modules.get("dice-so-nice") && game.modules.get("dice-so-nice").active && !game.settings.get("cDSA", "diceSetup") && game.user.isGM) {
			game.settings.set("dice-so-nice", "immediatelyDisplayChatMessages", true)
			game.settings.set("cDSA", "diceSetup", true)
		}

		cDSATutorial.firstTimeMessage()

		game.cDSA.config.ItemSubclasses = {
			ritual: RitualItemcDSA,
			spell: SpellItemcDSA,
			liturgy: LiturgyItemcDSA,
			ceremony: CeremonyItemcDSA,
			advantage: VantageItemcDSA,
			disadvantage: VantageItemcDSA,
			aggregatedTest: aggregatedTestItemcDSA,
			trait: TraitItemcDSA,
			blessing: BlessingItemcDSA,
			magictrick: CantripItemcDSA,
			specialability: SpecialAbilityItemcDSA,
			disease: DiseaseItemcDSA,
			poison: PoisonItemcDSA,
			armor: ArmorItemcDSA,
			rangeweapon: RangeweaponItemcDSA,
			meleeweapon: MeleeweaponcDSA,
			ammunition: AmmunitionItemcDSA,
			equipment: EquipmentItemcDSA,
			combatskill: CombatskillcDSA,
			skill: SkillItemcDSA,
			consumable: ConsumableItemDSA,
			spellextension: SpellextensionItemcDSA,
			species: SpeciesItemcDSA
		}


	});
}