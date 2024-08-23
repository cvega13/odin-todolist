import { ProjectManager } from "./ProjectManager.js";
import { renderProjects, renderCurrentProject } from "./RenderController.js";
import "./styles.css";
const Project = require("./Project.js").Project;
const ProjectItem = require("./ProjectItem.js").ProjectItem;


let projects = new ProjectManager();


function deleteItemHandler() {
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
        renderCurrentProject(projects);
        deleteItemHandler()
    })


    // Adds new Project to List
    function projectFormSubmitHandler() {
        const title = document.querySelector("#titleProject").value;
    
        const newProject = new Project(title);
        projects.addItem(newProject);
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

        const newItem = new ProjectItem(title, dueDate, priority);
        projects.currentProject.addItem(newItem);
        renderCurrentProject(projects);
        deleteItemHandler()

        itemDialog.close();
        itemForm.reset();
    }
    itemForm.addEventListener("submit", itemFormSubmitHandler);
}
FormController();



// Initializes default project
function defaultProject() {
    const defaultProject = new Project("Default Project");

    const defaultItemOne = new ProjectItem("Buy new sandals", new Date(2024, 5, 17), "Low", "yo");
    const defaultItemTwo = new ProjectItem("Wedding Anniversary", new Date(2024, 12, 14), "High");
    const defaultItemThree = new ProjectItem("Send Mail", new Date(2024, 3, 8), "Medium");
    const defaultItemFour = new ProjectItem("Test Project", new Date(2024, 6, 22), "High");
    defaultProject.addItem(defaultItemOne);
    defaultProject.addItem(defaultItemTwo);
    defaultProject.addItem(defaultItemThree);
    defaultProject.addItem(defaultItemFour);

    projects.addItem(defaultProject);
    renderProjects(projects);
    renderCurrentProject(projects);
    deleteItemHandler();
}
defaultProject();





// import odinImage from "./odin.png";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);