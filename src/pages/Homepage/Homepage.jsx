import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ModalAdd from "../../components/Modal/Modal";
import WorkoutList from "../../components/WorkoutList/WorkoutList";
//Styling
import {
  Box,
  Container,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import pill from "../../assets/pill.png";
import background from "../../assets/fittechbg.jpg";

function Homepage() {
  const [workoutsList, setWorkoutsList] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("home");
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

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "home") {
      fetchWorkoutList();
    } else if (tab === "favourites") {
      fetchFavouriteWorkoutList();
    }
  };

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
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#272728",
          backgroundSize: "cover",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "absolute",
            top: "2rem",
            left: 0,
            width: "100%",
          }}
        >
          {" "}
          <IconButton
            onClick={logout}
            sx={{
              position: "absolute",
              right: "1rem",
              color: "white",
            }}
          >
            <LogoutIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <Typography
            sx={{ fontSize: "2rem", fontWeight: "700", color: "white" }}
            variant="h2"
          >
            FIT
            <img src={pill} alt="pill" width="10rem" />
            TECH
          </Typography>
          <Typography
            sx={{ fontSize: "1rem", fontWeight: "500", color: "white" }}
            variant="h2"
          >
            Welcome back {user?.firstName}
          </Typography>
        </Box>
        <Box>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              flexDirection: "column",
            }}
          >
            <WorkoutList
              workouts={workoutsList}
              fetchWorkouts={fetchWorkoutList}
              fetchFavouriteWorkoutList={fetchFavouriteWorkoutList}
            />
          </Container>
        </Box>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            height: "5rem",
            backgroundColor: "#525257",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          elevation={3}
        >
          <BottomNavigation
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <BottomNavigationAction
              label="Recents"
              icon={
                <HomeIcon
                  sx={{
                    fontSize: "2.5rem",
                    color: selectedTab === "home" ? "#4B51F4" : "#a1a1a1", // Change color when selected
                  }}
                />
              }
              onClick={() => handleTabChange("home")}
            />

            <IconButton
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <AddCircleOutlineIcon
                sx={{
                  fontSize: "4rem",
                  color: "#a1a1a1",
                  ":hover": {
                    color: "red",
                  },
                }}
              />
            </IconButton>
            {openModal && (
              <ModalAdd
                closeModal={() => setOpenModal(false)}
                fetchWorkouts={fetchWorkoutList}
              />
            )}
            <BottomNavigationAction
              label="Favourites"
              icon={
                <FavoriteIcon
                  sx={{
                    fontSize: "2.25rem",
                    color: selectedTab === "favourites" ? "#FF6262" : "#a1a1a1", // Change color when selected
                  }}
                />
              }
              onClick={() => handleTabChange("favourites")}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
}

export default Homepage;
