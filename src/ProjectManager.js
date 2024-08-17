/*
ProjectManager.js
    - Class that holds an array of Project objects
    - Index of current project being viewed is stored
*/

import { Manager } from "./Manager";

export class ProjectManager extends Manager {
    constructor() {
        super();
        this.currentIndex = 0;
    }

    get currentProject() {
        return this.items[this.currentIndex];
    }
}