import cDSA_Utility from "../system/utility-cDSA.js";
import cDSA from "../system/config-cDSA.js"
import ActorSheetcDSA from "./actor-sheet.js";
import TraitRulescDSA from "../system/trait-rules-cDSA.js"

export default class ActorSheetcDSACreature extends ActorSheetcDSA {
    static get defaultOptions() {
        const options = super.defaultOptions;
        mergeObject(options, {
            classes: options.classes.concat(["cDSA", "actor", "creature-sheet"]),
            width: 770,
            height: 740,
        });
        return options;
    }

    get template() {
        if (!game.user.isGM && this.actor.limited) return "systems/cDSA/templates/actors/creature-limited.html";
        return "systems/cDSA/templates/actors/creature-sheet.html";
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('.ch-rollCombatTrait').click(event => {
            event.preventDefault();
            let itemId = this._getItemId(event);
            const item = this.actor.items.find(i => i.data._id == itemId)
            this.actor.setupWeaponTrait(item, "attack", event).then(setupData => {
                this.actor.basicTest(setupData)
            });
        });

        html.find('.ch-rollDamageTrait').click(event => {
            event.preventDefault();
            let itemId = this._getItemId(event);
            const item = this.actor.items.find(i => i.data._id == itemId)
            this.actor.setupWeaponTrait(item, "damage", event).then(setupData => {
                this.actor.basicTest(setupData)
            });
        });
    }

    async getData() {
        const data = super.getData();
        data["sizeCategories"] = cDSA.sizeCategories
        return data;
    }

    async _cleverDeleteItem(itemId) {
        let item = this.actor.data.items.find(x => x._id == itemId)
        switch (item.type) {
            case "trait":
                await this._updateAPs(item.data.APValue.value * -1)
                TraitRulescDSA.traitRemoved(this.actor, item)
                break;
        }
        super._cleverDeleteItem(itemId)
    }

    async _addTrait(item) {
        let res = this.actor.data.items.find(i => {
            return i.type == "trait" && i.name == item.name
        });
        if (!res) {
            await this._updateAPs(item.data.data.APValue.value)
            await this.actor.createEmbeddedEntity("OwnedItem", item);
            await TraitRulescDSA.traitAdded(this.actor, item)
        }
    }

    async _onDrop(event) {
        let dragData = JSON.parse(event.dataTransfer.getData("text/plain"));
        let item
        let typeClass
        let selfTarget = dragData.actorId && dragData.actorId == this.actor.data._id

        if (selfTarget && !event.ctrlKey) {
            return
        } else if (dragData.id && dragData.pack) {
            item = await cDSA_Utility.findItembyIdAndPack(dragData.id, dragData.pack);
            typeClass = item.data.type
        } else if (dragData.id && dragData.type == "Actor") {
            item = cDSA_Utility.findActorbyId(dragData.id);
            typeClass = item.data.type
        } else if (dragData.id) {
            item = cDSA_Utility.findItembyId(dragData.id);
            typeClass = item.data.type
        } else {
            item = dragData.data
            typeClass = item.type
        }

        if (selfTarget && event.ctrlKey) {
            super.handleItemCopy(item, typeClass)
        } else {
            switch (typeClass) {
                case "trait":
                    await this._addTrait(item)
                    break;
                case "npc":
                case "creature":
                case "character":
                    if (cDSA.hooks.shapeshift) {
                        cDSA.hooks.shapeshift(item, this.actor)
                        break
                    }
                default:
                    super._handleDragData(dragData, event)
            }
        }


    }

}