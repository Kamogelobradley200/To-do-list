const inputBox = document.getElementById("inputBox");
const addButton = document.getElementById("addButton");
const toDoListContainer = document.getElementById("toDoListContainer");
const error = document.getElementById("error") // Error message

let editToDo = null;

const addTodo = ()=>{
    const inputText = inputBox.value.trim();

    if (inputText.length <= 0){
        error.textContent = "Write a task to add to your list!!";
        return;
    }
    
    if (addButton.value === "Edit"){
        let toEdit = editToDo.target.previousElementSibling.innerHTML;
        editToDo.target.previousElementSibling.innerHTML = inputText;
        addButton.value = "Add";
        inputBox.value = "";
        editInLocalStorage(editToDo, toEdit, inputText);
        return;
    }

    // Reset input box contents
    error.textContent = "";
    inputBox.value = "";

    // Creating new elements (List element & Paragraph)
    const li = document.createElement("li"); 
    const pText = document.createElement("p");
    
    pText.innerHTML = inputText;
    li.appendChild(pText);
    
    // Creating Edit button
    const editButton = document.createElement("button");

    editButton.innerText = "Edit";
    li.appendChild(editButton);
    editButton.classList.add("button", "editButton");

    // Creating Remove button
    const removeButton = document.createElement("button");

    removeButton.innerText = "Remove";
    li.appendChild(removeButton);
    removeButton.classList.add("button", "removeButton");
    
    toDoListContainer.appendChild(li);
    saveToLocalStorage(inputText);
}

const updateToDoList = (e)=>{
    if (e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();

        addButton.value = "Edit";
        editToDo = e;
    }

    if (e.target.innerHTML === "Remove"){
        toDoListContainer.removeChild(e.target.parentElement);
        removeFromLocalStorage(e);
    }
}

const saveToLocalStorage = (todo)=>{
    let toDoList;

    if (localStorage.getItem("toDoList") === null){
        toDoList =[];
    }
    else{
        toDoList = JSON.parse(localStorage.getItem("toDoList"));
    }
    toDoList.push(todo);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    
}

const getLocalToDo = ()=>{
    let toDoList;

    if (localStorage.getItem("toDoList") === null){
        toDoList =[];
    }
    else{
        toDoList = JSON.parse(localStorage.getItem("toDoList"));
        toDoList.forEach(todo => {

            // Creating new elements (List element & Paragraph)
            const li = document.createElement("li"); 
            const pText = document.createElement("p");
    
            pText.innerHTML = todo;
            li.appendChild(pText);
    
            // Creating Edit button
            const editButton = document.createElement("button");

            editButton.innerText = "Edit";
            li.appendChild(editButton);
            editButton.classList.add("button", "editButton");

            // Creating Remove button
            const removeButton = document.createElement("button");

            removeButton.innerText = "Remove";
            li.appendChild(removeButton);
            removeButton.classList.add("button", "removeButton");
    
            toDoListContainer.appendChild(li);
        });
    }
    
}

const removeFromLocalStorage = (e)=>{
    toRemove = e.target.previousElementSibling.previousElementSibling.innerHTML.trim();
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    let index = toDoList.indexOf(toRemove);
    toDoList.splice(index, 1);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

const editInLocalStorage = (e, toEdit, inputText)=>{
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    let index = toDoList.indexOf(toEdit);
    toDoList[index] = inputText;
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    
}

document.addEventListener("DOMContentLoaded", getLocalToDo);
addButton.addEventListener("click", addTodo);
toDoListContainer.addEventListener("click", updateToDoList);

