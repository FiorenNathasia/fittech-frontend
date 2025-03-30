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
  useTheme,
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
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Sticky header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "fixed",
            width: "100%",
            top: 0,
            left: 0,
            zIndex: 1000,
            padding: "1rem 0",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <IconButton
            onClick={logout}
            sx={{
              position: "absolute",
              right: "1rem",
              color: theme.palette.secondary.main,
              width: "3rem",
              // padding: "0.5rem 0.75rem 0.5rem  1rem",
              // backgroundColor: theme.palette.background.paper,
            }}
          >
            <LogoutIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
              color: theme.palette.primary.main,
            }}
            variant="h2"
          >
            FIT
            <img src={pill} alt="pill" width="10rem" />
            TECH
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "500",
              color: theme.palette.primary.main,
            }}
            variant="h2"
          >
            Welcome back {user?.firstName}
          </Typography>
        </Box>
        {/* Workout list */}
        <Box>
          <WorkoutList
            workouts={workoutsList}
            fetchWorkouts={fetchWorkoutList}
          />
        </Box>
        {/* Bottom nav */}
        <Box
          sx={{
            bottom: 0,
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            paddingBottom: 2,
            borderTopLeftRadius: "50px",
            borderTopRightRadius: "50px",
            width: "85%",
          }}
        >
          <Paper
            sx={{
              height: "5rem",
              backgroundColor: theme.palette.background.default,
              width: "100%",
              borderRadius: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderStyle: "solid",
              borderTop: "5px solid #4B51F4",
              borderRight: "5px solid #FF6262",
              borderBottom: "5px solid #FF6262",
              borderLeft: "5px solid #4B51F4",
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
                      color:
                        selectedTab === "favourites" ? "#FF6262" : "#a1a1a1",
                    }}
                  />
                }
                onClick={() => handleTabChange("favourites")}
              />
            </BottomNavigation>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default Homepage;
