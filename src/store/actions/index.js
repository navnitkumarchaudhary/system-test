export const API_CALL_STARTED = "API_CALL_STARTED";
export const API_CALL_COMPLETED = "API_CALL_COMPLETED";
export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const MARK_DONE = "MARK_DONE";
export const RE_OPEN = "RE_OPEN";
export const GLOBAL_SEARCH = "GLOBAL_SEARCH";
export const SHOW_ALL = "SHOW_ALL";
export const SHOW_PENDING = "SHOW_PENDING";
export const SHOW_COMPLETED = "SHOW_COMPLETED";
export const SORT_BY_SUMMARY = "SORT_BY_SUMMARY";
export const SORT_BY_PRIORITY = "SORT_BY_PRIORITY ";
export const SORT_BY_CREATED_ON = "SORT_BY_CREATED_ON";
export const SORT_BY_DUE_DATE = "SORT_BY_DUE_DATE";
export const SORT_BY_ACTIONS = "SORT_BY_ACTIONS";
export const SET_FORM_TO_EDIT = "SET_FORM_TO_EDIT";
export const CLEAR_FROM_TO_EDIT = "CLEAR_FROM_TO_EDIT";
export const BULK_DONE = "BULK_DONE";
export const BULK_PENDING = "BULK_PENDING";
export const UPDATE_CHECKBOX = "UPDATE_CHECKBOX";


const asyncImitator = (dispatch, action) => {
    dispatch(apiCallStarted());
    setTimeout(() => {
        dispatch(action);
        dispatch(apiCallCompleted());
    }, 500);
};

export const apiCallStarted = () => ({
    type: API_CALL_STARTED
});

export const apiCallCompleted = () => ({
    type: API_CALL_COMPLETED
});

export const addTodo = data => {
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (!isFetching) {
            asyncImitator(dispatch, { type: ADD_TODO, payload: data });
        }
    };
};

export const editTodo = data => {
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (!isFetching) {
            asyncImitator(dispatch, { type: EDIT_TODO, payload: data });
        }
    };
};


export const deleteTodo = payload => {
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (!isFetching) {
            asyncImitator(dispatch, { type: DELETE_TODO, payload });
        }
    };
};

export const markDone = id => {
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (!isFetching) {
            asyncImitator(dispatch, { type: MARK_DONE, payload: id });
        }
    };
};

export const reOpenTodo = id => {
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (!isFetching) {
            asyncImitator(dispatch, { type: RE_OPEN, payload: id });
        }
    };
};

export const globalTodoSearch = payload => {
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (!isFetching) {
            asyncImitator(dispatch, { type: GLOBAL_SEARCH, payload });
        }
    };
};

export const showAll = () => {
    return {
        type: SHOW_ALL
    };
};

export const showCompleted = () => {
    return {
        type: SHOW_COMPLETED
    };
};

export const showPending = () => {
    return {
        type: SHOW_PENDING
    };
};

export const setFormToEdit = data => {
    return {
        type: SET_FORM_TO_EDIT,
        payload: data
    };
};

export const clearFormToEdit = () => {
    return {
        type: CLEAR_FROM_TO_EDIT
    };
};

export const sortBySummary = () => {
    return {
        type: SORT_BY_SUMMARY
    };
};

export const sortByPriority = () => {
    return {
        type: SORT_BY_PRIORITY
    };
};

export const sortByCreatedOn = () => {
    return {
        type: SORT_BY_CREATED_ON
    };
};

export const sortByDueDate = () => {
    return {
        type: SORT_BY_DUE_DATE
    };
};

export const sortByActions = () => {
    return {
        type: SORT_BY_ACTIONS
    };
};

export const markBulkDone = payload => {
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (!isFetching) {
            asyncImitator(dispatch, { type: BULK_DONE, payload });
        }
    };
};

export const markBulkPending = payload => {
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (!isFetching) {
            asyncImitator(dispatch, { type: BULK_PENDING, payload });
        }
    };
};


export const updateChecboxValue = (id, ischecked) => {
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (!isFetching) {
            asyncImitator(dispatch, { type: UPDATE_CHECKBOX, payload: {id:id, ischecked:ischecked} });
        }
    };
};
