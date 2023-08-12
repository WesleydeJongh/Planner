import kanbanAPI from "../api/kanbanAPI.js";
import DropZone from "./dropZone.js";


export default class Item{
    constructor(id, content){
        const bottomDropZone = DropZone.createDropZone();


        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;
        this.elements.root.appendChild(bottomDropZone);


        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();

            if(newContent == this.content){
                return;
            }

            this.content = newContent;
            kanbanAPI.updateItem(id, {
                content: this.content
            });
        };

        this.elements.input.addEventListener("blur", onBlur);
        this.elements.root.addEventListener("dblclick", () => {
            const check = confirm("Deleet >?");

            if (check){
                kanbanAPI.deleteItem(id);
                
                // Deleet the HTML, else you only remove it from storage, but the HTML is still there..
                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        });

        // Attach item ID, to dragstart event, when u pick up and item(start drag)
        this.elements.root.addEventListener("dragstart", e =>{
            e.dataTransfer.setData("text/plain", id);
        });

        // When u release the drag, it will drop the 'id' as text, this preventDefault on drop, stops this.
        this.elements.input.addEventListener("drop", e =>{
            e.preventDefault();
        });
    }

    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body);

        // Editable input area
        return range.createContextualFragment(`
            <div class="kanban__item" draggable="true">
                <div class="kanban__item-input" contenteditable> </div>
            </div>
        `).children[0];
    }

}