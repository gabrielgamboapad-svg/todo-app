
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCounter = document.getElementById("task-counter");
function addTask() {
    
    if (inputBox.value.trim() === '') {
        alert("¡Debes escribir algo primero!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "×";
        li.appendChild(span);
    }

    
    inputBox.value = "";


    saveData();
}


listContainer.addEventListener("click", function(e) {
    
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    // Si se hace clic sobre el elemento <span> (icono de la cruz)
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);


inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") addTask();
});


function updateCounter() {
    const pending = listContainer.querySelectorAll("li:not(.checked)").length;
    taskCounter.textContent = pending + (pending === 1 ? " tarea pendiente" : " tareas pendientes");
}


function clearAll() {
    localStorage.removeItem("data");
    listContainer.innerHTML = "";
    updateCounter();
}


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    updateCounter();
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    updateCounter();
}

showTask();
