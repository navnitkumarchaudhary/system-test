
import { SET_FORM_TO_EDIT, CLEAR_FROM_TO_EDIT } from "../../actions";

const FormEditReducer = (state = null, action) => {
    switch (action.type) {
        case SET_FORM_TO_EDIT:
            return (state = action.payload);

        case CLEAR_FROM_TO_EDIT:
            return (state = null);
            
        default:
            return state;
    }
};

export default FormEditReducer;
