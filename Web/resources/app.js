function constructTodoList(text) {
    let itemEl = document.createElement('li');
    let tickboxEl = document.createElement('div');
    let textEl = document.createElement('div');

    itemEl.classList.add('todo');
    tickboxEl.setAttribute('class', 'todo_tickbox material-icons-pseudo');
    textEl.classList.add('todo_text');

    textEl.appendChild(document.createTextNode(text));

    itemEl.appendChild(tickboxEl);
    itemEl.appendChild(textEl);

    itemEl.addEventListener('click', function markAsDone(ev) {
        let listTarget;
        let markedAsDone = "todo todo--done";

        if (ev.target.tagName === 'DIV') {
            listTarget = ev.target.parentNode;
        } else {
            listTarget = ev.target;
        }

        if (listTarget.getAttribute('class') === markedAsDone) {
            listTarget.setAttribute('class', 'todo');
            console.log("Marked as open", listTarget);
        } else {
            listTarget.setAttribute('class', markedAsDone);
            console.log("Marked as done", listTarget);
        }
    });
    return itemEl;
}

function addTodo(text) {
    let todoList = document.getElementById("todoList");
    todoList.appendChild(constructTodoList(text));
}


function addTodoOnenter(evt) {
    if (evt.keyCode === 13) {
        console.log("Added todo item", evt);
        addTodo(evt.target.value);
        evt.target.select();
    }
}

let inputEl = document.getElementById("inputText");
inputEl.addEventListener("keydown", addTodoOnenter);