const STORAGE_KEY = "task-track-v1";

const taskForm = document.getElementById("task-form");
const taskText = document.getElementById("task-text");
const taskDate = document.getElementById("task-date");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const taskTemplate = document.getElementById("task-item-template");
const reportMonth = document.getElementById("report-month");
const reportSummary = document.getElementById("report-summary");
const reportList = document.getElementById("report-list");

const now = new Date();
reportMonth.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
taskDate.value = new Date().toISOString().slice(0, 10);

let tasks = loadTasks();

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [];
  }
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function dateToMonth(dateValue) {
  return dateValue.slice(0, 7);
}

function formatDate(dateValue) {
  return new Date(`${dateValue}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function renderTasks() {
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  const sorted = [...tasks].sort((a, b) => a.plannedDate.localeCompare(b.plannedDate));

  sorted.forEach((task) => {
    const node = taskTemplate.content.cloneNode(true);
    node.querySelector(".task-text").textContent = task.text;
    node.querySelector(".task-meta").textContent = `Planned: ${formatDate(task.plannedDate)} • ${task.done ? "Done" : "Pending"}`;

    const doneBtn = node.querySelector(".done-btn");
    doneBtn.textContent = task.done ? "Undo" : "Mark Done";
    doneBtn.addEventListener("click", () => {
      task.done = !task.done;
      task.doneDate = task.done ? new Date().toISOString().slice(0, 10) : null;
      saveTasks();
      renderAll();
    });

    node.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveTasks();
      renderAll();
    });

    taskList.appendChild(node);
  });
}

function renderReport() {
  const selectedMonth = reportMonth.value;
  const doneInMonth = tasks
    .filter((task) => task.done && task.doneDate && dateToMonth(task.doneDate) === selectedMonth)
    .sort((a, b) => a.doneDate.localeCompare(b.doneDate));

  reportSummary.textContent = `${doneInMonth.length} task(s) completed in ${selectedMonth}.`;
  reportList.innerHTML = "";

  doneInMonth.forEach((task) => {
    const li = document.createElement("li");
    li.className = "report-item";
    li.textContent = `${formatDate(task.doneDate)}: ${task.text}`;
    reportList.appendChild(li);
  });
}

function renderAll() {
  renderTasks();
  renderReport();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskText.value.trim();
  const plannedDate = taskDate.value;

  if (!text || !plannedDate) {
    return;
  }

  tasks.push({
    id: crypto.randomUUID(),
    text,
    plannedDate,
    done: false,
    doneDate: null,
  });

  taskForm.reset();
  taskDate.value = new Date().toISOString().slice(0, 10);
  saveTasks();
  renderAll();
});

reportMonth.addEventListener("change", renderReport);

renderAll();
