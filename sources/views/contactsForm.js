import {JetView} from "webix-jet";

import {contactsCollection, statusesCollection, countriesCollection} from "../models/dataCollection";

const CONTACTS_FORM_ID = "contacts_form";

export default class ContactsForm extends JetView {
	config() {
		return {
			view: "form",
			localId: CONTACTS_FORM_ID,
			rows: [
				{
					template: "EDIT CONTACTS",
					type: "section"
				},
				{
					view: "text",
					name: "Name",
					label: "Name",
					value: "",
					invalidMessage: "Name should not be empty"
				},
				{
					view: "text",
					name: "Email",
					label: "Email",
					value: "",
					invalidMessage: "Incorrect email address"
				},
				{
					view: "text",
					name: "Status",
					label: "Status",
					value: "",
					invalidMessage: "Incorrect status"
				},
				{
					view: "text",
					name: "Country",
					label: "Country",
					value: "",
					invalidMessage: "Incorrect country"
				},
				{
					cols: [
						{
							view: "button",
							value: "Save",
							css: "webix_primary",
							click: () => this.saveForm()
						},
						{
							view: "button",
							value: "Clear",
							click: () => this.clearForm()
						}
					]
				},
				{ }
			],
			rules: {
				Name: this.webix.rules.isNotEmpty,
				Email: this.webix.rules.isEmail,
				Status: value => (value >= 1 && value <= 2),
				Country: this.webix.rules.isNotEmpty
			}
		};
	}

	init() {
		this.inputform = this.$$(CONTACTS_FORM_ID);
	}

	urlChange(view) {
		console.log("kek");
		const contactsID = this.getParam("id");
		if (contactsID) {
			this.inputform.setValues(contactsCollection.getItem(contactsID));
		}
	}

	saveForm() {
		if (this.inputform.validate()) {
			const values = this.inputform.getValues();
			contactsCollection.updateItem(values.id, values);
			this.webix.message("Contact was successfully saved");
		}
	}

	clearForm() {
		webix.confirm("Are you sure you want to clean the form?").then(() => {
			this.inputform.clear();
			this.inputform.clearValidation();
		});
	}
}
