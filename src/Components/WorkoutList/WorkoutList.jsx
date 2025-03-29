import Workout from "../Workout/Workout";
//Styling
import { List } from "@mui/material";

function WorkoutList({ workouts, fetchWorkouts }) {
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 400,
          position: "relative",
          overflow: "auto",
          maxHeight: 625,
          marginTop: 2,
        }}
      >
        {workouts.map((workout) => (
          <Workout
            key={workout.id}
            id={workout.id}
            title={workout.title}
            videoUrl={workout.video_url}
            image={workout.image_url}
            steps={workout.steps}
            isFavourite={workout.is_favourite}
            fetchWorkouts={fetchWorkouts}
          />
        ))}
      </List>
    </>
  );
}
export default WorkoutList;
