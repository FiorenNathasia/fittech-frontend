import { useState, useEffect } from "react";
import axios from "axios";
import WorkoutList from "../../components/WorkoutList/WorkoutList";
//Styling
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

function Favourites() {
  const [workoutsList, setWorkoutsList] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavouriteWorkoutList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8080/api/workouts", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          filterFavourites: true,
        },
      });
      setWorkoutsList(data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8080/api/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchPageData = async () => {
    await fetchFavouriteWorkoutList();
    await fetchUser();
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
      <Header user={fetchUser} />
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
        <WorkoutList
          workouts={workoutsList}
          fetchWorkouts={fetchFavouriteWorkoutList}
        />
      </Box>
      {/* Sidebar for Desktop only */}
      <Sidebar user={fetchUser} />
    </>
  );
}

export default Favourites;
