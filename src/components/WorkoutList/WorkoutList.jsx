import Workout from "../Workout/Workout";
//Styling
import { Box, Grid2 } from "@mui/material";

function WorkoutList({ workouts, fetchWorkouts }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "22rem",
        margin: "auto",
        marginTop: { xs: "100px", sm: "30px" },
        marginBottom: { xs: "110px", sm: "0px" },
      }}
    >
      <Grid2
        spacing={1}
        container={{ sm: "container" }}
        sx={{ justifyContent: "center" }}
      >
        {workouts.map((workout) => (
          <Grid2 item xs={12} sm={6} lg={3} key={workout.id}>
            <Workout
              id={workout.id}
              title={workout.title}
              videoUrl={workout.video_url}
              image={workout.image_url}
              steps={workout.steps}
              isFavourite={workout.is_favourite}
              fetchWorkouts={fetchWorkouts}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
export default WorkoutList;
