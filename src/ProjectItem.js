/*
ProjectItem.js
    - Class that holds details of a Project Item
*/

export class ProjectItem {
    constructor(title, dueDate, priority, description="", notes="") {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.notes = notes;
    }
}