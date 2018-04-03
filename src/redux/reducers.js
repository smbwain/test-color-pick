
import {combineReducers} from 'redux';

export default combineReducers({
    backgroundColor: (state = '#fff', action) => {
        if (action.type === 'SET_BACKGROUND_COLOR') {
            return action.color;
        }
        return state;
    },
    selectedColor: (state = null, action) => {
        if (action.type === 'SET_SELECTED_COLOR') {
            return action.color;
        }
        return state;
    },
});
