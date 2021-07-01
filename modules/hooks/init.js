import * as initHandleBars from "./handlebars.js";
import * as initDiceSoNice from "./dicesonice.js";
import * as initActorHooks from "./actor.js";
import * as macroSupport from "./macro_support.js";
import * as chatlogHooks from './chatlog.js'
import * as ready from './ready.js'
import * as chatContext from './chat_context.js'
import * as statusEffects from './statuseffect.js'
import * as sideBar from './sidebar.js'
import * as configuration from './configuration.js'
import * as journals from './journal.js'
import * as tokenHUD from './tokenHUD.js'
import * as migrateWorld from '../system/migrator.js'
import VantageSheetcDSA from "./../item/sheets/item-vantage-cDSA.js"
import SpellSheetcDSA from "./../item/sheets/item-spell-cDSA.js";
import SpecialAbilitySheetcDSA from "./../item/sheets/item-specialability-cDSA.js";
import MeleeweaponSheetcDSA from "./../item/sheets/item-meleeweapon-cDSA.js";
import DiseaseSheetcDSA from "./../item/sheets/item-disease-sheet.js";
import PoisonSheetcDSA from "./../item/sheets/item-poison-cDSA.js";
import ConsumableSheetDSA from "./../item/sheets/item-consumable-cDSA.js";
import ItemSpeciescDSA from "./../item/sheets/item-species-cDSA.js";
import ItemCareercDSA from "./../item/sheets/item-career-cDSA.js";
import ItemCulturecDSA from "./../item/sheets/item-culture-cDSA.js"
import ActorSheetcDSACharacter from "./../actor/character-sheet.js";
import ActorSheetcDSACreature from "./../actor/creature-sheet.js";
import ActorSheetcDSANPC from "./../actor/npc-sheet.js";
import ItemSheetcDSA from "./../item/item-sheet.js";
import SpellExtensionSheetcDSA from "./../item/sheets/item-spellextension-cDSA.js"

export default function() {
	initHandleBars.default();
	initDiceSoNice.default();
	initActorHooks.default();
	macroSupport.default();
	chatlogHooks.default()
	ready.default()
	chatContext.default()
	statusEffects.default()
	sideBar.default()
	journals.default()
	tokenHUD.default()
	migrateWorld.default()
}

