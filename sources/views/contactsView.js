import {JetView} from "webix-jet";

import contacts from "../models/contacts";

const CONTACTS_LIST_ID = "contacts_list";
const CONTACTS_FORM_ID = "contacts_form";

export default class ContactsView extends JetView {
	config() {
		const contactsList = {
			view: "list",
			localId: CONTACTS_LIST_ID,
			type: {
				height: 60
			},
			template: "Name: #Name#, Email: #Email# <br/> Status: #Status#, Country: #Country#",
			select: true
		};

		const contactsForm = {
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

		return {
			cols: [contactsList, contactsForm]
		};
	}

	init(view) {
		view.queryView("list").parse(contacts);
		this.inputform = view.queryView("form");
	}

	saveForm() {
		if (!this.inputform.validate()) this.webix.message("Check the input fields for correct input");
	}

	clearForm() {
		webix.confirm("Are you sure you want to clean the form?").then(() => {
			this.inputform.clear();
			this.inputform.clearValidation();
		});
	}
}

