/*
ProjectItem.js
    - Class that holds details of a Project Item
*/

export class ProjectItem {
    constructor(title, dueDate, priority, notes="") {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}