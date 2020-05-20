//Init variables
let editMode = false;

//Get tasks from local storage on page load
getTasks();

//Add a new task to the loacal storage
document.getElementById("form").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    let taskTitle = document.getElementById("task").value;
    var oldTasks = [];
    oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let lastId = oldTasks.length;
    var task = {
      id: lastId + 1,
      title: taskTitle,
      completed: false,
    };
    oldTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
    getTasks();
    taskTitle.value = "";
  },
  true
);

//Check a task done
function checkBoxClick(el) {
  taskList = JSON.parse(localStorage.getItem("tasks"));
  taskList.forEach((task) => {
    if (task.id == el.value) {
      if (task.completed) {
        task.completed = false;
      } else {
        task.completed = true;
      }
    }
  });
  localStorage.setItem("tasks", JSON.stringify(taskList));
  getTasks();
}

//Delete Task
function deleteTask(id) {
  let taskList = JSON.parse(localStorage.getItem("tasks"));
  let newTaskList = taskList.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(newTaskList));
  getTasks();
}

//TODO
//Turn on edit mode and change form
function editModeOn() {}

//Get tasks from local storage and show them, also contains the checkbox and edit title and ofc deleteTask, to be ran at page load
function getTasks() {
  var tasks = "";
  if (localStorage.getItem("tasks") == null) {
    localStorage.setItem("tasks", "[]");
    location.reload();
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  document.getElementById("taskShow").innerHTML = "";
  tasks.forEach(function (task, index) {
    let completedTask = "";
    let checked = "";
    if (task.completed) {
      completedTask = "checked";
      checked = "text-decoration: line-through; opacity: 25%; color: #111;";
    } else {
      completedTask = "";
      checked = "";
    }
    document.getElementById("taskShow").innerHTML +=
      "<h2 style='" +
      checked +
      "'><span onclick='deleteTask(" +
      task.id +
      ")' class='delete'>X</span><span onclick='editModeOn()'>" +
      task.title +
      "</span><input type='checkbox' value='" +
      task.id +
      "' id='checkbox'" +
      completedTask +
      " onchange='checkBoxClick(this)'  class='status' name='checkbox'> </checkbox></h2>";
  });
}
