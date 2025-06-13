import TrashCanIcon from "./TrashCanIcon";
import XIcon from "./XIcon";
import TickIcon from "./TickIcon";
import { motion } from "motion/react";

const Task = ({
  todo,
  onChangeTodo,
  onDelete,
  buttonClasses,
  currentTheme,
}) => {
  const statusIcons = {
    completed: <TickIcon />,
    failed: <XIcon />,
    pending: null,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-row items-center justify-between w-full pr-2 pl-4 py-2 max-h-16 hover:cursor-pointer mb-1 rounded-t-[10px] rounded-b-[10px] ${
        currentTheme === "light"
          ? "bg-[#cebeb7] hover:bg-[#ceb7ad] text-black"
          : "bg-[#1d1a2b] hover:bg-[#2b263d] text-white"
      } `}
      onClick={() => onChangeTodo(todo.id)}
    >
      <div className={`flex flex-col min-w-0`}>
        <span className="truncate">{todo.text}</span>
        <span className="text-xs">{todo.priority || "⠀"}</span>
      </div>
      <div className="flex flex-row items-center gap-1">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${
            currentTheme === "light" ? "bg-[#d6c4bc]" : "bg-[#28223f]"
          } `}
        >
          {statusIcons[todo.status]}
        </div>
        <button
          onClick={(e) => onDelete(e, todo.id)}
          className={`flex items-center justify-center hover:text-red-500 w-12 h-12 ${buttonClasses} `}
          aria-label="Delete todo"
        >
          {<TrashCanIcon />}
        </button>
      </div>
    </motion.div>
  );
};

export default Task;
