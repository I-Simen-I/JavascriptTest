let koTodo = (function () {
    function makeTodoItem(text) {
        return {
            text: text,
            done: ko.observable(false)
        };
    }

    function addTodo(text) {
        model.todos.push(makeTodoItem(text));
    }

    let model = {
        inputText: ko.observable(''),
        todos: ko.observableArray()
    };

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

    return {
        model: model
    }
})();