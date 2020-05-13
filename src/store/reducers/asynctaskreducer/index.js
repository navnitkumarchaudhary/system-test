import { API_CALL_STARTED, API_CALL_COMPLETED } from "../../actions";

const AsyncTaskReducer = (state = false, action) => {
  switch (action.type) {
    case API_CALL_STARTED:
      return (state = true);

    case API_CALL_COMPLETED:
      return (state = false);

    default:
      return state;
  }
};
export default AsyncTaskReducer;
