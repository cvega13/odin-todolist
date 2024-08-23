/*
ProjectManager.js
    - Class that holds an array of Project objects
    - Index of current project being viewed is stored
*/

import { Manager } from "./Manager";

export class ProjectManager extends Manager {
    constructor() {
        super();
    }

    get currentProject() {
        return this.items.at(-1);
    }

    set currentProject(project) {
        this.addItem(this.items.splice(this.items.indexOf(project), 1)[0]);
    }
}