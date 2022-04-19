import {JetView} from "webix-jet";

const INPUT_NAME_ID = "input_name_id";
const DATATABLE_ID = "datatable_id";

export default class DataTable extends JetView {
	constructor(app, data) {
		super(app);
		this.data = data;
	}

	config() {
		const _ = this.app.getService("locale")._;

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
							value: _("Add"),
							css: "webix_primary",
							gravity: 0.3,
							click: () => this.addItem()
						},
						{
							view: "button",
							value: _("Delete"),
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

	init() {
		this.input = this.$$(INPUT_NAME_ID);
		this.table = this.$$(DATATABLE_ID);
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
