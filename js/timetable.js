window.onload = loadTimetable;

document.getElementById("timetable-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value.trim();
  const start = document.getElementById("start-time").value;
  const end = document.getElementById("end-time").value;

  if (!subject) { alert("Enter a subject"); return; }

  const checked = document.querySelectorAll(".days-grid input:checked");
  const days = Array.from(checked).map(d => d.value);
  if (days.length === 0) { alert("Select at least one day"); return; }

  const timeLabel = start + " - " + end;
  addEntryToTable(subject, timeLabel, days);
  saveTimetable();
  this.reset();
});

function addEntryToTable(subject, timeLabel, days) {
  const tbody = document.querySelector("#timetable tbody");

  let row = Array.from(tbody.rows).find(r => r.cells[0].textContent === timeLabel);

  if (!row) {
    row = tbody.insertRow();
    row.insertCell().textContent = timeLabel;

    for (let i = 0; i < 6; i++) row.insertCell();

    row.insertCell().innerHTML = createRowActionsHtml();
  }

  days.forEach(day => {
    const idx = getDayIndex(day);
    if (idx >= 1 && idx <= 6) {
      row.cells[idx].textContent = subject;
    }
  });
}

function createRowActionsHtml() {
  return `<div class="row-actions">
            <button class="edit" data-action="edit">Edit</button>
          </div>   <div class="row-actions">
            <button class="delete" data-action="delete">Delete</button>
          </div>`;
}

document.querySelector("#timetable").addEventListener("click", function(e) {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const action = btn.getAttribute("data-action");
  const row = btn.closest("tr");
  if (!row) return;

  const timeLabel = row.cells[0].textContent;

  if (action === "delete") {
    if (!confirm(`Delete entire row for "${timeLabel}"?`)) return;
    row.remove();
    saveTimetable();
    return;
  }

  if (action === "edit") {
    const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    for (let i = 1; i <= 6; i++) {
      const current = row.cells[i].textContent || "";
      const answer = prompt(`Edit ${dayNames[i-1]} (time ${timeLabel}):`, current);
      if (answer === null) {
        return;
      }
      row.cells[i].textContent = answer.trim();
    }
    saveTimetable();
  }
});

// helper: map day name to table column index (1..6)
function getDayIndex(day) {
  const list = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return list.indexOf(day) + 1;
}

// save entire table to localStorage
function saveTimetable() {
  const tbody = document.querySelector("#timetable tbody");
  const data = Array.from(tbody.rows).map(row => {
    return {
      time: row.cells[0].textContent,
      days: Array.from({length:6}, (_, i) => (row.cells[i+1].textContent || ""))
    };
  });
  localStorage.setItem("timetableData", JSON.stringify(data));
}

function loadTimetable() {
  const saved = localStorage.getItem("timetableData");
  if (!saved) return;

  let data;
  try { data = JSON.parse(saved); }
  catch (e) { console.error("Invalid saved data"); return; }

  const tbody = document.querySelector("#timetable tbody");
  tbody.innerHTML = "";

  data.forEach(rowData => {
    const row = tbody.insertRow();
    row.insertCell().textContent = rowData.time;
    
    (rowData.days || []).forEach(d => {
      row.insertCell().textContent = d || "";
    });

    for (let i = (rowData.days || []).length; i < 6; i++) row.insertCell();
    row.insertCell().innerHTML = createRowActionsHtml();
  });
}
