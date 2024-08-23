/*
Manager.js
    - Super class that holds an array of Objects
    - Items in the array can be sorted by an attribute
*/

export class Manager {
    constructor() {
        this.items = []
    }

    // Add item to item array
    addItem(newItem) {
        this.items.push(newItem);
    }

    deleteItem(index) {
        return this.items.splice(index, 1);
    }
}



