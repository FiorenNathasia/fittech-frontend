import Workout from "../Workout/Workout";
//Styling
import { Box, Grid } from "@mui/material";

function WorkoutList({ workouts, fetchWorkouts }) {
  return (
    <Box
      sx={{
        marginTop: { xs: "100px", sm: "30px" },
        marginBottom: { xs: "110px", sm: "0px" },
      }}
    >
      <Grid container spacing={1}>
        {workouts.map((workout) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={workout.id}>
            <Workout
              id={workout.id}
              title={workout.title}
              videoUrl={workout.video_url}
              image={workout.image_url}
              steps={workout.steps}
              isFavourite={workout.is_favourite}
              fetchWorkouts={fetchWorkouts}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default WorkoutList;
