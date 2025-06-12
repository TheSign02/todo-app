import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "./slices/todoSlice";
import TrashCan from "./components/TrashCan";
import NavBar from "./components/NavBar";

const App = () => {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todos);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  function handleDeleteTodo(id) {
    if (id) {
      dispatch(deleteTodo(id));
    }
  }

  function handleCompletion(id) {
    if (id) {
      dispatch(completeTodo(id));
    }
  }

  // Theme Styling for Buttons
  const buttonClasses =
    currentTheme === "light"
      ? "bg-[#d6c4bc] hover:bg-gray-300 text-black"
      : "bg-[#28223f] hover:bg-gray-700 text-white";

  return (
    <div
      className={`min-h-screen  ${
        currentTheme === "light"
          ? "bg-[#e4d1c6] text-black"
          : "bg-[#221e30] text-white"
      }`}
    >
      <nav className="sticky top-0 z-50">
        <NavBar />
      </nav>
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold m-5">Todo App</h1>
        <form onSubmit={handleSubmit} className="mb-10">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a todo"
            className={`border-1 rounded-l-[8px] rounded-r-[8px] p-2 mr-2 ${currentTheme === "light" ? "placeholder-[#808080]" : "placeholder-[#a7a7a7]"} `}
          />
          <button className={`${buttonClasses}`} type="submit">Add Todo</button>
        </form>
        <ul className="flex flex-col items-center w-75/100">
          {todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className={`flex flex-row items-center justify-between w-full px-4 py-2 ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                <span className="truncate">{todo.text}</span>
                <span className="flex flex-row items-center gap-1">
                  <button
                    onClick={() => handleCompletion(todo.id)}
                    className={`hover:text-green-500 ${buttonClasses}`}
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className={`hover:text-red-500 ${buttonClasses}`}
                  >
                    {<TrashCan />}
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default App;
