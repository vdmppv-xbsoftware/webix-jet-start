import {JetView} from "webix-jet";

import {contactsCollection} from "../models/dataCollection";

const CONTACTS_LIST_ID = "contacts_list";

export default class ContactsList extends JetView {
	config() {
		const contactsList = {
			view: "list",
			localId: CONTACTS_LIST_ID,
			template: "Name: #Name#, Email: #Email#, Status: #Status#, Country: #Country# <span class='webix_icon wxi-trash'</span>",
			select: true,
			onClick: {
				"wxi-trash": (e, id) => {
					const selected = this.$$(CONTACTS_LIST_ID).getSelectedId();
					contactsCollection.remove(selected);
					if (selected == id) {
						this.app.show("/top/contactsView");
					}
				}
			},
			on: {
				onAfterSelect: () => {
					const selected = this.$$(CONTACTS_LIST_ID).getSelectedId();
					this.setUrl(selected);
				}
			}
		};

		const addButton = {
			view: "button",
			value: "Add item",
			css: "webix_primary",
			click: () => {
				const list = this.$$(CONTACTS_LIST_ID);
				contactsCollection.add({
					Name: "Ivan Ivanov",
					Email: "ivanov@gmail.com",
					Status: 1,
					Country: 2
				});
				list.select(list.getLastId());
			}
		};

		return {
			rows: [contactsList, addButton]
		};
	}

	init() {
		this.list = this.$$(CONTACTS_LIST_ID);
		this.list.sync(contactsCollection);
	}

	urlChange() {
		const id = this.getParam("id") || contactsCollection.getFirstId();

		if (id && contactsCollection.exists(id)) {
			this.list.select(id);
		}
		else {
			this.list.select(contactsCollection.getFirstId());
		}
	}

	setUrl(selected) {
		this.setParam("id", selected, true);
	}
}
