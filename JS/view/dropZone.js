import kanbanAPI from "../api/kanbanAPI.js";


export default class DropZone{
    static createDropZone(){
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
            <div class="kanban__dropzone"></div>
        `).children[0];

        // Drag over - Add class element (for CSS mainly);
        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("kanban__dropzone--active");
        });

        // Also remove class element, when you leave the area;
        dropZone.addEventListener("dragleave", () =>{
            dropZone.classList.remove("kanban__dropzone--active");
        });

        dropZone.addEventListener("drop", e =>{
            e.preventDefault();
            dropZone.classList.remove("kanban__dropzone--active");

            // closest element with class .kanban__column
            const columnElement = dropZone.closest(".kanban__column");
            // Column id of closest element with .kanban__column
            const columnId = Number(columnElement.dataset.id);
            // Create array of number of elements with .kanban__dropzone
            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
            // Create what index of array we drop into, 0-based.
            const droppedIndex = dropZonesInColumn.indexOf(dropZone);
            // Get ID from item we are dragging, e.dataTransfer.getData("text/plain") is set in item.js
            const itemId = Number(e.dataTransfer.getData("text/plain"));
            // Get all HTML data from that ID, so we can drag the entire block
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
            // Get HTML data from ID we are dropping after, we use this to drop the HTML after we are currently draggin
            const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone;

            // IF we drop the item we drag, in its own dragzone; return.
            if (droppedItemElement.contains(dropZone)){
                return;
            }

            // Move HTML we are currently dragging, after, the HTML we are dragging over/under
            insertAfter.after(droppedItemElement);
            // Move storage from 1 column to the other column
            kanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex
            });
        });

        return dropZone;
    }
}