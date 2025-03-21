import "./WorkoutList.scss";
import Workout from "../Workout/Workout";
//Styling
import { List } from "@mui/material";

function WorkoutList({ workouts, fetchWorkouts }) {
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 550,
          marginTop: 15,
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
            fetchWorkouts={fetchWorkouts}
          />
        ))}
      </List>
    </>
  );
}
export default WorkoutList;
