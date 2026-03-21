const form = document.querySelector("#task-form");
const textInput = document.querySelector("#task-input");
const prioritySelect = document.querySelector("#priority-select");
const tableBody = document.querySelector("#task-body");
const progressBar = document.querySelector("#progress-bar");
const countTotal = document.querySelector("#count-total");
const countDone = document.querySelector("#count-done");
const countRemaining = document.querySelector("#count-remaining");

const tasks = [];
let id = 0;

function renderTasks() {
    tableBody.innerHTML = ""

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        const tr = document.createElement("tr");
        tr.setAttribute("data-id", task.id);

        if (task.done === true) {
            tr.classList.add("task-done");
        }

        const nameCell = task.done
            ? `<s>${task.name}</s>`
            : task.priority === "high"
                ? `<mark>${task.name}</mark>`
                : task.name;

        tr.innerHTML = `
            <td>${nameCell}</td>
            <td class="priority-${task.priority}">${task.priority}</td>
            <td>
                <button class="btn-done" data-id="${task.id}">
                    ${task.done ? "Undo" : "Done"}
                </button>
            </td>
            <td>
                <button class="btn-delete" data-id="${task.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    }
    updateStats();
}

function updateStats() {
    const total = tasks.length;

    let done = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === true) {
            done++;
        }
    }

    const remaining = total - done;

    countTotal.textContent = total;
    countDone.textContent = done;
    countRemaining.textContent = remaining;

    const percentage = total === 0 ? 0 : (done / total) * 100;
    progressBar.value = percentage;
}