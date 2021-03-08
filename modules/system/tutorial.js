import cDSA_Utility from './utility-cDSA.js'

export default class cDSATutorial {

	static firstTimeMessage() {

		if (!(game.settings.get("cDSA", "firstTimeStart"))) {
			let msg = game.i18n.localize('WELCOME');
			ChatMessage.create(cDSA_Utility.chatDataSetup(msg));
			cDSATutorial.setLanguage("de");
			game.settings.set("cDSA", "firstTimeStart", true);
		}
	}

	static setLanguage(lang) {
		game.settings.set("cDSA", "firstTimeStart", true)
		game.settings.set("core", "language", lang)
	}
}