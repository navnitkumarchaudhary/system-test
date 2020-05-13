import dummyData from "../../../Mockdata";
import { ADD_TODO, DELETE_TODO, RE_OPEN, MARK_DONE, EDIT_TODO, GLOBAL_SEARCH, BULK_DONE, BULK_PENDING } from "../../actions";

const initialState = dummyData;

const TodoReducer = (state = { todos: initialState, alltodos: initialState }, action) => {
    let ids;
    switch (action.type) {
        case ADD_TODO:
            const todo = { ...action.payload }
            return {
                ...state,
                todos: [...state.todos, todo],
                alltodos: [...state.alltodos, todo]
            }

        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.reduce((a, c) => { return c.id === action.payload.id ? [...a, action.payload] : [...a, c] }, []),
                alltodos: state.alltodos.reduce((a, c) => { return c.id === action.payload.id ? [...a, action.payload] : [...a, c] }, [])
            }

        case DELETE_TODO:
            ids = action.payload.map(x => x)
            return {
                ...state,
                todos: state.todos.filter(row => !ids.includes(row.id)),
                alltodos: state.alltodos.filter(row => !ids.includes(row.id))
            }

        case MARK_DONE: ;
            return {
                ...state,
                todos: state.todos.map(x => { return action.payload === x.id ? { ...x, currentState: true } : { ...x } }),
                alltodos: state.alltodos.map(x => { return action.payload === x.id ? { ...x, currentState: true } : { ...x } }),
            }

        case RE_OPEN:
            return {
                ...state,
                todos: state.todos.map(x => { return action.payload === x.id ? { ...x, currentState: false } : { ...x } }),
                alltodos: state.alltodos.map(x => { return action.payload === x.id ? { ...x, currentState: false } : { ...x } }),
            }

        case GLOBAL_SEARCH:
            return {
                ...state,
                todos: state.alltodos.filter(x => { return x.title.includes(action.payload) || x.description.includes(action.payload) })
            }

        case BULK_DONE:
            ids = action.payload.map(x => x);
            return {
                ...state,
                todos: state.todos.map(x => { return ids.includes(x.id) ? { ...x, currentState: true } : { ...x } }),
                alltodos: state.alltodos.map(x => { return ids.includes(x.id) ? { ...x, currentState: true } : { ...x } })
            }

        case BULK_PENDING:
            ids = action.payload.map(x => x);
            return {
                ...state,
                todos: state.todos.map(x => { return ids.includes(x.id) ? { ...x, currentState: false } : { ...x } }),
                alltodos: state.alltodos.map(x => { return ids.includes(x.id) ? { ...x, currentState: false } : { ...x } }),
            }

        default:
            return state;
    }
};

export default TodoReducer;
