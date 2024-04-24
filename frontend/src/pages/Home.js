import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    // local state to store those workouts we fetch
    //const [workouts, setWorkouts] = useState(null)

    // global context state for the workout
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }) // add proxy to package.json

            const json = await response.json()

            if (response.ok) {
                //setWorkouts(json)

                // once we fetch the workouts, dispatch an action to update... payload is the full array of data
                dispatch({type: 'SET_WORKOUTS', payload: json}) // will fire the workoutReducer() - type and payload are the action
            }
        }

        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}
 
export default Home;