import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "./slices/todoSlice";

const App = () => {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleDeleteTodo = (id) => {
    if (id) {
      dispatch(deleteTodo(id));
    }
  };

  const handleCompletion = (id) => {
    if (id) {
      dispatch(completeTodo(id));
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
      <h1 className="">Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id} className={`${todo.completed ? "line-through" : "" }`}>
              {todo.text}{" "}
              <button onClick={() => handleCompletion(todo.id)}>Done</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
