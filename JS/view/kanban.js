import Column from "./column.js";

export default class kanban {
    constructor(root){
        this.root = root;

        // For every column in the array "static columns() {" => append a column from column.js
        kanban.columns().forEach(column => {
            const columnView = new Column(column.id, column.title);

            this.root.appendChild(columnView.elements.root);
        });
    }

    // Create all columns, with ID and title.
    static columns() {
        return[
            {
                id: 1,
                title: "Maandag"
            },
            {
                id: 2,
                title: "Dinsdag"
            },
            {
                id: 3,
                title: "Woensdag"
            },
            {
                id: 4,
                title: "Donderdag"
            },
            {
                id: 5,
                title: "Vrijdag"
            },
            {
                id: 6,
                title: "Zaterdag"
            },
            {
                id: 7,
                title: "Zondag"
            }

        ]
    }
}