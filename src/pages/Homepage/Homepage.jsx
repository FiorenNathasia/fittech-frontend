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
          backgroundImage: `url(${background})`,
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
            top: 0,
            left: 0,
            width: "100%",
            height: "10rem",
            borderStyle: "solid",
            borderRight: "3px solid #4B51F4",
            borderBottom: "3px solid #FF6262",
            borderLeft: "3px solid #4B51F4",
            borderBottomLeftRadius: "41px",
            borderBottomRightRadius: "41px",
          }}
        >
          <Typography
            sx={{ fontSize: "3rem", fontWeight: "700", color: "white" }}
            variant="h2"
          >
            FIT
            <img src={pill} alt="pill" width="10rem" />
            TECH
          </Typography>
          <Typography
            sx={{ fontSize: "1.25rem", fontWeight: "500", color: "black" }}
            variant="h2"
          >
            Welcome back {user?.firstName}
          </Typography>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
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
            left: 0,
            right: 0,
            height: "5rem",
          }}
          elevation={3}
        >
          <BottomNavigation>
            <BottomNavigationAction
              label="Recents"
              icon={<HomeIcon sx={{ fontSize: "2.5rem" }} />}
              onClick={fetchWorkoutList}
              sx={{ marginTop: "1rem" }}
            />
            <IconButton
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <AddCircleOutlineIcon
                sx={{
                  fontSize: "4rem",
                  marginTop: "1.5rem",
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
              label="Favorites"
              icon={<FavoriteIcon sx={{ fontSize: "2rem" }} />}
              onClick={fetchFavouriteWorkoutList}
              sx={{ marginTop: "1rem" }}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
}

export default Homepage;
