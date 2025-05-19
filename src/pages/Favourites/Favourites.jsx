import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WorkoutList from "../../tempComponents/WorkoutList/WorkoutList";
import ModalAdd from "../../tempComponents/Modal/Modal";
import Linear from "../../tempComponents/Linear/Linear";
//Styling
import { Box, useTheme } from "@mui/material";
import Sidebar from "../../tempComponents/Sidebar/Sidebar";
import Header from "../../tempComponents/Header/Header";
import BottomNavigationTab from "../../tempComponents/BottomNavigationTab/BottomNavigationTab";
import ModalButton from "../../tempComponents/ModalButton/ModalButton";
import CannotDisplay from "../../tempComponents/CannotDisplay/CannotDisplay";

function Favourites() {
  const [workoutsList, setWorkoutsList] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const fetchFavouriteWorkoutList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/workouts`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            filterFavourites: true,
          },
        }
      );
      setWorkoutsList(data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
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

  const navigateToHome = () => {
    navigate("/homepage");
  };

  if (error) {
    return <CannotDisplay />;
  }

  if (isLoading) {
    return <Linear />;
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
          onSaveComplete={navigateToHome}
        />
      )}
    </>
  );
}

export default Favourites;
