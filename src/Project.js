/*
Project.js
    - Class that holds an array of ProjectItem objects
    - Project is given a title
*/

import { Manager } from "./Manager";

export class Project extends Manager {
    constructor(title) {
        super();
        this.title = title;
        this.index = 0;
    }
}