import { createStore } from "redux";
import { addTodo, toggleTodo } from "./action.js";
import reducer from "./reducer.js";

const initialstate = {
  todo: [],
};

var store = new createStore(reducer, initialstate);
console.log(store.getState());
store.dispatcher(addTodo("Buy-Milk"));
store.dispatcher(addTodo("Steal-Milk"));
store.dispatcher(toggleTodo("Buy Bread"));
console.log(store.getState());
