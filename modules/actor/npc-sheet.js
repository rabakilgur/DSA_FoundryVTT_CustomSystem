import ActorSheetcDSACharacter from './character-sheet.js'

export default class ActorSheetcDSANPC extends ActorSheetcDSACharacter {
    static get defaultOptions() {
        const options = super.defaultOptions;
        mergeObject(options, {
            classes: options.classes.concat(["cDSA", "actor", "npc-sheet"]),
            width: 770,
            height: 740,
        });
        return options;
    }

    get template() {
        if (!game.user.isGM && this.actor.limited) return "systems/cDSA/templates/actors/npc-limited.html";
        return "systems/cDSA/templates/actors/npc-sheet.html";

    }

    activateListeners(html) {
        super.activateListeners(html);
    }
}