import {JetView} from "webix-jet";

import {countriesCollection, statusesCollection} from "../models/dataCollection";
import DataTable from "./dataTable";

export default class DataView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "tabview",
			cells: [
				{
					header: _("Countries"),
					body: new DataTable(this.app, countriesCollection)
				},
				{
					header: _("Statuses"),
					body: new DataTable(this.app, statusesCollection)
				}
			]
		};
	}
}
