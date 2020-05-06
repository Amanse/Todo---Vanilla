getTasks();
document.getElementById("form").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    var taskTitle = document.getElementById("task").value;
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
  },
  true
);

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
//let checkBoxes = document.getElementsByName("checkbox");
//checkBoxes.forEach((checkbox) => {
//  checkbox.addEventListener(
//    "change",
//    function () {
//      console.log(this.value);
//      taskList = JSON.parse(localStorage.getItem("tasks"));
//     taskList.forEach((task) => {
//        if (task.id == this.value) {
//          if (task.completed) {
//            task.completed = false;
//          } else {
//            task.completed = true;
//         }
//        }
//      });
//      localStorage.setItem("tasks", JSON.stringify(taskList));
//      getTasks();
//    },
//    true
//  );
//});

function getTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
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
      "'>" +
      task.title +
      "<input type='checkbox' value='" +
      task.id +
      "' id='checkbox'" +
      completedTask +
      " onchange='checkBoxClick(this)'  class='status' name='checkbox'> </checkbox></h2>";
  });
}
