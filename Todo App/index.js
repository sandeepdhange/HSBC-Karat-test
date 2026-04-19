const container = document.getElementById('todo-container');

let allTodos = [];
let todos = []
let filter = 'all';

fetch('https://jsonplaceholder.typicode.com/todos')
.then((res) => res.json())
.then((data) => {
    allTodos = data;
    todos = data;
    render();
})

function render() {
    container.innerHTML = "";

    const filteredTodos = allTodos.filter(todo => {
        if(filter === 'completed') return todo.completed;
        if(filter === 'InCompleted') return !todo.completed;
        return true;
    })

    if(filteredTodos.length === 0) {
        container.innerHTML = `
        <p> No result found..</p>
        `
        return;
    }

    filteredTodos.forEach(t => {
        const todo = document.createElement('div');
        todo.className = 'card'
        const id = document.createElement('h2');
        id.textContent = t.id;
        const title = document.createElement('h1');
        title.textContent = t.title;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'
        checkbox.checked = t.completed;

        checkbox.addEventListener('change', () => {
            if(!t.completed) {
                title.style.textDecoration = 'line-through';
            }
        })
        todo.appendChild(id)
        todo.appendChild(title);
        todo.appendChild(checkbox);
        container.appendChild(todo);
    })

}
document.getElementById('completed').onclick = () => {
    filter = 'completed';
    render();
}

document.getElementById('inCompleted').onclick = () => {
    filter = 'InCompleted';
    render();
}
