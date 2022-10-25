import { ADDTODO, TOGGLETODO } from "./actiontypes.js";

export const addTodo = (payload) => ({
  type: ADDTODO,
  payload: {
    title: payload,
    status: false,
  },
});
export const toggleTodo = (payload) => ({
  type: TOGGLETODO,
  payload: {
    title: payload,
    status: false,
  },
});
