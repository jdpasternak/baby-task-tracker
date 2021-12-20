import { generateTable } from "./generateTable.js";

const DateTime = luxon.DateTime;

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
});

$("main").append(generateTable());

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
    let el = $(`th:contains("${e.name}")`)
      .closest("tr")
      .children(`td:contains("${e.time}")`)
      .children("label")
      .children("input");
    el[0].checked = true;
  }
};
