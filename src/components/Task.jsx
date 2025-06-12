import TrashCanIcon from "./TrashCanIcon";
import XIcon from "./XIcon";
import TickIcon from "./TickIcon";

const Task = ({ todo, onChangeTodo, onDelete, buttonClasses, currentTheme }) => {
  const statusIcons = {
    completed: <TickIcon />,
    failed: <XIcon />,
    pending: null,
  };

  return (
    <li
      className={`flex flex-row items-center justify-between w-full px-4 py-2 max-h-16 hover:cursor-pointer mb-1 rounded-t-[10px] rounded-b-[10px] ${
        currentTheme === "light"
          ? "bg-[#cebeb7] hover:bg-[#ceb7ad] text-black"
          : "bg-[#1d1a2b] hover:bg-[#2b263d] text-white"
      } `}
      onClick={() => onChangeTodo(todo.id)}
    >
      <span className={`truncate `}>
        {todo.text}
      </span>
      <span className="flex flex-row items-center gap-1">
        <button
          className={`flex items-center justify-center w-12 h-12 ${buttonClasses} `}
        >
          {statusIcons[todo.status]}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className={`flex items-center justify-center hover:text-red-500 w-12 h-12 ${buttonClasses} `}
          aria-label="Delete todo"
        >
          {<TrashCanIcon />}
        </button>
      </span>
    </li>
  );
};

export default Task;
