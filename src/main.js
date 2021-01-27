const addButton = document.getElementById("add-button");
const textInput = document.getElementById("text-input");
const numberOfTodo = document.getElementById("counter");
const viewSection = document.getElementById("view");
const counter = document.getElementById("counter");
let storedCounter = localStorage.getItem("counter");
const todoList = [];
let inputValue;

// the add button
addButton.addEventListener("click", (e) => {
    inputValue = textInput.value;  
    const inputObject = convertValueToObject(inputValue);
    todoList.push(inputObject);
    viewSection.append(itemObjectToDiv(inputObject));
    const containers = document.querySelectorAll(".todo-container");
    console.log(containers);
});

//removes text from input
addButton.addEventListener('click', e => {
    textInput.value = "";
})

//set counter to stay on refresh
if (storedCounter) {
    counter.innerText = storedCounter;
}
//update counter on every click
addButton.onclick = function() {
    const key = "counter";
    let value = Number(counter.innerText);
    value ++;
    counter.innerText = Number(counter.innerText) + 1;
    localStorage.setItem(key, value);
}

function convertValueToObject(value) {
  const current = new Date();
  const creationTime = current.toLocaleString();
  const priority = document.getElementById("priority-selector").value;
  const myTodoItem = {
    "text": value,
    "date": creationTime,
    "priority": priority,
  };
  return myTodoItem;
}

//converts the todo item object into a div container
function itemObjectToDiv(myTodoItem) {
    const todoContainer = document.createElement("div");
    const todoPriority = document.createElement("div");
    const todoCreatedAt = document.createElement("div");
    const todoText = document.createElement("div");
 
    todoContainer.setAttribute("class", "todo-container");
    todoPriority.setAttribute("class", "todo-priority");
    todoCreatedAt.setAttribute("class", "todo-created-at");
    todoText.setAttribute("class", "todo-text");
    
    todoPriority.innerText = myTodoItem["priority"];
    todoCreatedAt.innerText = myTodoItem["date"];
    todoText.innerText = myTodoItem["text"];
    
    todoContainer.appendChild(todoPriority);
    todoContainer.appendChild(todoCreatedAt);
    todoContainer.appendChild(todoText);

    return todoContainer;
}

// //creating a div and adding class 
// function elementAndClass(divName, className) {
//     divName = document.createElement("div");
//     divName.setAttribute('class', className);
// }