Hooks.once("init", () => {
	loadTemplates([
		"systems/cDSA_beta/templates/actors/actor-main.html",
		"systems/cDSA_beta/templates/actors/actor-talents.html",
		"systems/cDSA_beta/templates/items/item-description.html",
		"systems/cDSA_beta/templates/dialog/default-dialog.html",
		"systems/cDSA_beta/templates/dialog/enhanced-default-dialog.html",
		"systems/cDSA_beta/templates/chat/roll/test-card.html",
		"systems/cDSA_beta/templates/items/item-equipment.html",
		"systems/cDSA_beta/templates/actors/actor-combat.html",
		"systems/cDSA_beta/templates/actors/actor-equipment.html",
		"systems/cDSA_beta/templates/actors/actor-notes.html",
		"systems/cDSA_beta/templates/chat/post-item.html",
		"systems/cDSA_beta/templates/items/item-stat.html",
		"systems/cDSA_beta/templates/actors/creature/creature-main.html",
		"systems/cDSA_beta/templates/actors/creature/creature-loot.html",
		"systems/cDSA_beta/templates/actors/creature/creature-combat.html",
		"systems/cDSA_beta/templates/actors/creature/creature-notes.html",
		"systems/cDSA_beta/templates/actors/creature/creature-magic.html",
		"systems/cDSA_beta/templates/actors/creature/creature-religion.html",
		"systems/cDSA_beta/templates/actors/parts/characteristics-small.html",
		"systems/cDSA_beta/templates/actors/parts/characteristics-large.html",
		"systems/cDSA_beta/templates/actors/npc/npc-main.html",
		"systems/cDSA_beta/templates/actors/character/actor-magic.html",
		"systems/cDSA_beta/templates/actors/character/actor-religion.html",
		"systems/cDSA_beta/templates/actors/character/actor-aggregatedtests.html",
		"systems/cDSA_beta/templates/actors/parts/creature-derived-attributes-small.html",
		"systems/cDSA_beta/templates/actors/parts/creature-derived-attributes-large.html",
		"systems/cDSA_beta/templates/actors/parts/status_effects.html",
		"systems/cDSA_beta/templates/actors/parts/purse.html",
		"systems/cDSA_beta/templates/actors/parts/healthbar.html"
	]);

	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("cDSA", ActorSheetcDSACharacter, { types: ["character"], makeDefault: true });
	Actors.registerSheet("cDSA", ActorSheetcDSACreature, { types: ["creature"] });
	Actors.registerSheet("cDSA", ActorSheetcDSANPC, { types: ["npc"] });
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("cDSA", ItemSheetcDSA, { makeDefault: true });
	Items.registerSheet("cDSA", ItemSpeciescDSA, { makeDefault: true, types: ["species"] });
	Items.registerSheet("cDSA", ItemCareercDSA, { makeDefault: true, types: ["career"] });
	Items.registerSheet("cDSA", ItemCulturecDSA, { makeDefault: true, types: ["culture"] });
	Items.registerSheet("cDSA", VantageSheetcDSA, { makeDefault: true, types: ["advantage", "disadvantage"] });
	Items.registerSheet("cDSA", SpellSheetcDSA, { makeDefault: true, types: ["ritual", "ceremony", "liturgy", "spell"] });
	Items.registerSheet("cDSA", SpecialAbilitySheetcDSA, { makeDefault: true, types: ["specialability"] });
	Items.registerSheet("cDSA", MeleeweaponSheetcDSA, { makeDefault: true, types: ["meleeweapon"] });
	Items.registerSheet("cDSA", PoisonSheetcDSA, { makeDefault: true, types: ["poison"] });
	Items.registerSheet("cDSA", DiseaseSheetcDSA, { makeDefault: true, types: ["disease"] });
	Items.registerSheet("cDSA", ConsumableSheetDSA, { makeDefault: true, types: ["consumable"] });
	Items.registerSheet("cDSA", SpellExtensionSheetcDSA, { makeDefault: true, types: ["spellextension"] });
	Items.unregisterSheet("cDSA", ItemSheetcDSA, { types: ["spellextension", "consumable", "species", "career", "culture", "advantage", "specialability", "disadvantage", "ritual", "ceremony", "liturgy", "spell", "disease", "poison", "meleeweapon"] });

	configuration.default()
});

Hooks.once('setup', function() {
	if (!["de"].includes(game.i18n.lang)) {
		console.warn(`cDSA - ${game.i18n.lang} is not a supported language. Falling back to default language (german).`)
		game.settings.set("core", "language", "de")
	}
	setupKnownEquipmentModifiers()
});


function setupKnownEquipmentModifiers() {
	game.cDSA.config.knownShortcuts[game.i18n.localize('CHARAbbrev.INI').toLowerCase()] = ["status", "initiative", "gearmodifier"]
	game.cDSA.config.knownShortcuts[game.i18n.localize('CHARAbbrev.GS').toLowerCase()] = ["status", "speed", "gearmodifier"]
	game.cDSA.config.knownShortcuts[game.i18n.localize('CHARAbbrev.AsP').toLowerCase()] = ["status", "astralenergy", "gearmodifier"]
	game.cDSA.config.knownShortcuts[game.i18n.localize('CHARAbbrev.LeP').toLowerCase()] = ["status", "wounds", "gearmodifier"]
	game.cDSA.config.knownShortcuts[game.i18n.localize('CHARAbbrev.KaP').toLowerCase()] = ["status", "karmaenergy", "gearmodifier"]
	game.cDSA.config.knownShortcuts[game.i18n.localize('CHARAbbrev.AW').toLowerCase()] = ["status", "dodge", "gearmodifier"]
	game.cDSA.config.knownShortcuts[game.i18n.localize('CHARAbbrev.SK').toLowerCase()] = ["status", "soulpower", "gearmodifier"]
	game.cDSA.config.knownShortcuts[game.i18n.localize('CHARAbbrev.ZK').toLowerCase()] = ["status", "toughness", "gearmodifier"]
	game.cDSA.config.knownShortcuts[game.i18n.localize('CHARAbbrev.FtP').toLowerCase()] = ["status", "fatePoints", "gearmodifier"]
	let attrs = ["MU", "KL", "IN", "CH", "FF", "GE", "KO", "KK"]
	for (let k of attrs) {
		game.cDSA.config.knownShortcuts[game.i18n.localize(`CHARAbbrev.${k}`).toLowerCase()] = ["characteristics", k.toLowerCase(), "value"]
	}
}
