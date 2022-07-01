const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}
// button을 눌렀을 때 실행한다.
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value; // input에 넣은 것을 불러서 newTodo에 저장한다.
  toDoInput.value = ""; // input창을 비워준다.
  const newTodoObj = {
    // ID를 부여하기 위해 object형식으로 저장한다.
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj); // toDos라는 Array에 저장한다.
  paintToDo(newTodoObj); // paintToDo는 List를 보여주는 것
  saveToDos(); //toDos를 string형식으로 localstorage에 저장한다.
}

toDoForm.addEventListener("submit", handleToDoSubmit); // button 이벤트

const savedToDos = localStorage.getItem(TODOS_KEY); // 저장되어있는 아이템 불러오기

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
