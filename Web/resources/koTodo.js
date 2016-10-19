let koTodo = (function () {
    function getTodoItemData(todoItem) {
        return {
            text: todoItem.text,
            done: todoItem.done()
        };
    }

    function makeTodoItemFromData(todoItemData) {
        return makeTodoItem(todoItemData.text, todoItemData.done);
    }

    function makeTodoItem(text, done) {
        return {
            text: text,
            done: ko.observable(!!done)
        };
    }

    function addTodo(text) {
        model.todos.push(makeTodoItem(text));
    }

    let model = {
        inputText: ko.observable(''),
        todos: ko.observableArray()
    };

    model.data = ko.computed({
        read: function () {
            return {
                inputText: model.inputText(),
                todos: model.todos().map(getTodoItemData)
            };
        },
        write: function (val) {
            model.inputText(val.inputText);
            model.todos(val.todos.map(makeTodoItemFromData));
        }
    });

    let storageKey = "todoData";
    model.data.subscribe(function (latestModel) {
        localStorage.setItem(storageKey, JSON.stringify(latestModel));
    });

    function deleteDoneTodos() {
        let notDoneTodos = model.todos().filter(function (todoItem) {
            return !todoItem.done();
        });
        model.todos(notDoneTodos);
    }

    function deleteAllTodos() {
        model.inputText('');
        model.todos([]);
    }

    window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 67 && evt.altKey && evt.shiftKey) {
            deleteAllTodos();
            localStorage.clear();
            return;
        }

        if (evt.keyCode === 67 && evt.altKey) {
            deleteDoneTodos();
        }
    });

    model.evt = {
        inputEnter: function (model, evt) {
            if (evt.keyCode === 13) {
                addTodo(model.inputText());
                evt.target.select();
            }
            return true;
        },
        toggleDone: function (model) {
            model.done(!model.done());
        }
    };

    let potensialStorageData = localStorage.getItem(storageKey);
    if (potensialStorageData) {
        model.data(JSON.parse(potensialStorageData))
    }

    return {
        model: model
    }
})();