export default class kanbanAPI{
    static getItems(columnId){
        const column = read().find(column => column.id == columnId); 

        if (!column){
            return [];
        }

        return column.items;
    }

    static insertItem(columnId, content){
        const data = read();
        const column = data.find(column => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),
            content
        };

        if (!column){
            throw new Error("column does not exist");
        }

        column.items.push(item);
        save(data);

        return item;
    }

    static updateItem(itemId, newProps){
        const data = read();
        const [item, currentColumn] = (() => {
            for(const column of data){
                const item = column.items.find(item => item.id == itemId);

                if (item){
                    return [item, column];
                }
            }
        })();

        if (!item){
            throw new Error("Item not found");
        }

        // IF (newProps.content === undefined) THEN item.content ELSE newProps.content
        // So basicly if newProps is not empty, add it to the item.content
        item.content = newProps.content === undefined ? item.content : newProps.content;


        // Update column and position
        if(
            newProps.columnId !== undefined
            && newProps.position !== undefined
        ){
            const targetColumn = data.find(column => column.id == newProps.columnId);

            if (!targetColumn){
                throw new Error("Target column not found");
            }

            // Delete the item from its current column
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

            // Move item into its new column and position
            targetColumn.items.splice(newProps.position, 0, item);
        }

        save(data);
    }

    static deleteItem(itemId){
        const data = read();

        for (const column of data){
            const item = column.items.find(item => item.id == itemId); 

            if (item){
                column.items.splice(column.items.indexOf(item), 1);
            }  
        }

    save(data);
    }
}


function read(){
    const json = localStorage.getItem("kanban-data");

    // Creates template only once at local storage, if u change this, deleet 'local storage' via F12 in web
    if (!json){
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
            {
                id: 4,
                items: []
            },
            {
                id: 5,
                items: []
            },
            {
                id: 6,
                items: []
            },
            {
                id: 7,
                items: []
            }
        ]
    }

    return JSON.parse(json);
}

function save(data){
    localStorage.setItem("kanban-data", JSON.stringify(data));
}


