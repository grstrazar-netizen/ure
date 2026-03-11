const entriesByDay = {
  "2026-03-11": [
    { task: "Acme · UX audit", duration: "1h 20m", amount: "€160" },
    { task: "Nova · Translation", duration: "45m", amount: "€50" },
    { task: "Internal admin", duration: "30m", amount: "€0" },
  ],
  "2026-03-10": [
    { task: "Acme · Kickoff call", duration: "1h", amount: "€120" },
    { task: "Beta · Bug triage", duration: "2h 10m", amount: "€260" },
  ],
  "2026-03-12": [{ task: "No logs yet", duration: "", amount: "" }],
};

const dayTitle = document.getElementById("day-title");
const daySubtitle = document.getElementById("day-subtitle");
const cardSequence = document.getElementById("card-sequence");
const activityList = document.getElementById("activity-list");
const prevDay = document.getElementById("prev-day");
const prevDayMini = document.getElementById("prev-day-mini");
const nextDay = document.getElementById("next-day");
const voiceCount = document.getElementById("voice-count");
const amountTotal = document.getElementById("amount-total");

const voiceModal = document.getElementById("voice-modal");
const aiModal = document.getElementById("ai-modal");
const pdfModal = document.getElementById("pdf-modal");
const parseVoice = document.getElementById("parse-voice");
const confirmEntry = document.getElementById("confirm-entry");
const aiPreview = document.getElementById("ai-preview");
const pdfPreview = document.getElementById("pdf-preview");

const openVoice = document.getElementById("open-voice");
const startTrack = document.getElementById("start-track");
const showPdf = document.getElementById("show-pdf");
const downloadPdf = document.getElementById("download-pdf");

const baseDate = new Date("2026-03-11T00:00:00");
let offset = 0;

function asKey(date) {
  return date.toISOString().slice(0, 10);
}

function labelDate(date) {
  const today = new Date("2026-03-11T00:00:00");
  const delta = Math.round((date - today) / 86400000);
  const prefix = delta === 0 ? "Today" : delta < 0 ? `${Math.abs(delta)} day(s) ago` : `In ${delta} day(s)`;

  return {
    title: prefix,
    detail: date.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

function getCurrentDate() {
  const date = new Date(baseDate);
  date.setDate(baseDate.getDate() + offset);
  return date;
}

function sumAmount(rows) {
  return rows.reduce((sum, row) => {
    const amount = Number((row.amount || "").replace(/[^0-9.]/g, ""));
    return sum + (Number.isFinite(amount) ? amount : 0);
  }, 0);
}

function renderRows(rows) {
  activityList.innerHTML = "";
  const padded = [...rows];
  while (padded.length < 6) {
    padded.push({ task: "", duration: "", amount: "" });
  }

  padded.forEach((row) => {
    const li = document.createElement("li");
    li.className = "activity-row";
    li.innerHTML = `
      <span class="circle" aria-hidden="true"></span>
      <span class="activity-main">${row.task || ""}</span>
      <span class="activity-meta">${[row.duration, row.amount].filter(Boolean).join(" · ")}</span>
    `;
    activityList.appendChild(li);
  });
}

function renderDay() {
  const currentDate = getCurrentDate();
  const key = asKey(currentDate);
  const labels = labelDate(currentDate);
  const rows = entriesByDay[key] ?? [{ task: "No logs yet", duration: "", amount: "" }];

  dayTitle.textContent = labels.title;
  daySubtitle.textContent = labels.detail;
  cardSequence.textContent = key;
  voiceCount.textContent = `${rows.filter((row) => row.task && row.task !== "No logs yet").length}`;
  amountTotal.textContent = `€${sumAmount(rows).toFixed(0)}`;
  renderRows(rows);
}

function openModal(modal) {
  modal.classList.add("is-active");
}

function closeModal(modal) {
  modal.classList.remove("is-active");
}

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.close);
    if (target) {
      closeModal(target);
    }
  });
});

function goPreviousDay() {
  offset -= 1;
  renderDay();
}

function goNextDay() {
  offset += 1;
  renderDay();
}

prevDay.addEventListener("click", goPreviousDay);
prevDayMini.addEventListener("click", goPreviousDay);
nextDay.addEventListener("click", goNextDay);

let touchStartX = 0;
document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
});

document.addEventListener("touchend", (event) => {
  const dist = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dist) < 40) {
    return;
  }
  offset += dist > 0 ? -1 : 1;
  renderDay();
});

openVoice.addEventListener("click", () => openModal(voiceModal));
startTrack.addEventListener("click", () => openModal(voiceModal));

parseVoice.addEventListener("click", () => {
  closeModal(voiceModal);
  aiPreview.innerHTML = `
    <strong>Client:</strong> Acme<br>
    <strong>Task:</strong> UX audit<br>
    <strong>Duration:</strong> 1h 20m<br>
    <strong>Rate:</strong> Premium (€120/h)<br>
    <strong>Total:</strong> €160
  `;
  openModal(aiModal);
});

confirmEntry.addEventListener("click", () => {
  const key = asKey(getCurrentDate());
  const rows = entriesByDay[key] ?? [];
  rows.unshift({ task: "Acme · UX audit", duration: "1h 20m", amount: "€160" });
  entriesByDay[key] = rows;
  closeModal(aiModal);
  renderDay();
});

showPdf.addEventListener("click", () => {
  const key = asKey(getCurrentDate());
  const rows = entriesByDay[key] ?? [];
  const total = sumAmount(rows);

  pdfPreview.innerHTML = `
    <strong>Flowtime daily report</strong><br>
    Date: ${key}<br>
    Entries: ${rows.length}<br>
    Amount due: €${total.toFixed(2)}<br><br>
    <em>This is a clickable prototype preview.</em>
  `;
  openModal(pdfModal);
});

downloadPdf.addEventListener("click", () => {
  alert("Prototype action: PDF would download here.");
});

renderDay();
