import { Manager } from "./Manager.js";
import { ProjectManager } from "./ProjectManager.js";
import { renderProjects, renderCurrentProject } from "./RenderController.js";
import "./styles.css";
const Project = require("./Project.js").Project;
const ProjectItem = require("./ProjectItem.js").ProjectItem;


let projects = new ProjectManager();


export function deleteItemHandler() {
    const itemDivs = document.querySelectorAll("#itemList>div");
    const deleteItem = document.querySelector(".deleteBtn");

    itemDivs.forEach(function(div) {
        div.addEventListener("click", () => {
            deleteItem.setAttribute("index", div.getAttribute("index"));
        })
    })
}

function FormController() {
    const projectDialog = document.querySelector("#newProjectDialog");
    const itemDialog = document.querySelector("#newItemDialog");
    const itemDetailDialog = document.querySelector("#itemDetailDialog");
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
            } else if (e.target.classList.contains('newItem')) {
                itemDialog.close();
            } else {
                itemDetailDialog.close();
            }
        })
    })

    const deleteItem = document.querySelector(".deleteBtn");
    deleteItem.addEventListener("click", () => {
        const itemDetails = document.querySelector("#itemDetailDialog");
        itemDetails.close()
        projects.currentProject.deleteItem(deleteItem.getAttribute("index"));
        localStorage.setItem("projects", JSON.stringify(projects));
        renderCurrentProject(projects);
        deleteItemHandler()
    })


    // Adds new Project to List
    function projectFormSubmitHandler() {
        const title = document.querySelector("#titleProject").value;
    
        const newProject = new Project(title);
        projects.addItem(newProject);
        localStorage.setItem("projects", JSON.stringify(projects));
        renderProjects(projects);
        renderCurrentProject(projects);
        deleteItemHandler();

        projectDialog.close()
        projectForm.reset();
    }
    projectForm.addEventListener("submit", projectFormSubmitHandler);
    
    // Adds new item to current project
    function itemFormSubmitHandler() {
        const title = document.querySelector("#titleItem").value;
        const dueDate = document.querySelector("#dueDate").value;
        const priority = document.querySelector('input[name="priority"]:checked').value;
        const notes = document.querySelector("#notes").value;

        const newItem = new ProjectItem(title, dueDate, priority, notes);
        projects.currentProject.addItem(newItem);
        localStorage.setItem("projects", JSON.stringify(projects));
        renderCurrentProject(projects);
        deleteItemHandler()

        itemDialog.close();
        itemForm.reset();
    }
    itemForm.addEventListener("submit", itemFormSubmitHandler);
}




// Initializes default project
function defaultProject() {
    const defaultProject = new Project("Default Project");

    const defaultItemOne = new ProjectItem("Buy new sandals", new Date(2024, 5, 17), "Low", "Old ones broke.");
    const defaultItemTwo = new ProjectItem("Wedding Anniversary", new Date(2024, 12, 14), "High", "My wife's gonna kill me if I forget.");
    const defaultItemThree = new ProjectItem("Send Mail", new Date(2024, 3, 8), "Medium", "Send the in-laws Christmas cards.");
    const defaultItemFour = new ProjectItem("Test Project", new Date(2024, 6, 22), "High", "Possible bug found.");
    defaultProject.addItem(defaultItemOne);
    defaultProject.addItem(defaultItemTwo);
    defaultProject.addItem(defaultItemThree);
    defaultProject.addItem(defaultItemFour);

    projects.addItem(defaultProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    renderProjects(projects);
    renderCurrentProject(projects);
    deleteItemHandler();
}



if (localStorage.getItem("projects") == null) {
    FormController();
    defaultProject();
} else {    
    const projectManagerJSON = JSON.parse(localStorage.getItem("projects"));

    projectManagerJSON.items.forEach(projectJSON => {
        const project = new Project(projectJSON.title);

        projectJSON.items.forEach(itemJSON => {
            const item = new ProjectItem(itemJSON.title, itemJSON.dueDate, 
                                            itemJSON.priority, itemJSON.notes);
            project.addItem(item);
        })
        projects.addItem(project);
    })

    FormController();
    renderProjects(projects);
    renderCurrentProject(projects);
    deleteItemHandler();
}


// import odinImage from "./odin.png";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);