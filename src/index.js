import { ProjectManager } from "./ProjectManager.js";
import "./styles.css";
const Project = require("./Project.js").Project;
const ProjectItem = require("./ProjectItem.js").ProjectItem;


let projectList = new ProjectManager();


// function RenderController() {

    function renderProjects() {
        const projects = document.querySelector("#projectList");
        projects.textContent = '';

        projectList.items.forEach(function (item) {
            const newProject = document.createElement("p");
            newProject.textContent = item.title;
            projects.appendChild(newProject);
        })
    }

    function renderCurrentProject() {
        const items = document.querySelector("#todoList");
        items.textContent = ''

        projectList.currentProject.items.forEach(function (item) {
            const newItem = document.createElement("div");
            newItem.textContent = item.title;
            items.appendChild(newItem);
        });
    }
    


// }

function FormController() {
    const dialog = document.querySelector("#newProjectDialog");
    const form = document.querySelector("#newProjectDiv")
    const cancelBtn = document.querySelector("#cancelBtn");
    const newProjectButton = document.querySelector("#newProjectBtn");

    // Opens form to add new Project
    newProjectButton.addEventListener("click", () => {
        dialog.showModal();
    });
    
    // Closes new project form
    cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        dialog.close()
    })
    
    // Adds new Project to List
    function formSubmitHandler() {
        const title = document.querySelector("#title").value;
    
        const newProject = new Project(title);
        projectList.addItem(newProject);
        renderProjects();

        dialog.close()
        form.reset();
    }
    form.addEventListener("submit", formSubmitHandler);
    
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

    projectList.addItem(defaultProject);
    projectList.currentIndex = 0;
    renderProjects();
    renderCurrentProject();
}
defaultProject();





// import odinImage from "./odin.png";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);