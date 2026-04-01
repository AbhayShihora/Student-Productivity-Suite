document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'sps_todo';
  const taskInput = document.getElementById('taskText');
  const addBtn = document.getElementById('addTask');
  const clearBtn = document.getElementById('clearTasks');
  const tasksDiv = document.getElementById('tasks');
  const countEl = document.getElementById('taskCount');

  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
  };
  const write = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  function render() {
    const tasks = read();
    tasksDiv.innerHTML = '';
    if (!tasks.length) {
      tasksDiv.innerHTML = '<p class="muted">No tasks yet — add one above.</p>';
      countEl.textContent = '';
      return;
    }

    countEl.textContent = `${tasks.length} task${tasks.length > 1 ? 's' : ''}`;

    tasks.forEach((t, i) => {
      const container = document.createElement('div');
      container.className = 'task';
      container.dataset.index = i;

      container.innerHTML = `
        <div class="task-left">
          <label>
            <input type="checkbox" ${t.done ? 'checked' : ''} />
            <div class="task-text ${t.done ? 'done' : ''}">${t.text}</div>
          </label>
        </div>

        <div class="task-actions">
          <button class="edit">Edit</button>
          <button class="del">Delete</button>
        </div>
      `;

      tasksDiv.appendChild(container);
    });
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (!text) return; 
    const tasks = read();
    tasks.unshift({ text, done: false });
    write(tasks);
    taskInput.value = '';
    render();
  }

  tasksDiv.addEventListener('click', (e) => {
    const taskEl = e.target.closest('.task');
    if (!taskEl) return;
    const idx = Number(taskEl.dataset.index);
    const tasks = read();

    if (e.target.matches('.del')) {
      if (!confirm('Delete this task?')) return;
      tasks.splice(idx, 1);
      write(tasks);
      render();
      return;
    }

    if (e.target.matches('.edit')) 
    {
      const newText = prompt('Edit task', tasks[idx].text);
      if (newText === null) return; 
      tasks[idx].text = newText.trim();
      write(tasks);
      render();
      return;
    }
  });

  tasksDiv.addEventListener('change', (e) => {
    if (!e.target.matches('input[type="checkbox"]')) return;
    const taskEl = e.target.closest('.task');
    const idx = Number(taskEl.dataset.index);
    const tasks = read();
    tasks[idx].done = e.target.checked;
    write(tasks);
    render();
  });

  clearBtn.addEventListener('click', () => {
    if (!confirm('Clear all tasks?')) return;
    localStorage.removeItem(KEY);
    render();
  });

  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });

  render();
});
