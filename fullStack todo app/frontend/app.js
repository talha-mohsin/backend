const task = document.querySelector("#task");
const dueDate = document.querySelector("#dueDate");
const taskStatus = document.querySelector("#status");
const priority = document.querySelector("#priority");
const updatedTask = document.querySelector("#updatedTask");
const updateddueDate = document.querySelector("#updateddueDate");
const updatedStatus = document.querySelector("#updatedStatus");
const updatedPriority = document.querySelector("#updatedPriority");

document.querySelector("#addBtn").addEventListener("click", () => {
  taskData = {
    task: task.value,
    dueDate: dueDate.value,
    status: taskStatus.value,
    priority: priority.value,
  };
  createTask(taskData);
});

// Creating Task API Hitting
async function createTask(task) {
  const res = await fetch(`http://localhost:5000/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const result = await res.json();
}

let data;

// Reading Task API Hitting
async function getAllTask() {
  const res = await fetch(`http://localhost:5000/task`);

  const result = await res.json();
  data = result.data;
  tasksUI();
}
getAllTask();

// Updating Task API Hitting
async function updateTask(updatedTask, id) {
  const res = await fetch(`http://localhost:5000/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });

  const result = await res.json();
  data = result.data;
  getAllTask();
}

// Deleting Task API Hitting
async function deleteTask(id) {
  const res = await fetch(`http://localhost:5000/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();
  window.location.reload();
}

function tasksUI() {
  const tasksHTML = data.map((d) => {
    return `<tr id="${d._id}">
                <td>${d.task}</td>
                <td>${d.dueDate}</td>
                <td>${d.status}</td>
                <td>${d.priority}</td>
                <td><button style="background-color: #4caf50" onclick="editTaskUI(this)">Edit</button></td>
                <td><button onclick="deletedTaskUI(this)">Delete</button></td>
            </tr>`;
  });
  document.querySelector("#allTasks").innerHTML = tasksHTML.join(" ");
}

function deletedTaskUI(e) {
  const row = e.parentElement.parentElement;
  const id = row.id;

  deleteTask(id);
}

let editingTaskId;
function editTaskUI(e) {
  const row = e.parentElement.parentElement;
  editingTaskId = row.id;

  document.querySelector(".updatedForm").style.display = "flex";
}

document.querySelector("#updateBtn").addEventListener("click", () => {
  const taskDetail = {
    task: updatedTask.value,
    dueDate: updateddueDate.value,
    status: updatedStatus.value,
    priority: updatedPriority.value,
  };
  modalClose();
  updateTask(taskDetail, editingTaskId);
});

document.querySelector("#closeBtn").addEventListener("click", modalClose);

function modalClose() {
  document.querySelector(".updatedForm").style.display = "none";
}
