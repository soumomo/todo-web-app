// import { isTypedArray } from "util/types";

const API_URL = 'http://localhost:3000/todos';

// Fetch existing todos when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchTodos();
});

// Fetch todos from backend
async function fetchTodos() {
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        console.log(data);
    //extract the todos array from data
        const todos = data.todos;
        console.log(todos);
    //clear existing todos from the page
        const container = document.getElementById("todo-list");
        container.innerHTML = '';
    //loop through todos and display each one
        todos.forEach(todo => {
            addTodoToDOM(todo)
        });

    }catch(e){

        console.error("Error: " , e);
    
    }

}



// Add a new todo to the DOM
function addTodoToDOM(todo) {
    //  write here
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change' , ()=>{
        toggleTodo(todo.id, checkbox.checked);
    })

    const span  = document.createElement('span');
    span.textContent = todo.title;

    const button = document.createElement('button');
    button.classList.add('deleteButton');
    button.innerHTML = `
  <svg class="bin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M9 3v1H4v2h1v13a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3H9zm3 0h2v1h-2V3zM7 6h10v13H7V6z"/>
  </svg>
`;
    // button.textContent = "Delete";
    button.addEventListener('click' , ()=>{
        deleteTodo(todo.id);
    })

    //adding elements to li
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);


    //putting everything to page
    const container = document.getElementById("todo-list");
    container.appendChild(li);

}

// Add a new todo
async function createTodo() {
    document.getElementById('add-todo-btn').addEventListener('click', async () => {
        const input = document.getElementById("todo-input");
        const value = input.value.trim();
        if (!value) return;
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title:value,
                    completed:false
                })
            });
            input.value = ''; //CLEAR THE INPUT FIELD
            fetchTodos();
        } catch (e) {
            console.error("Error creating todo: ", e);
        }
    });
}

createTodo();

// Toggle todo completion
async function toggleTodo(id, completed) {
//    write here
    try{
        await fetch(`${API_URL}/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed
            })
        })

        fetchTodos();
    } catch(e){
        console.error("Error toggling todo: ", e);
    }

}

// Delete a todo
async function deleteTodo(id) {
    // write here  
        try{
        await fetch(`${API_URL}/${id}`,{
            method:"DELETE"
        })

        fetchTodos();
    } catch(e){
        console.error("Error deleting todo: ", e);
    }

}