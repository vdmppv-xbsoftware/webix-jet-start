import {JetView} from "webix-jet";

import {contactsCollection, statusesCollection, countriesCollection} from "../models/dataCollection";

const CONTACTS_FORM_ID = "contacts_form";
const _ = this.app.getService("locale")._;

export default class ContactsForm extends JetView {
	config() {
		return {
			view: "form",
			localId: CONTACTS_FORM_ID,
			rows: [
				{
					template: _("EDIT CONTACTS"),
					type: "section"
				},
				{
					view: "text",
					name: "Name",
					label: _("Name"),
					value: "",
					invalidMessage: _("Name should not be empty")
				},
				{
					view: "text",
					name: "Email",
					label: _("Email"),
					value: "",
					invalidMessage: _("Incorrect email address")
				},
				{
					view: "combo",
					name: "Status",
					label: _("Status"),
					options: {
						body: {template: "#Name#"},
						data: statusesCollection
					}
				},
				{
					view: "combo",
					name: "Country",
					label: _("Country"),
					options: {
						body: {template: "#Name#"},
						data: countriesCollection
					}
				},
				{
					cols: [
						{
							view: "button",
							value: _("Save"),
							css: "webix_primary",
							click: () => this.saveForm()
						},
						{
							view: "button",
							value: _("Clear"),
							click: () => this.clearForm()
						}
					]
				},
				{ }
			],
			rules: {
				Name: this.webix.rules.isNotEmpty,
				Email: this.webix.rules.isEmail
			}
		};
	}

	init() {
		this.inputform = this.$$(CONTACTS_FORM_ID);
	}

	urlChange() {
		const contactsID = this.getParam("id");
		if (contactsID) {
			this.inputform.setValues(contactsCollection.getItem(contactsID));
		}
	}

	saveForm() {
		if (this.inputform.validate()) {
			const values = this.inputform.getValues();
			contactsCollection.updateItem(values.id, values);
			this.webix.message({text: _("Contact was successfully saved")});
		}
	}

	clearForm() {
		webix.confirm({text: _("Are you sure you want to clean the form?")}).then(() => {
			this.inputform.clear();
			this.inputform.clearValidation();
		});
	}
}
