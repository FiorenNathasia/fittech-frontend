import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ModalAdd from "../../components/Modal/Modal";
import WorkoutList from "../../components/WorkoutList/WorkoutList";
//Styling
import {
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  IconButton,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
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
            display: { xs: "flex", sm: "none" },
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
            }}
          >
            <LogoutIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <Typography
            variant="h2"
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
              color: theme.palette.primary.main,
              marginTop: "1rem",
            }}
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
        <Box
          sx={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            display: { xs: "none", sm: "block" },
          }}
        >
          <IconButton
            onClick={() => setOpenModal(true)}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
              },
              width: "4rem",
              height: "4rem",
              boxShadow: 3,
            }}
          >
            <AddCircleOutlineIcon sx={{ fontSize: "3rem" }} />
          </IconButton>
        </Box>

        {/* Sidebar for Desktop only */}
        <Drawer
          sx={{
            display: { xs: "none", sm: "flex" },

            "& .MuiDrawer-paper": {
              width: 200, // Ensures the inner paper expands as well
            },
          }}
          variant="permanent"
        >
          <List>
            <Typography
              variant="h2"
              sx={{
                fontSize: "2rem",
                fontWeight: "700",
                color: theme.palette.primary.main,
                marginTop: "1rem",
                marginLeft: "1.25rem",
              }}
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
                marginLeft: "1.25rem",
              }}
              variant="h2"
            >
              Welcome back {user?.firstName}
            </Typography>
            <ListItem onClick={() => handleTabChange("home")}>
              <ListItemIcon>
                <HomeIcon
                  sx={{
                    fontSize: "2.5rem",
                    color: selectedTab === "home" ? "#4B51F4" : "#a1a1a1",
                  }}
                />
              </ListItemIcon>
              <Typography>Home</Typography>
            </ListItem>
            <ListItem onClick={() => handleTabChange("favourites")}>
              <ListItemIcon>
                <FavoriteIcon
                  sx={{
                    fontSize: "2.25rem",
                    color: selectedTab === "favourites" ? "#FF6262" : "#a1a1a1",
                  }}
                />
              </ListItemIcon>
              <Typography>Favourites</Typography>
            </ListItem>
            <ListItem onClick={logout}>
              <ListItemIcon
                sx={{
                  marginLeft: "0.5rem",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                <LogoutIcon sx={{ fontSize: "1.5rem" }} />
              </ListItemIcon>
              <Typography>Logout</Typography>
            </ListItem>
          </List>
        </Drawer>

        {/* Bottom nav */}
        <Box
          sx={{
            bottom: 0,
            position: "fixed",
            display: { xs: "flex", sm: "none" },
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            paddingBottom: 2,
            borderTopLeftRadius: "50px",
            borderTopRightRadius: "50px",
            width: "90%",
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
                      color: theme.palette.secondary.main,
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
