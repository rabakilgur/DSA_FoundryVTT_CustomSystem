import cDSA_Utility from "../system/utility-cDSA.js";
import cDSA from "../system/config-cDSA.js"
import cDSAStatusEffects from "../status/status_effects.js";
import cDSAChatListeners from "../system/chat_listeners.js";


export default class ItemSheetcDSA extends ItemSheet {
	constructor(item, options) {
		super(item, options);
		this.mce = null;
	}

	static get defaultOptions() {
		const options = super.defaultOptions;
		options.tabs = [{ navSelector: ".tabs", contentSelector: ".content", initial: "description" }]
		mergeObject(options, {
			classes: options.classes.concat(["cDSA", "item"]),
			width: 450,
			height: 500,
		});
		return options;
	}

	async _render(force = false, options = {}) {
		await super._render(force, options);

		$(this._element).find(".close").attr("title", game.i18n.localize("SHEET.Close"));
		$(this._element).find(".configure-sheet").attr("title", game.i18n.localize("SHEET.Configure"));
		$(this._element).find(".import").attr("title", game.i18n.localize("SHEET.Import"));
		$(this._element).find(".rolleffect").attr("title", game.i18n.localize("SHEET.RollEffect"));
		$(this._element).find(".showItemHead").attr("title", game.i18n.localize("SHEET.PostItem"));
		$(this._element).find(".consumeItem").attr("title", game.i18n.localize("SHEET.ConsumeItem"));
	}

	_getHeaderButtons() {
		let buttons = super._getHeaderButtons();
		buttons.unshift({
			class: "showItemHead",
			icon: `fas fa-comment`,
			onclick: async() => this.item.postItem()
		})
		return buttons
	}

	setupEffect(ev) {
		this.item.setupEffect().then(setupData => {
			this.item.itemTest(setupData)
		});
	}


	get template() {
		let type = this.item.type;
		return `systems/cDSA/templates/items/item-${type}-sheet.html`;
	}

	_getItemId(ev) {
		return $(ev.currentTarget).parents(".item").attr("data-item-id")
	}

	_advanceStep() {}

	_refundStep() {}

	async advanceWrapper(ev, funct) {
		let elem = $(ev.currentTarget)
		let i = elem.find('i')
		if (!i.hasClass("fa-spin")) {
			i.addClass("fa-spin fa-spinner")
			await this[funct]()
			i.removeClass("fa-spin fa-spinner")
		}
	}


	activateListeners(html) {
		super.activateListeners(html);

		html.find(".advance-step").mousedown(ev => {
			this.advanceWrapper(ev, "_advanceStep")
		})
		html.find(".refund-step").mousedown(ev => {
			this.advanceWrapper(ev, "_refundStep")
		})

		cDSAStatusEffects.bindButtons(html)
		html.on('click', '.chat-condition', ev => {
			cDSAChatListeners.postStatus($(ev.currentTarget).attr("data-id"))
		})
	}

	async getData() {
		const data = super.getData();

		switch (this.item.type) {
			case "skill":
				data['characteristics'] = cDSA.characteristics;
				data['skillGroups'] = cDSA.skillGroups;
				data['skillBurdens'] = cDSA.skillBurdens;
				data['StFs'] = cDSA.StFs;
				break;
			case "combatskill":
				data['weapontypes'] = cDSA.weapontypes;
				data['skillBurdens'] = cDSA.skillBurdens;
				data['StFs'] = cDSA.StFs;
				break;
			case "rangeweapon":
				data['ammunitiongroups'] = cDSA.ammunitiongroups;
				data['combatskills'] = await cDSA_Utility.allCombatSkillsList("range");
				break;
			case "ammunition":
				data['ammunitiongroups'] = cDSA.ammunitiongroups;
				break;
			case "trait":
				data["traitCategories"] = cDSA.traitCategories
				data['ranges'] = cDSA.meleeRanges;
				break
			case "equipment":
				data['equipmentTypes'] = cDSA.equipmentTypes;
				break;
			case "aggregatedTest":
				data["allSkills"] = await cDSA_Utility.allSkillsList()
				break
		}
		data.isOwned = this.item.isOwned
		if (data.isOwned) {
			data.canAdvance = this.item.options.actor.data.canAdvance && this._advancable()
		}
		return data;
	}

	_advancable() {
		return false
	}
}