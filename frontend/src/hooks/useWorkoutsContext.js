import { useContext } from "react"
import { WorkoutsContext } from "../context/WorkoutContext"

// custom hook to be used within components to access the state and dispatch function provided by a WorkoutsContextProvider
export const useWorkoutsContext = () => {
    // this hook returns the value of WorkoutsContext(which are the values we passed into the provider components - state and dispatch)
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
    }
    return context
}