import { SHOW_ALL, SHOW_COMPLETED, SHOW_PENDING } from "../../actions";

let initialState = {
    showAll: true,
    showPending: false,
    showCompleted: false
}
const TabFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALL:
            return { showAll: true, showPending: false, showCompleted: false };

        case SHOW_COMPLETED:
            return { showAll: false, showPending: false, showCompleted: true };

        case SHOW_PENDING:
            return { showAll: false, showPending: true, showCompleted: false };

        default:
            return state;
    }
};

export default TabFilterReducer;
