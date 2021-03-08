import ActorSheetcDSA from "./modules/actor/actor-sheet.js"
import ActorSheetcDSACharacter from "./modules/actor/character-sheet.js";
import ActorSheetcDSACreature from "./modules/actor/creature-sheet.js";
import ActorSheetcDSANPC from "./modules/actor/npc-sheet.js";
import ActorcDSA from "./modules/actor/actor-cDSA.js";
import ItemcDSA from "./modules/item/item-cDSA.js";
import ItemSheetcDSA from "./modules/item/item-sheet.js";
import initHooks from "./modules/hooks/init.js";
import MacrocDSA from "./modules/system/macroControl.js";
import LazyImporter from "./modules/importer/lazy_importer.js"
import cDSA from "./modules/system/config-cDSA.js"
import cDSAItemLibrary from "./modules/system/itemlibrary.js"
import cDSA_Utility from "./modules/system/utility-cDSA.js"
import cDSAInitializer from "./modules/system/initializer.js"
import AdvantageRulescDSA from "./modules/system/advantage-rules-cDSA.js";
import SpecialabilityRulescDSA from "./modules/system/specialability-rules-cDSA.js"
import ChatMessagecDSARoll from "./modules/chat/ChatMessagecDSA.js";

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
	return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Hooks.once("init", async function() {
	console.log("Initializing cDSA system")

	CONFIG.statusEffects = cDSA.statusEffects
	game.cDSA = {
		apps: {
			ActorSheetcDSA,
			ActorSheetcDSACharacter,
			ActorSheetcDSACreature,
			ActorSheetcDSANPC,
			ItemSheetcDSA,
			cDSA_Utility,
			cDSAInitializer
		},
		entities: {
			ActorcDSA,
			ItemcDSA
		},
		macro: MacrocDSA,
		config: cDSA,
		itemLibrary: new cDSAItemLibrary(),
		lazy: {
			LazyImporter
		}
	}

	CONFIG.Actor.entityClass = ActorcDSA;
	CONFIG.Item.entityClass = ItemcDSA;
	CONFIG.ChatMessage.template = "systems/cDSA/templates/chat/chat-message.html"
	CONFIG.ChatMessage.entityClass = ChatMessagecDSARoll
});
Hooks.once("setup", async function() {
	AdvantageRulescDSA.setupFunctions()
	SpecialabilityRulescDSA.setupFunctions()
})
initHooks();