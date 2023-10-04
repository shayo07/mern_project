import { createContext, useReducer } from "react";

export const WorkoutContext = createContext() //create a context

//this is the reducer that create the state logic
export const workoutReducer = (state, action) => {
    switch (action.type){
        case 'SET_WORKOUTS':
            return{
                workouts: action.payload
            }
        case 'CREATE_WORKOUTS':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUTS':
            return{
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

//this component will be exported and go to capture app component as props
export const WorkoutContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(workoutReducer,{ workouts: null })
    
    //wrapping a component to children props that takes app component
    return(
        <WorkoutContext.Provider value={{...state, dispatch}}>  
            { children }
        </WorkoutContext.Provider>
    )
}