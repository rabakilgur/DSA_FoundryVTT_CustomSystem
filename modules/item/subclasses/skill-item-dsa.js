import cDSAStatusEffects from "../../status/status_effects.js";
import AdvantageRulescDSA from "../../system/advantage-rules-cDSA.js";
import cDSA from "../../system/config-cDSA.js";
import DicecDSA from "../../system/dice-cDSA.js";
import ItemRulescDSA from "../../system/item-rules-cDSA.js";
import ItemcDSA from "../item-cDSA.js";
import ActorcDSA from "../../actor/actor-cDSA.js";
export default class SkillItemcDSA extends ItemcDSA {

    static chatData(data, name) {
        return [
            this._chatLineHelper("Description", game.i18n.localize(`SKILLdescr.${name}`)),
        ]
    }

    static getSituationalModifiers(situationalModifiers, actor, data, source) {
        situationalModifiers.push(...ItemRulescDSA.getTalentBonus(actor.data, source.name, ["advantage", "disadvantage", "specialability", "equipment"]))
        situationalModifiers.push(...AdvantageRulescDSA.getVantageAsModifier(actor.data, game.i18n.localize('LocalizedIDs.minorSpirits'), -1))
    }

    static setupDialog(ev, options, skill, actor) {
        let title = skill.name + " " + game.i18n.localize("Test");
        let testData = {
            opposable: true,
            source: skill,
            extra: {
                actor: actor.data,
                options: options,
            }
        };

        let data = {
            rollMode: options.rollMode,
            difficultyLabels: (cDSA.skillDifficultyLabels),
            modifier: options.modifier || 0,
            characteristics: [1, 2, 3].map(x => skill.data[`characteristic${x}`].value)
        }

        let situationalModifiers = actor ? cDSAStatusEffects.getRollModifiers(actor, skill) : []
        this.getSituationalModifiers(situationalModifiers, actor, data, skill)
        data["situationalModifiers"] = situationalModifiers

        let dialogOptions = {
            title: title,
            template: "/systems/cDSA/templates/dialog/skill-dialog.html",
            data: data,

            callback: (html) => {
                cardOptions.rollMode = html.find('[name="rollMode"]').val();
                testData.testModifier = Number(html.find('[name="testModifier"]').val());
                testData.testDifficulty = cDSA.skillDifficultyModifiers[html.find('[name="testDifficulty"]').val()];
                testData.situationalModifiers = ActorcDSA._parseModifiers('[name="situationalModifiers"]')
                testData.advancedModifiers = {
                    chars: [0, 1, 2].map(x => Number(html.find(`[name="ch${x}"]`).val())),
                    fps: Number(html.find(`[name="fp"]`).val())
                }
                return { testData, cardOptions };
            }
        };

        let cardOptions = actor._setupCardOptions("systems/cDSA/templates/chat/roll/skill-card.html", title)

        return DicecDSA.setupDialog({
            dialogOptions: dialogOptions,
            testData: testData,
            cardOptions: cardOptions
        });
    }
}