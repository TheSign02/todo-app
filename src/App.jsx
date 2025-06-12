import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "./slices/todoSlice";
import TrashCan from "./components/TrashCan";

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
      <h1 className="text-3xl font-bold m-5">Todo App</h1>
      <form onSubmit={handleSubmit} className="mb-10">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul className="flex flex-col items-center w-75/100">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className={`flex flex-row items-center justify-between w-full mb-2 px-4 py-2 ${todo.completed ? "line-through" : "" }`} >
              <span className="truncate">{todo.text}</span>
              <span className="flex flex-row items-center gap-1">
                <button onClick={() => handleCompletion(todo.id)}>Done</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>{<TrashCan />}</button>
              </span>
            </li>
          );
        })}
      </ul>

    </div>
  );
};

export default App;
