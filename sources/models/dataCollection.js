const contactsCollection = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/"
});

const countriesCollection = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/countries/",
	save: "rest->http://localhost:8096/api/v1/countries/"
});

const statusesCollection = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/statuses/",
	save: "rest->http://localhost:8096/api/v1/statuses/"
});

export {contactsCollection, countriesCollection, statusesCollection};
