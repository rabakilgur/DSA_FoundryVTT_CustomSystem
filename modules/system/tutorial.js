import cDSA_Utility from './utility-cDSA.js'

export default class cDSATutorial {

    static firstTimeMessage() {

        if (!(game.settings.get("cDSA", "firstTimeStart"))) {
            let msg = game.i18n.localize('WELCOME')
            ChatMessage.create(cDSA_Utility.chatDataSetup(msg))
            cDSATutorial.firstTimeLanguage()
            game.settings.set("cDSA", "firstTimeStart", true)
        }
    }


    static firstTimeLanguage() {
        let langs = ["de", "en"]
        let data = {
            title: game.i18n.localize("DIALOG.firstTime"),
            content: game.i18n.localize("DIALOG.firstTimeWarning"),
            default: 'de',
            buttons: {}
        }
        for (let lang of langs) {
            data.buttons[lang] = {
                label: game.i18n.localize(lang),
                callback: dlg => {
                    cDSATutorial.setLanguage(lang)
                }
            }
        }

        new Dialog(data).render(true)
    }

    static setLanguage(lang) {
        game.settings.set("cDSA", "firstTimeStart", true)
        game.settings.set("core", "language", lang)
    }
}