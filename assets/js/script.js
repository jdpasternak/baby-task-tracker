import { generateTable } from "./generateTable.js";

/* taskData model

    {
        name: string,
        date: luxon.DateTime,
        time: string,
    }
*/
let taskData = [];

$(document).ready(() => {
  $(`input[type="checkbox"]`).on("change", taskCheckHandler);
  loadTasks();
  $("#clearAll, #clearAllMobile").on("click", clearAllHandler);
  $("#confirmClearAll").on("click", clearAll);
  $("#confirmClearAllModal").modal();
  $(".sidenav").sidenav();
});

// $("main").append(generateTable());

const taskCheckHandler = (evt) => {
  let name = $(evt.target).closest(`tr`).children("th").text();
  let time = $(evt.target).closest(`label`).children(`span`).text();
  let checked = evt.target.checked;

  console.log(`Name: ${name}`);
  console.log(`Time: ${time}`);
  console.log(`Checked: ${checked}`);

  if (checked) {
    taskData.push({ name: name, time: time });
  } else {
    let updatedTaskData = [];
    for (const e of taskData) {
      if (e.name !== name && e.time !== time) {
        updatedTaskData.push(e);
      }
    }
    taskData = updatedTaskData;
  }

  console.log(`Task Data`, taskData);

  saveTasks();
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(taskData));
};

const loadTasks = () => {
  taskData = JSON.parse(localStorage.getItem("tasks")) || [];

  for (const e of taskData) {
    console.log(`Name: ${e.name}\nTime: ${e.time}`);
    $(`input[data-task="${e.name}"][data-time="${e.time}"]`).each(
      (_, e) => (e.checked = true)
    );
  }
};

const clearAllHandler = (evt) => {
  $("#confirmClearAllModal").modal("open");
};

const clearAll = (evt) => {
  $(":checkbox").each((_, e) => {
    e.checked = false;
  });
  taskData = [];
  saveTasks();
  $(".sidenav").sidenav("close");
};
