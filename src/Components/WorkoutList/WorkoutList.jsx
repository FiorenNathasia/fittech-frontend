import "./WorkoutList.scss";
import Workout from "../Workout/Workout";

function WorkoutList({ workouts }) {
  return (
    <>
      <div className="workoutlist">
        <div className="workoulist__container">
          {workouts.map((workout) => (
            <ul key={workout.id}>
              <Workout
                id={workout.id}
                title={workout.title}
                videoUrl={workout.video_url}
                image={workout.image_url}
                steps={workout.steps}
              />
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
export default WorkoutList;
