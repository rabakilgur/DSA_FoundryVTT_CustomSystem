import ItemSheetcDSA from "../item-sheet.js";
import cDSA from "../../system/config-cDSA.js"

export default class SpellSheetcDSA extends ItemSheetcDSA {
	async getData() {
		const data = await super.getData();
		data['characteristics'] = cDSA.characteristics;
		data['StFs'] = cDSA.StFs;
		data['resistances'] = cDSA.magicResistanceModifiers
		if (data.isOwned) {
			data['extensions'] = this.item.options.actor.data.items.filter(x => { return x.type == "spellextension" && x.data.source == this.item.name && this.item.type == x.data.category })
		}
		return data
	}

	activateListeners(html) {
		super.activateListeners(html);
		html.find('.item-edit').click(ev => {
			ev.preventDefault()
			let itemId = this._getItemId(ev)
			const item = this.item.options.actor.items.find(i => i.data._id == itemId)
			item.sheet.render(true);
		});

		html.find('.item-delete').click(ev => {
			this._deleteItem(ev)
		});
	}

	_deleteItem(ev) {
		let itemId = this._getItemId(ev);
		let item = this.actor.data.items.find(x => x._id == itemId)
		let message = game.i18n.format("DIALOG.DeleteItemDetail", { item: item.name })
		renderTemplate('systems/cDSA/templates/dialog/delete-item-dialog.html', { message: message }).then(html => {
			new Dialog({
				title: game.i18n.localize("Delete Confirmation"),
				content: html,
				buttons: {
					Yes: {
						icon: '<i class="fa fa-check"></i>',
						label: game.i18n.localize("yes"),
						callback: dlg => {
							this._cleverDeleteItem(itemId)
						}
					},
					cancel: {
						icon: '<i class="fas fa-times"></i>',
						label: game.i18n.localize("cancel")
					}
				},
				default: 'Yes'
			}).render(true)
		});
	}

	async _cleverDeleteItem(itemId) {
		let item = this.item.options.actor.data.items.find(x => x._id == itemId)
		await this.item.options.actor._updateAPs(-1 * item.data.APValue.value)
		this.item.options.actor.deleteEmbeddedEntity("OwnedItem", itemId);
	}


}