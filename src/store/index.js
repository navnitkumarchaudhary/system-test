import { applyMiddleware, combineReducers, createStore } from "redux";
import AsyncTaskReducer from "./reducers/asynctaskreducer";
import TabFilterReducer from "./reducers/tabfilterreducer";
import TodoReducer from "./reducers/todoreducer";
import FormEditReducer from "./reducers/formeditreducer";
import SortTodoReducer from "./reducers/sorttodoreducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  isFetching: AsyncTaskReducer,
  filter: TabFilterReducer,
  todos: TodoReducer,
  formEdit: FormEditReducer,
  sort: SortTodoReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

// if (process.env.NODE_ENV === "development") {
//   window.store = store;
// }

export default store;
