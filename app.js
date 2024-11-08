const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === "") return;
  const li = document.createElement("li");
  li.textContent = todoText;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
  todoInput.value = "";
}
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo;
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .catch((err) => console.log("Error al registrar el service worker", err))
    .then((reg) => console.log("Service Worker registrado:", reg));
}
