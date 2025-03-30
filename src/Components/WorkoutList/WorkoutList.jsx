import Workout from "../Workout/Workout";
//Styling
import { Box } from "@mui/material";

function WorkoutList({ workouts, fetchWorkouts }) {
  return (
    <Box sx={{ marginTop: "100px", marginBottom: "110px" }}>
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
    </Box>
  );
}
export default WorkoutList;
