import { createSlice } from "@reduxjs/toolkit";


const initialState = {
        student_file : null,
        course_file : null,
        configure: {
            name: null,
            teacher_id: null,
            status: null,
            level: null,
            Major: null 
        }
    };

const classSlice = createSlice({
    name : "class",
    initialState,
    reducers : {
        setFileStudent : (state, action) => {
            state.student_file = action.payload
        },
        setFileCourse : (state, action) => {
            state.course_file = action.payload
        },
        setConfigClass : (state, action) => {
            state.configure = action.payload
        },
        resetClassState: () => initialState,
    }

    
})

export const { setConfigClass, setFileStudent, resetClassState, setFileCourse} = classSlice.actions;
export default classSlice.reducer;