import { ProjectManager } from "./ProjectManager.js";
import "./styles.css";
const Project = require("./Project.js").Project;
const ProjectItem = require("./ProjectItem.js").ProjectItem;


let projects = new ProjectManager();

// Render projects in sidebar
function renderProjects() {
    const projectList = document.querySelector("#projectList");
    projectList.textContent = '';

    projects.items.forEach(function (item) {
        const newProject = document.createElement("p");
        newProject.textContent = item.title;
        
        // Adds functionality to switch current project
        newProject.addEventListener("click", (e) => {
            projects.currentProject = item;
            renderProjects();
            renderCurrentProject();
        })
        projectList.insertBefore(newProject, projectList.firstChild);
    });
}

// Render items in current project
function renderCurrentProject() {
    const items = document.querySelector("#todoList");
    const title = document.querySelector("#projectTitle");
    items.textContent = ''

    if (projects.currentProject.items == undefined) return;

    title.textContent = projects.currentProject.title;
    projects.currentProject.items.forEach(function (item) {
        const newItem = document.createElement("div");
        newItem.textContent = item.title;
        items.appendChild(newItem);
    });
}
    


function FormController() {
    const projectDialog = document.querySelector("#newProjectDialog");
    const itemDialog = document.querySelector("#newItemDialog");
    const projectForm = document.querySelector("#newProjectDiv");
    const itemForm = document.querySelector("#newItemDiv");
    
    // Opens form to add new Project/Item
    const addButtons = document.querySelectorAll(".addBtn");
    addButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            if (e.target.classList.contains('newProject')) {
                projectDialog.showModal();
            } else {
                itemDialog.showModal();
            }
        })
    })
    
    // Closes form for new project/item
    const cancelButtons = document.querySelectorAll(".cancelBtn");
    cancelButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            if (e.target.classList.contains('newProject')) {
                projectDialog.close();
            } else {
                itemDialog.close();
            }
        })
    })


    // Adds new Project to List
    function projectFormSubmitHandler() {
        const title = document.querySelector("#title").value;
    
        const newProject = new Project(title);
        projects.addItem(newProject);
        renderProjects();
        renderCurrentProject();

        projectDialog.close()
        projectForm.reset();
    }
    projectForm.addEventListener("submit", projectFormSubmitHandler);
    
    // Adds new item to current project
    function itemFormSubmitHandler() {
        const title = document.querySelector("#titleItem").value;
        const dueDate = document.querySelector("#dueDate").value;
        const priority = document.querySelector("#priority").value;

        const newItem = new ProjectItem(title, dueDate, priority);
        projects.currentProject.addItem(newItem);
        renderCurrentProject();

        itemDialog.close();
        itemForm.reset();
    }
    itemForm.addEventListener("submit", itemFormSubmitHandler);
}
FormController();








// Initializes default project
function defaultProject() {
    const defaultProject = new Project("default project");

    const defaultItemOne = new ProjectItem("default item 1", "8/17/2024", "Medium");
    const defaultItemTwo = new ProjectItem("default item 2", "8/17/2024", "Medium");
    const defaultItemThree = new ProjectItem("default item 3", "8/17/2024", "Medium");
    defaultProject.addItem(defaultItemOne);
    defaultProject.addItem(defaultItemTwo);
    defaultProject.addItem(defaultItemThree);

    projects.addItem(defaultProject);
    renderProjects();
    renderCurrentProject();
}
defaultProject();





// import odinImage from "./odin.png";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);