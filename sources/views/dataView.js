import {JetView} from "webix-jet";

import countries from "../models/countries";
import statuses from "../models/statuses";
import DataTable from "./dataTable";

export default class DataView extends JetView {
	config() {
		return {
			view: "tabview",
			cells: [
				{
					header: "Countries",
					body: new DataTable(this.app, statuses)
				},
				{
					header: "Statuses",
					body: new DataTable(this.app, countries)
				}
			]
		};
	}
}
