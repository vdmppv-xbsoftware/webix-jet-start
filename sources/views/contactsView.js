import {JetView} from "webix-jet";

import ContactsForm from "./contactsForm";
import ContactsList from "./contactsList";

export default class ContactsView extends JetView {
	config() {
		return {
			cols: [ContactsList, ContactsForm]
		};
	}
}

