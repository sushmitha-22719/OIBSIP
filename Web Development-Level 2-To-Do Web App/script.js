const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

let tasks = [];

// Add a new task
addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks();
}

// Display tasks
function displayTasks() {
    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    let pending = 0;
    let completed = 0;

    tasks.forEach(function (task) {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
            completed++;
        } else {
            pending++;
        }

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "task-buttons";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.textContent = task.completed ? "Undo" : "Done";

        completeButton.addEventListener("click", function () {
            toggleTask(task.id);
        });

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {
            editTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(text);
        li.appendChild(buttonContainer);

        if (task.completed) {
            completedTasks.appendChild(li);
        } else {
            pendingTasks.appendChild(li);
        }
    });

    pendingCount.textContent = pending;
    completedCount.textContent = completed;

    showEmptyMessage(pendingTasks, pending, "No pending tasks.");
    showEmptyMessage(completedTasks, completed, "No completed tasks.");
}

// Complete or undo a task
function toggleTask(id) {
    tasks.forEach(function (task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }
    });

    displayTasks();
}

// Edit a task
function editTask(id) {
    const task = tasks.find(function (task) {
        return task.id === id;
    });

    const newText = prompt("Edit your task:", task.text);

    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        displayTasks();
    }
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    displayTasks();
}

// Show message when there are no tasks
function showEmptyMessage(list, count, message) {
    if (count === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = message;
        list.appendChild(emptyMessage);
    }
}

// Display initial empty state
displayTasks();