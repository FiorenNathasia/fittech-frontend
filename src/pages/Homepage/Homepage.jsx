import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WorkoutList from "../../tempComponents/WorkoutList/WorkoutList";
import Sidebar from "../../tempComponents/Sidebar/Sidebar";
import Header from "../../tempComponents/Header/Header";
import BottomNavigationTab from "../../tempComponents/BottomNavigationTab/BottomNavigationTab";
import ModalButton from "../../tempComponents/ModalButton/ModalButton";
import ModalAdd from "../../tempComponents/Modal/Modal";
import Linear from "../../tempComponents/Linear/Linear";
//Styling
import { Box, useTheme } from "@mui/material";
import CannotDisplay from "../../tempComponents/CannotDisplay/CannotDisplay";

function Homepage() {
  const [workoutsList, setWorkoutsList] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const fetchWorkoutList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/workouts`,
        {
          headers: {
            Authorization: "Bearer " + token,
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
    await fetchWorkoutList();
    await fetchUser();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
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
        {/* Workout list */}
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
            fetchWorkouts={fetchWorkoutList}
          />
        </Box>
        {/* Modal Button for Desktop only */}
        <ModalButton openModal={() => setIsModalOpen(true)} />

        {/* Sidebar for Desktop only */}
        <Sidebar logout={logout} firstName={user.firstName} />

        {/* Bottom nav for mobile only*/}
        <BottomNavigationTab openModal={() => setIsModalOpen(true)} />
      </Box>

      {isModalOpen && (
        <ModalAdd
          closeModal={() => setIsModalOpen(false)}
          onSaveComplete={fetchWorkoutList}
        />
      )}
    </>
  );
}

export default Homepage;
