import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
//Styling
import {
  Box,
  Typography,
  Card,
  IconButton,
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pill from "../../assets/pill.png";

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
        `http://localhost:8080/api/workouts/${id}`,
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
    navigate("/homepage");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box sx={{ backgroundColor: "#F5F5F5", height: "100vw" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#F5F5F5",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            marginTop: { xs: "0", sm: "5rem" },
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              height: { sm: "30rem" },
              padding: { xs: "none", sm: "1rem" },
            }}
          >
            <Card
              sx={{
                maxWidth: { xs: "100%", sm: "30rem" },
                margin: "0.5rem",
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
                margin: { xs: "1rem", sm: "rem" },
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
          <Box>
            <Box
              sx={{
                margin: "0rem 2rem",
                "@media (min-width:600px)": {
                  marginTop: "10rem",
                },
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
      </Box>
    </>
  );
}
export default WorkoutPage;
