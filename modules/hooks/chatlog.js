import OpposedcDSA from '../system/opposed-cDSA.js'
import DicecDSA from '../system/dice-cDSA.js'
import cDSAPayment from '../system/payment.js'
import cDSA_Utility from '../system/utility-cDSA.js';
import cDSAChatAutoCompletion from '../system/chat_autocompletion.js';
import cDSAChatListeners from '../system/chat_listeners.js';
import cDSAStatusEffects from '../status/status_effects.js';

export default function() {
    Hooks.on('renderChatLog', (log, html, data) => {
        OpposedcDSA.chatListeners(html)
        DicecDSA.chatListeners(html)
        cDSAPayment.chatListeners(html)
        let autoComplete = new cDSAChatAutoCompletion()
        autoComplete.chatListeners(html)
        cDSAChatListeners.chatListeners(html)
    });

    Hooks.on("renderChatMessage", async(app, html, msg) => {
        if (!game.user.isGM) {
            html.find(".chat-button-gm").remove();
        }
        cDSAStatusEffects.bindButtons(html)
    });

    Hooks.on("chatMessage", (html, content, msg) => {
        if (/^\/pay/.test(content)) {
            if (game.user.isGM) {
                cDSAPayment.createPayChatMessage(content)
            } else {
                cDSAPayment.payMoney(cDSA_Utility.getSpeaker(msg.speaker), content)
            }
            return false
        } else if (/^\/getPaid/.test(content)) {
            if (game.user.isGM) {
                cDSAPayment.createGetPaidChatMessage(content)
            } else {
                cDSAPayment.getMoney(cDSA_Utility.getSpeaker(msg.speaker), content)
            }
            return false
        } else if (/^\/help$/.test(content)) {
            cDSAChatListeners.getHelp()
            return false
        } else if (/^\/conditions$/.test(content)) {
            cDSAChatListeners.showConditions()
            return false
        } else if (/^\/tables$/.test(content)) {
            cDSAChatListeners.showTables()
            return false
        }

    })
}