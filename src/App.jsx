import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, changeTodoStatus } from "./slices/todoSlice";
import NavBar from "./components/NavBar";
import Task from "./components/Task";

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

  function handleChangeTodoStatus(id) {
    if (id) {
      dispatch(changeTodoStatus(id));
    }
  }

  // Theme Styling for Buttons
  const buttonClasses =
    currentTheme === "light"
      ? "bg-[#d6c4bc] hover:bg-gray-300 text-black"
      : "bg-[#28223f] hover:bg-gray-700 text-white";

  return (
    <div
      className={`min-h-screen overflow-x-hidden  ${
        currentTheme === "light"
          ? "bg-[#e4d1c6] text-black"
          : "bg-[#221e30] text-white"
      }`}
    >
      <nav className="sticky top-0 z-50">
        <NavBar />
      </nav>
      <main className="flex flex-col items-center">
        <h1 className="text-3xl font-bold m-5">Todo App</h1>
        <form onSubmit={handleSubmit} className="mb-10">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a todo"
            className={`border-1 rounded-l-[8px] rounded-r-[8px] p-2 mr-2 ${
              currentTheme === "light"
                ? "placeholder-[#808080]"
                : "placeholder-[#a7a7a7]"
            } `}
          />
          <button className={`${buttonClasses}`} type="submit">
            Add Todo
          </button>
        </form>
        <ul className="flex flex-col items-center w-3/4">
          {todos.map((todo) => {
            return (
              <Task
                key={todo.id}
                todo={todo}
                onChangeTodo={handleChangeTodoStatus}
                onDelete={handleDeleteTodo}
                buttonClasses={buttonClasses}
                currentTheme={currentTheme}
              />
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default App;
