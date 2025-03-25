import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.scss";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import WorkoutList from "../../components/WorkoutList/WorkoutList";
//Styling
import {
  Box,
  Container,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import pill from "../../assets/pill.png";

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
          bgcolor: "#cfe8fc",
          height: "100vh",
          flexDirection: "column",
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
            borderTop: "0px solid #4B51F4",
            borderRight: "3px solid #FF6262",
            borderBottom: "3px solid #FF6262",
            borderLeft: "3px solid #4B51F4",
            borderBottomLeftRadius: "41px",
            borderBottomRightRadius: "41px",
          }}
        >
          <Typography
            sx={{ fontSize: "3rem", fontWeight: "700", color: "black" }}
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
        </Box>
        <Box>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#cfe8fc",
              height: "100vh",
              flexDirection: "column",
            }}
          >
            <WorkoutList
              workouts={workoutsList}
              fetchWorkouts={fetchWorkoutList}
            />
          </Container>

          <button
            className="homepage__modal"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Open
          </button>
          {openModal && (
            <Modal
              closeModal={() => setOpenModal(false)}
              fetchWorkouts={fetchWorkoutList}
            />
          )}
          <button onClick={logout}>Logout</button>
        </Box>
      </Box>
    </>
  );
}

export default Homepage;
