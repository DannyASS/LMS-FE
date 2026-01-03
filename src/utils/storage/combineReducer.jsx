import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import classReducer from "../../pages/teacher/Class/ClassSlice"
const appReducer = combineReducers({
    global : globalReducer,
    class : classReducer
})

const rootReducer = (state, action) => {
    if (action.type == 'Logout') {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;