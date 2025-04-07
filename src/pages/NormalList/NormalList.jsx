import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutList from "../../components/WorkoutList/WorkoutList";
//Styling
import { Box } from "@mui/material";

function NormalList() {
  const [workoutsList, setWorkoutsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchWorkoutList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8080/api/workouts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setWorkoutsList(data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchPageData = async () => {
    await fetchWorkoutList();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  if (error) {
    return <div>Cannot display dashboard</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box
        sx={{
          position: "relative",
          marginLeft: { xs: 0, sm: 25 },
          padding: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        <WorkoutList workouts={workoutsList} fetchWorkouts={fetchWorkoutList} />
      </Box>
    </>
  );
}

export default NormalList;
