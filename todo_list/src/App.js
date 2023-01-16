import React from "react";
import "./App.css";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const App = () => {
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");

    const MySwal = withReactContent(Swal);
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");

    React.useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);
    
    React.useEffect(() => {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }, [todos]);

    function showEmptyTextAlert() {
        MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Text cant be empty!'
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false
        };

        if (newTodo.text.length > 0) {
            setTodos([...todos].concat(newTodo));
        } else {
            showEmptyTextAlert();
        }
        setTodo("");
    }

    function deleteTodo(id) {
        let updateTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updateTodos);
    }

    function editItem(id) {
        let updateTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });

        setTodos(updateTodos);
        setTodoEditing(null);
    }

    function toggleComplete(id) {
        let updateTodos = [...todos].map((item) => {
            if (item.id === id) {
                item.completed = !item.completed;
            }
            console.log(item)
            return item;
        });

        setTodos(updateTodos);
    }

    return (
        <div id="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    onChange={(e) => setTodo(e.target.value)} placeholder="Add a new Task" value={todo} />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todoItem) =>
                <div key={todoItem.id} className="todo">
                    <div className="todo-text">
                        <input type="checkbox" id="completed" checked={todoItem.completed} onChange={() => toggleComplete(todoItem.id)} />

                        {todoItem.id === todoEditing ? (
                            <input
                                type="text"
                                onChange={(e) => setEditingText(e.target.value)}
                            />
                        ) : (
                                <div>{todoItem.text}</div>
                            )}
                    </div>

                    <div className="todo-actions">
                        {
                            todoItem.id === todoEditing ? (
                                <button onClick={(e) => editItem(todoItem.id)}>
                                    Submit Edit
                                </button>
                            ) : (
                                    <button onClick={(e) => setTodoEditing(todoItem.id)}>
                                        Edit Item
                                    </button>
                                )
                        }

                        <button onClick={(e) => deleteTodo(todoItem.id)}>
                            Delete
                        </button>

                    </div>

                </div>
            )}
        </div>
    );
};


export default App;
