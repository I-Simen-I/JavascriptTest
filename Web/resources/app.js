let todo = (function () {
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

        return itemEl;
    }

    function addTodo(text) {
        let todoList = document.getElementById("todoList");
        todoList.appendChild(constructTodoList(text));
    }


    function addTodoOnenter(evt) {
        if (evt.keyCode === 13) {
            console.log("enter key", evt);
            addTodo(evt.target.value);
            evt.target.select();
        }
    }

    function toggleTodoDone(todoEl) {
        todoEl.classList.toggle("todo--done");
    }

    function markTodoAsDone(evt) {
        if (evt.target.classList.contains("todo_tickbox")) {
            toggleTodoDone(evt.target.parentElement);
        }
    }

    function startup() {
        let inputEl = document.getElementById("inputText");
        inputEl.addEventListener("keydown", addTodoOnenter);

        let todoListEl = document.querySelector(".todo_list");
        todoListEl.addEventListener("click", markTodoAsDone);
    }

    return {
        startup: startup()
    };
})();