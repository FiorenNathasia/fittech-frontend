import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Linear from "../../components/Linear/Linear";
//Styling
import {
  Box,
  Typography,
  Card,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pill from "../../assets/pill.png";
import Sidebar from "../../components/Sidebar/Sidebar";
import CannotDisplay from "../../components/CannotDisplay/CannotDisplay";

function WorkoutPage() {
  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchWorkoutData = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/workouts/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setWorkout(data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchPageData = async () => {
    await fetchWorkoutData();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const back = () => {
    navigate("/");
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
          display: { xs: "flex", sm: "none" },
          flexDirection: { xs: "row", sm: "none" },
          justifyContent: { xs: "center", sm: "none" },
          alignItems: { xs: "center", sm: "none" },
          width: { xs: "100%", sm: "none" },
          backgroundColor: { xs: "#F5F5F5", sm: "none" },
        }}
      >
        <IconButton
          onClick={back}
          sx={{
            color: "#4B51F4",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          sx={{ fontSize: "1.25rem", fontWeight: "700", color: "black" }}
          variant="h2"
        >
          FIT
          <img src={pill} alt="pill" width="10rem" />
          TECH
        </Typography>
      </Box>
      {error && <Typography style={{ color: "black" }}>{error}</Typography>}
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          marginTop: { xs: "none", sm: "10rem" },
          marginLeft: { xs: "none", sm: "6rem" },
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            height: { sm: "100%" },
            padding: { xs: "none", sm: "1rem" },
            borderRadius: { sm: "10px" },
            boxShadow: { sm: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
          }}
        >
          <Card
            sx={{
              width: { xs: "100%", sm: "40rem" },
              marginTop: { xs: "1rem", sm: "0" },
            }}
          >
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <ReactPlayer
                url={workout?.video_url}
                width="100%"
                height="100%"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                controls
              />
            </Box>
          </Card>
          <Box
            sx={{
              flexDirection: "row",
              maxWidth: { xs: "100%", sm: "30rem" },
              margin: { xs: "1rem", sm: "0rem" },
              padding: { xs: "0rem", sm: "1rem" },
            }}
          >
            <Link
              href={workout?.video_url}
              sx={{
                textDecoration: "none",
                color: "black",
                fontFamily: `"MyCustomFont", sans-serif`,
                ":hover": { color: "red" },
              }}
            >
              {workout?.title}
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            margin: { sm: "1rem" },
            maxWidth: { xs: "100%", sm: "30rem" },
            minWidth: { sm: "30rem" },
            height: { sm: "29.49rem" },
            padding: { sm: "1rem" },
            borderRadius: { sm: "10px" },
            boxShadow: { sm: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              margin: "0rem 1rem",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "1.25rem" }}>
              Steps
            </Typography>{" "}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <List sx={{ width: "90%", height: "22rem", overflow: "auto" }}>
              {workout?.steps.map((step, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Typography variant="body1">{index + 1}.</Typography>
                  </ListItemIcon>
                  <ListItemText primary={step} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default WorkoutPage;
