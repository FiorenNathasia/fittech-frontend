import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WorkoutList from "../../components/WorkoutList/WorkoutList";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import BottomNavigationTab from "../../components/BottomNavigationTab/BottomNavigationTab";
import ModalButton from "../../components/ModalButton/ModalButton";
import ModalAdd from "../../components/Modal/Modal";
//Styling
import { Box, useTheme } from "@mui/material";

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

  // const handleTabChange = (tab) => {
  //   setSelectedTab(tab);
  //   if (tab === "home") {
  //     fetchWorkoutList();
  //   } else if (tab === "favourites") {
  //     fetchFavouriteWorkoutList();
  //   }
  // };

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
