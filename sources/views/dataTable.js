import {JetView} from "webix-jet";

const INPUT_NAME_ID = "input_name_id";
const DATATABLE_ID = "datatable_id";

export default class DataTable extends JetView {
	constructor(app, data) {
		super(app);
		this.data = data;
	}

	config() {
		return {
			rows: [
				{
					margin: 10,
					cols: [
						{
							view: "text",
							localId: INPUT_NAME_ID
						},
						{
							view: "button",
							value: "Add",
							css: "webix_primary",
							gravity: 0.3,
							click: () => this.addItem()
						},
						{
							view: "button",
							value: "Delete",
							css: "webix_primary",
							gravity: 0.3,
							click: () => this.deleteItem()
						}
					]
				},
				{
					view: "datatable",
					localId: DATATABLE_ID,
					autoConfig: true,
					editable: true,
					editor: "text"
				}
			]
		};
	}

	init(view) {
		this.input = view.queryView("text");
		this.table = view.queryView("datatable");
		this.table.parse(this.data);
	}

	addItem() {
		const value = this.input.getValue();
		if (value) {
			this.table.add({Name: value, Icon: "user"});
			this.input.setValue("");
		}
	}

	deleteItem() {
		const selected = this.table.getSelectedId();
		if (selected) {
			this.table.remove(selected);
		}
	}
}
