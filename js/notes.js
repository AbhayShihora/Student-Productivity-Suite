document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "sps_notes";
  const titleInput = document.getElementById("noteTitle");
  const textInput = document.getElementById("noteText");
  const addBtn = document.getElementById("addNote");
  const clearBtn = document.getElementById("clearNotes");
  const container = document.getElementById("notesContainer");

  
  const readNotes = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } 
    catch (e) {
      return [];
    }
  };

  const writeNotes = (arr) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  };

  const formatDate = (ts) => {
    const d = new Date(ts);
    return d.toLocaleString();
  };

  function render() {
    const notes = readNotes();
    container.innerHTML = "";

    if (!notes.length) {
      container.innerHTML = '<p class="muted">No notes yet. Add one above.</p>';
      return;
    }

    notes.forEach((n, idx) => {
      const el = document.createElement("div");
      el.className = "note";
      el.dataset.index = idx;

      el.innerHTML = `
        <div>
          <h4>${(n.title || "Untitled")}</h4>
          <p>${(n.text)}</p>
        </div>
        <div class="note-meta">
          <small>${formatDate(n.created)}</small>
          <div class="note-actions">
            <button class="edit">Edit</button>
            <button class="del">Delete</button>
          </div>
        </div>
      `;

      container.appendChild(el);
    });
  }

  function addNote() {
    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    if (!text) {
      alert("Please enter note text");
      return;
    }

    const notes = readNotes();
    notes.unshift({ title, text, created: Date.now() });
    writeNotes(notes);

    titleInput.value = "";
    textInput.value = "";
    render();
  }

  function clearAll() {
    if (!confirm("Clear all notes?")) return;
    localStorage.removeItem(STORAGE_KEY);
    render();
  }

  container.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const noteEl = e.target.closest(".note");
    if (!noteEl) return;
    const idx = Number(noteEl.dataset.index);
    const notes = readNotes();

    if (btn.classList.contains("del")) 
    {  
      if (!confirm("Delete this note?")) return;
      notes.splice(idx, 1);
      writeNotes(notes);
      render();
    } 
    else if (btn.classList.contains("edit")) 
    {
      const n = notes[idx];

      const newTitle = prompt("Edit title", n.title || "");
      const newText = prompt("Edit text", n.text ||"");

      n.title = newTitle.trim();
      n.text = newText.trim();
      writeNotes(notes);
      render();
    }
  });

  addBtn.addEventListener("click", addNote);
  clearBtn.addEventListener("click", clearAll);

  render();
});
