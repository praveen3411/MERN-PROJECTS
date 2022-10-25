import { ADDTODO, TOGGLETODO } from "./actiontypes.js";
export default (state, { type, payload }) => {
  switch (type) {
    case ADDTODO: {
      return {
        ...state,
        todo: [...state.todo, payload],
      };
    }
    case TOGGLETODO: {
      return {
        ...state,
        todo: state.todo.map((item) =>
          item.title === payload ? { ...item, status: !item.status } : item
        ),
      };
    }
    default:
      return state;
  }
};
