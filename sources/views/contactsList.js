import {JetView} from "webix-jet";

import {contactsCollection, statusesCollection, countriesCollection} from "../models/dataCollection";

const CONTACTS_LIST_ID = "contacts_list";

export default class ContactsList extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const contactsList = {
			view: "list",
			localId: CONTACTS_LIST_ID,
			type: {
				css: "contactlist_item"
			},
			template: `${_("Name")}: #Name#, 
                ${_("Email")}: #Email#, 
                ${_("Status")}: #Status#, 
                ${_("Country")}: #Country# 
                <span class='webix_icon wxi-trash'</span>`,
			select: true,
			onClick: {
				"wxi-trash": (e, id) => {
					const selected = this.$$(CONTACTS_LIST_ID).getSelectedId();
					if (selected && selected === id) {
						contactsCollection.remove(selected);
						this.show("contactsView");
					}
				}
			}
		};

		const addButton = {
			view: "button",
			value: _("Add item"),
			css: "webix_primary",
			click: () => {
				const list = this.$$(CONTACTS_LIST_ID);
				contactsCollection.waitSave(() => {
					contactsCollection.add({
						Name: "Ivan Ivanov",
						Email: "ivanov@gmail.com",
						Status: statusesCollection.data.order[0] || "",
						Country: countriesCollection.data.order[0] || ""
					});
				}).then(() => list.select(list.getLastId()));
			}
		};

		return {
			rows: [contactsList, addButton]
		};
	}

	init() {
		this.list = this.$$(CONTACTS_LIST_ID);
		this.list.sync(contactsCollection);

		this.on(this.app, "onClearContactsForm", () => {
			this.list.unselectAll();
			this.show("contactsView");
		});

		contactsCollection.waitData.then(() => {
			const selected = this.getParam("id") || contactsCollection.getFirstId();
			this.setParam("id", selected, true);
			this.on(this.list, "onAfterSelect", (id) => {
				this.show(`contactsView?id=${id}`);
			});

			this.list.select(selected);
		});
	}

	urlChange() {
		const url = this.getParam("id");
		if (!url) this.list.unselectAll();
	}
}
