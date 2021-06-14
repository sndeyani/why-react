const root = document.getElementById('root');

const TodoForm = (add) => {
    const container = document.createElement('form');
    container.innerHTML = `
        <input type="text"/>
        <button>Add</button> 
    `
    container.addEventListener('submit', (e) => {
        e.preventDefault()
        const value = container.querySelector('input').value;
        add(value)
    })
    return container;
}

const ListItem = (todo, onchange) => {
    const container = document.createElement('div');
    container.innerHTML = `
        <label>
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            ${todo.label}
        </label>
    `
    const input = container.querySelector('input');
    input.addEventListener('change', el => {
        onchange(el.target.checked)
    })
    return container;
}

const List  = (todos, onChange) => {
    const container = document.createElement('div');
    todos.map(item => ListItem(item, (completed) => {
        item.completed = completed;
        onChange();
    })).forEach(el => container.appendChild(el))
    return container;
}

const TodoFooter = (todos, onChange) => {
    const container = document.createElement('div');
    const completed = todos.filter(todo => todo.completed).length;
    container.innerHTML = `
        <span>${completed}/${todos.length} Completed</span>
        <button>Clear Completed</button>
    `
    const btn = container.querySelector('button');
    btn.addEventListener('click', el => {
        onChange(todos.filter(todo => todo.completed === false))
    })
    return container;
}

const App = () => {
    let todos = [
        {label: 'Learn JS', completed: false},
        {label: 'Learn HTML', completed: true},
        {label: 'Learn CSS', completed: false}
    ]
    const container = document.createElement('div');
    const render = () => {
        container.innerHTML ='';
        container.appendChild(TodoForm((newText) => {
            todos.push({
                label: newText, completed: false
            })
            render()
        }))
        container.appendChild(List(todos, () => render()))
        container.appendChild(TodoFooter(todos, (newTodos) => {
            todos = newTodos;
            render();
        }))
    }
    render()
    return container
}

root.appendChild(App())
