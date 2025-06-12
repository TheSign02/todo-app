import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
        state.push({id: Date.now(), text: action.payload, completed:false});
    },
    deleteTodo: (state, action) => {
        return state.filter(todo => todo.id !== action.payload);
    },
    completeTodo: (state, action) => {
        return 
    }
  },
});

export const { addTodo, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;