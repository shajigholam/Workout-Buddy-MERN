import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

//The reducer function specifies how state should be updated based on dispatched actions.
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                // add a new workout to the top of the other existing workouts
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            // just return the current state
            return state
    }
}

// chidren here is the App component because <WorkoutsContextProvider> wraps around the App component in index.js(so all the components access the context)
export const WorkoutsContextProvider = ( {children} ) => {
    // useReducer hook use state and dispatch function to update that state value. we initial value for the state(null). update the state with dispatch and workoutsReducer functions
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })
    return (
        //the value will be available to other components
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}