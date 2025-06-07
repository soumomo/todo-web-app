let todos = []; // in memory space
let todoIdCounter = 1;



export async function getAllTodo (req, res, next){
    //  write here
    res.json({todos});
}

export async function createTodo (req, res, next){
    //  write here
    const newTodo = ({
        id : todoIdCounter++,
        ...req.body
    })
    todos.push(newTodo);
    return res.status(201).json(newTodo);

}

export async function updateTodo (req, res, next){
    //  write here
    const todoId = parseInt(req.params.id);  //extracting the route parameter
    const findTodo = todos.find(todo => {
        return todo.id == todoId;
    });
    if(!findTodo){
        return res.status(404).send("Todo not found");
    }
    
    const updatedTodo  = {...findTodo , ...req.body}
    const index = todos.indexOf(findTodo);
    if(index !== -1){ //replace if found
        todos[index] = updatedTodo;
        res.status(200).json(updatedTodo);
    }

}

export async function deleteTodo (req, res, next){
    //  write here
    todos.length = 0;
    res.status(200).json({todos});

}

export async function deleteTodoById (req, res, next){
    //  write here
    const todoId = parseInt(req.params.id);  //extracting the route parameter
    const findTodo = todos.find(todo => {
        return todo.id == todoId;
    });
    if(!findTodo){
        return res.status(404).send("Todo not found")
    }
    const index = todos.indexOf(findTodo);
    if(index!== -1){
        todos.splice(index,1);
        res.status(200).json({todos})
    }

}

// Search functionality
export async function searchTodo(req, res, next) {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: 'Query parameter missing' });
    }

    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(q.toLowerCase())
    );
    res.json(filteredTodos);
}

export async function getTodoById(req, res, next) {
    const todoId = parseInt(req.params.id);
    const findTodo = todos.find(todo => todo.id === todoId);
    
    if (!findTodo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    
    res.json(findTodo);
}

