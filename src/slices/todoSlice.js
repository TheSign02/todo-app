import { createSlice } from "@reduxjs/toolkit";
import { v7 as uuidv7 } from "uuid";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: uuidv7(), text: action.payload, status: "pending" }); // status can be: "pending", "completed" and "failed"
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    changeTodoStatus: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        switch (todo.status) {
          case "pending":
            todo.status = "completed";
            break;
          case "completed":
            todo.status = "failed";
            break;
          case "failed":
            todo.status = "pending";
            break;
        }
      }
    },
  },
});

export const { addTodo, deleteTodo, changeTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;
