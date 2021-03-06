import cDSAStatusEffects from "../status/status_effects.js";
import cDSAChatAutoCompletion from "../system/chat_autocompletion.js";
import cDSAChatListeners from "../system/chat_listeners.js";
import cDSA_Utility from "../system/utility-cDSA.js";


export default function() {


	Hooks.on("renderJournalSheet", (obj, html, data) => {

		$(html).find(".close").attr("title", game.i18n.localize("SHEET.Close"));
		$(html).find(".entry-image").attr("title", game.i18n.localize("SHEET.imageView"));
		$(html).find(".entry-text").attr("title", game.i18n.localize("SHEET.textView"));
		$(html).find(".share-image").attr("title", game.i18n.localize("SHEET.showToPlayers"));

		html.on('click', '.request-roll', ev => {
			cDSAChatAutoCompletion.showRQMessage($(ev.currentTarget).attr("data-name"), Number($(ev.currentTarget).attr("data-modifier")) || 0)
		})

		cDSAStatusEffects.bindButtons(html)
		html.on('click', '.chat-condition', ev => {
			cDSAChatListeners.postStatus($(ev.currentTarget).attr("data-id"))
		})
	})

	TextEditor._enrichHTML = TextEditor.enrichHTML

	TextEditor.enrichHTML = function(content, { secrets = false, entities = true, links = true, rolls = true, rollData = null } = {}) {
		let result = TextEditor._enrichHTML(content, { secrets, entities, links, rolls, rollData })
		return cDSA_Utility.customEntityLinks(cDSA_Utility.replaceConditions(result))
	}
}