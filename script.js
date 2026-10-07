const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Add Task
function addTask() {

    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    createTask(taskInput.value.trim());

    taskInput.value = "";

    saveTasks();
}


// Create Task
function createTask(text, completed = false) {

    const li = document.createElement("li");

    // CheckBox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    // Task Text
    const taskText = document.createElement("span");
    taskText.innerText = text;

    if (completed) {
        taskText.classList.add("completed");
    }


    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit");

    editBtn.addEventListener("click", function () {

        const newTask = prompt(
            "Edit your task:",
            taskText.innerText
        );

        if (newTask !== null && newTask.trim() !== "") {

            taskText.innerText = newTask.trim();

            saveTasks();
        }
    });


    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete");

    deleteBtn.addEventListener("click", function () {

        li.remove();

        saveTasks();
    });


    // CheckBox Change
    checkbox.addEventListener("change", function () {

        taskText.classList.toggle(
            "completed",
            checkbox.checked
        );

        saveTasks();
    });


    // Add Elements to Li
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}


// Save Tasks
function saveTasks() {

    const tasks = [];

    taskList.querySelectorAll("li").forEach(function (li) {

        const checkbox = li.querySelector(
            'input[type="checkbox"]'
        );

        const taskText = li.querySelector("span");

        tasks.push({
            text: taskText.innerText,
            completed: checkbox.checked
        });
    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// Load Tasks After reload
function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {

        const tasks = JSON.parse(savedTasks);

        tasks.forEach(function (task) {

            createTask(
                task.text,
                task.completed
            );
        });
    }
}


// Load Saved Tasks
loadTasks();