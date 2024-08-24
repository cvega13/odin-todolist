import { format, subMonths, addDays } from "date-fns";

// Render Projects on the Sidebar
export function renderProjects(projects) {
    const projectList = document.querySelector("#projectList");
    projectList.textContent = '';

    projects.items.forEach(function (item) {
        const newProject = document.createElement("p");
        newProject.textContent = item.title;
        
        // Adds functionality to switch current project
        newProject.addEventListener("click", (e) => {
            projects.currentProject = item;
            localStorage.setItem("projects", JSON.stringify(projects));
            renderProjects(projects);
            renderCurrentProject(projects);
        })
        projectList.insertBefore(newProject, projectList.firstChild);
    });
}

// Render Items of the current project
export function renderCurrentProject(projects) {
    const items = document.querySelector("#itemList");
    const title = document.querySelector("#projectTitle");
    items.textContent = '';

    if (projects.currentProject == undefined) return;

    title.textContent = projects.currentProject.title;
    projects.currentProject.items.forEach(function (item) {
        const newItem = document.createElement("div");
        newItem.classList.add("itemDiv");

        newItem.addEventListener("click", (e) => {
            const itemDetails = document.querySelector("#itemDetailDialog");
            newItem.setAttribute("index", projects.currentProject.items.indexOf(item));

            const itemTitle = document.querySelector("#itemTitle");
            itemTitle.textContent = item.title;
            const itemDueDate = document.querySelector("#itemDueDate");
            itemDueDate.textContent = "Due: " + format(addDays(item.dueDate, 1), "MM/dd/yyyy");
            const itemPriority = document.querySelector("#itemPriority");
            itemPriority.textContent = "Priority: " + item.priority;
            const itemNotes = document.querySelector("#itemNotes");
            itemNotes.textContent = "Notes: " + item.notes;

            itemDetails.showModal()
        })


        const itemTitle = document.createElement("p");
        itemTitle.classList.add("itemTitle");
        itemTitle.textContent = item.title;
        newItem.appendChild(itemTitle);

        const itemDueDate = document.createElement("p");
        itemDueDate.classList.add("itemDueDate");
        itemDueDate.textContent = "Due: " + format(addDays(item.dueDate, 1), "MM/dd/yyyy")
        newItem.appendChild(itemDueDate);

        const itemPriority = document.createElement("div")
        itemPriority.classList.add("itemPriority");
        itemPriority.classList.add(item.priority);
        newItem.appendChild(itemPriority);

        items.appendChild(newItem);
    });
}