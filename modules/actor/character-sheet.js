import ActorSheetcDSA from "./actor-sheet.js";
import CultureWizard from "../wizards/culture_wizard.js";
import CareerWizard from "../wizards/career_wizard.js"
import SpeciesWizard from "../wizards/species_wizard.js";

export default class ActorSheetcDSACharacter extends ActorSheetcDSA {
    static get defaultOptions() {
        const options = super.defaultOptions;
        mergeObject(options, {
            classes: options.classes.concat(["cDSA", "actor", "character-sheet"]),
            width: 784,
            height: 740,
        });
        return options;
    }

    get template() {
        if (!game.user.isGM && this.actor.limited) return "systems/cDSA/templates/actors/npc-limited.html";
        return "systems/cDSA/templates/actors/actor-sheet.html";

    }

    activateListeners(html) {
        super.activateListeners(html);

    }

    async _manageDragItems(item, typeClass) {
        switch (typeClass) {
            case "aggregatedTest":
                await this.actor.createEmbeddedEntity("OwnedItem", item);
                break;
            case "species":
                let spwizard = new SpeciesWizard()
                await spwizard.addSpecies(this.actor, item)
                spwizard.render(true)
                break;
            case "culture":
                let cuwizard = new CultureWizard()
                await cuwizard.addCulture(this.actor, item)
                cuwizard.render(true)
                break
            case "career":
                let cwizard = new CareerWizard()
                await cwizard.addCareer(this.actor, item)
                cwizard.render(true)
                break;
            default:
                super._manageDragItems(item, typeClass)
                break
        }
    }
}