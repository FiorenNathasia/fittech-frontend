import { useState, useEffect } from "react";
import axios from "axios";
import WorkoutList from "../../components/WorkoutList/WorkoutList";
import ModalAdd from "../../components/Modal/Modal";
//Styling
import { Box, useTheme } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import BottomNavigationTab from "../../components/BottomNavigationTab/BottomNavigationTab";
import ModalButton from "../../components/ModalButton/ModalButton";

function Favourites() {
  const [workoutsList, setWorkoutsList] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Sticky header */}
        <Header firstName={user.firstName} />
        {/* Favourites Workout list */}
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
        {/* Modal Button for Desktop only */}
        <ModalButton openModal={() => setIsModalOpen(true)} />

        {/* Sidebar for Desktop only */}
        <Sidebar firstName={user.firstName} />

        {/* Bottom nav for mobile only*/}
        <BottomNavigationTab openModal={() => setIsModalOpen(true)} />
      </Box>

      {isModalOpen && (
        <ModalAdd
          closeModal={() => setIsModalOpen(false)}
          fetchWorkouts={fetchWorkoutList}
        />
      )}
    </>
  );
}

export default Favourites;
