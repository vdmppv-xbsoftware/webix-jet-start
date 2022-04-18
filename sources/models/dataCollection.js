import contacts from "./contacts";
import countries from "./countries";
import statuses from "./statuses";

const contactsCollection = new webix.DataCollection({
	data: contacts
});

const countriesCollection = new webix.DataCollection({
	data: countries
});

const statusesCollection = new webix.DataCollection({
	data: statuses
});

export {contactsCollection, countriesCollection, statusesCollection};
