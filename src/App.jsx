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
  const [priority, setPriority] = useState(0);

  // Handle AddTodo Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addTodo({text, priority}));
      setText("");
      setPriority(0);
    }
  };

  // Handle Deleting the Todo
  const handleDeleteTodo = (e, id) => {
    e.stopPropagation();
    if (id) {
      dispatch(deleteTodo(id));
    }
  }

  // Handle Changing the Status of the Todo
  const handleChangeTodoStatus = (id) => {
    if (id) {
      dispatch(changeTodoStatus(id));
    }
  }

  const handleIncrementPriority = () => {
    if(priority < 5){
      setPriority(priority + 1);
    }
  }

  const handleDecrementPriority = () => {
    if(priority > 0){
      setPriority(priority - 1);
    }
  }

  // Theme Styling for Buttons
  const buttonClasses =
    currentTheme === "light"
      ? "bg-[#d6c4bc] hover:bg-gray-300 text-black"
      : "bg-[#28223f] hover:bg-gray-700 text-white";

  return (
    // Light/Dark theme styling for the page
    <div
      className={`min-h-screen overflow-x-hidden theme-transition  ${
        currentTheme === "light"
          ? "bg-[#e4d1c6] text-black"
          : "bg-[#221e30] text-white"
      }`}
    >
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50">
        <NavBar />
      </nav>
      {/* Main Content */}
      <main className="flex flex-col items-center">
        <h1 className="text-3xl font-bold m-5">Todo App</h1>
        {/* Add Todo Form */}
        <form onSubmit={handleSubmit} className="mb-10 flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a todo"
            className={`border-1 rounded-l-[8px] rounded-r-[8px] p-2 ${
              currentTheme === "light"
                ? "placeholder-[#808080]"
                : "placeholder-[#a7a7a7]"
            } `}
          />
          {/* Change Priority of Todo */}
          <div className="flex gap-2 items-center">
            <button type="button" className={`${buttonClasses} w-9 h-9 flex items-center justify-center`} onClick={() => handleDecrementPriority()}>-</button>
            <p>{priority}</p>
            <button type="button" className={`${buttonClasses} w-9 h-9 flex items-center justify-center`} onClick={() => handleIncrementPriority()}>+</button>
          </div>
          <button className={`${buttonClasses}`} type="submit">
            Add Todo
          </button>
        </form>

        {/* Display The Tasks */}
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
