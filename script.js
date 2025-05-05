let tasks = [];
try {
  tasks  = localStorage.getItem("local_tasks") ? JSON.parse(localStorage.getItem("local_tasks")) : [];
} catch (e) {
    console.error("Error parsing tasks from localStorage:", e);
    tasks = [];
}
let a = false;
let b = true;

displayTasks();
function addTask(event) {
  event.preventDefault();
  const task = {
    id: 0,
    title: event.target.title.value,
    description: event.target.description.value,
    completed: false,
    dueDate: event.target.dueDate.value,
    timestamp: Date.now(),
  };
  tasks.push(task);
  localStorage.setItem("local_tasks", JSON.stringify(tasks));
  displayTasks();
  event.target.reset();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks(a,b);
}

function filterTasks(event) {
   a = event.target.value == "completed";
   b = event.target.value == "all";
  displayTasks(a, b);
}

function sortTasks(event) {
    if (event.target.value == "dueDate") {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else{
        tasks.sort((a, b) => b.timestamp - a.timestamp );
    }
    displayTasks(a,b);
}



function displayTasks(a = false, b = true) {
    localStorage.setItem("local_tasks", JSON.stringify(tasks));
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (task.completed == a || b) {
        
        const li = document.createElement("li");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed || false;
        const content = document.createElement("span");
        content.textContent = `${task.title} - ${task.description}`;
        const date = document.createElement("span");
        date.textContent = `${task.dueDate}`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);
        
        checkbox.onchange = () => {
            tasks[index].completed = checkbox.checked;
            displayTasks();
        };

        li.appendChild(checkbox);
        li.appendChild(content);
        li.appendChild(date);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
  });
}

