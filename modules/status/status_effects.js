import cDSA from '../system/config-cDSA.js'

export default class cDSAStatusEffects {
    static bindButtons(html) {
        html.find('.chat-condition').each(function(i, cond) {
            cond.setAttribute("draggable", true);
            cond.addEventListener("dragstart", ev => {
                let dataTransfer = {
                    data: {
                        type: "condition",
                        payload: {
                            id: $(ev.currentTarget).attr("data-id")
                        }
                    }
                }
                ev.dataTransfer.setData("text/plain", JSON.stringify(dataTransfer));
            });
        })
    }

    static async createEffect(actor, effect, value, auto) {
        effect.label = game.i18n.localize(effect.label);
        if (auto) {
            effect.flags.cDSA.auto = Math.min(effect.flags.cDSA.max, value);
            effect.flags.cDSA.manual = 0
        } else {
            effect.flags.cDSA.manual = Math.min(effect.flags.cDSA.max, value);
            effect.flags.cDSA.auto = 0
        }

        effect.flags.cDSA.value = Math.min(4, effect.flags.cDSA.manual + effect.flags.cDSA.auto)

        effect["flags.core.statusId"] = effect.id;
        if (effect.id == "dead")
            effect["flags.core.overlay"] = true;

        let result = await actor.createEmbeddedEntity("ActiveEffect", effect)
        await actor._dependentEffects(effect.id, effect, 1)
        delete effect.id
        return result
    }
    static async removeEffect(actor, existing, value, absolute, auto) {
        if (auto) {
            existing.flags.cDSA.auto = absolute ? value : Math.max(0, existing.flags.cDSA.auto - value)
        } else {
            existing.flags.cDSA.manual = absolute ? value : existing.flags.cDSA.manual - value
        }
        existing.flags.cDSA.value = Math.max(0, Math.min(4, existing.flags.cDSA.manual + existing.flags.cDSA.auto))

        if (existing.flags.cDSA.auto <= 0 && existing.flags.cDSA.manual == 0)
            return actor.deleteEmbeddedEntity("ActiveEffect", existing._id)
        else
            return actor.updateEmbeddedEntity("ActiveEffect", existing)
    }

    static async updateEffect(actor, existing, value, absolute, auto) {
        let delta, newValue

        if (auto) {
            newValue = Math.min(existing.flags.cDSA.max, absolute ? value : existing.flags.cDSA.auto + value)
            delta = newValue - existing.flags.cDSA.auto
            existing.flags.cDSA.auto = newValue;
        } else {
            newValue = absolute ? value : existing.flags.cDSA.manual + value
            delta = newValue - existing.flags.cDSA.manual
            existing.flags.cDSA.manual = newValue;
        }

        if (delta == 0)
            return existing

        existing.flags.cDSA.value = Math.max(0, Math.min(4, existing.flags.cDSA.manual + existing.flags.cDSA.auto))
        await actor._dependentEffects(existing.flags.core.statusId, existing, delta)
        return actor.updateEmbeddedEntity("ActiveEffect", existing)
    }


    static calculateRollModifier(effect, actor, item, options = {}) {
        if (effect.flags.cDSA.value == null)
            return 0
        return effect.flags.cDSA.value * -1
    }

    static ModifierIsSelected(item, options = {}) {
        return options.mode != "damage"
    }

    static getRollModifiers(actor, item, options = {}) {
        actor = actor.data.data ? actor.data : actor
        return actor.effects.map(effect => {
            let effectClass = game.cDSA.config.statusEffectClasses[effect.flags.core.statusId] || cDSAStatusEffects
            return {
                name: effect.label,
                value: effectClass.calculateRollModifier(effect, actor, item, options),
                selected: effectClass.ModifierIsSelected(item, options)
            }
        }).filter(x => x.value != 0)
    }
}

class EncumberedEffect extends cDSAStatusEffects {
    static ModifierIsSelected(item, options = {}) {
        return (item.type == "skill" && item.data.burden.value == "yes") || (item.type != "skill" && options.mode != "damage")
    }

    static calculateRollModifier(effect, actor, item, options = {}) {
        return (item.type == "skill" && item.data.burden.value == "no") ? 0 : super.calculateRollModifier(effect, actor, item, options)
    }
}

class ProneEffect extends cDSAStatusEffects {
    static calculateRollModifier(effect, actor, item, options = {}) {
        return options.mode ? (options.mode == "attack" ? -4 : -2) : 0
    }
}

class RaptureEffect extends cDSAStatusEffects {
    static calculateRollModifier(effect, actor, item, options = {}) {
        let happyTalents = actor.data.happyTalents.value.split(",").map(x => x.trim())
        if ((happyTalents.includes(item.name) && item.type == "skill") || ["ceremony", "ritual"].includes(item.type))
            return effect.flags.cDSA.value - 1
        if (["ritual", "spell", "skill"].includes(item.type))
            return effect.flags.cDSA.value * -1
        return 0
    }
}

class DeafEffect extends cDSAStatusEffects {
    static calculateRollModifier(effect, actor, item, options = {}) {
        return (item.type == "skill" && item.name == game.i18n.localize("LocalizedIDs.perception")) ? -3 : 0
    }
}

class BloodrushEffect extends cDSAStatusEffects {
    static calculateRollModifier(effect, actor, item, options = {}) {
        if (item.type == "skill")
            return item.name == game.i18n.localize("LocalizedIDs.featOfStrength") ? 2 : 0

        return options.mode == "attack" ? 4 : 0
    }
}


cDSA.statusEffectClasses = {
    inpain: cDSAStatusEffects,
    encumbered: EncumberedEffect,
    stunned: cDSAStatusEffects,
    raptured: RaptureEffect,
    feared: cDSAStatusEffects,
    paralysed: cDSAStatusEffects,
    confused: cDSAStatusEffects,
    prone: ProneEffect,
    deaf: DeafEffect,
    bloodrush: BloodrushEffect
}