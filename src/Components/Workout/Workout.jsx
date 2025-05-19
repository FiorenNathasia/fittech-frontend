import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Styling
import {
  ListItem,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Workout({ id, title, image, isFavourite, fetchWorkouts }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [favourite, setFavourite] = useState(isFavourite);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleFavourite = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/workouts/${id}/favourite`,
        { is_favourite: !favourite },
        { headers: { Authorization: "Bearer " + token } }
      );
      setFavourite(!favourite);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`import.meta.env.VITE_API_URL/api/workouts/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await fetchWorkouts();
    } catch (error) {
      console.log(error);
    }
    setIsDeleting(false);
  };

  const page = () => {
    navigate(`/workouts/${id}`);
  };

  return (
    <>
      <ListItem sx={{ paddingRight: 0 }}>
        <Card
          sx={{
            minWidth: 330,
            maxWidth: 330,
            maxHeigt: 50,
            backgroundColor: theme.palette.background.paper,
            borderRadius: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardActionArea sx={{ padding: "1rem" }} onClick={page}>
            {/* <Link to={`/workouts/${id}`} style={{ textDecoration: "none" }}> */}
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{ borderRadius: "10px" }}
            />
            <CardContent sx={{ paddingBottom: 0.5 }}>
              <Typography
                variant="h3"
                sx={{ fontSize: "1rem", color: theme.palette.primary.main }}
              >
                {title}
              </Typography>
            </CardContent>
            <Box
              onClick={(e) => {
                e.stopPropagation();
              }}
              sx={{ width: "6rem" }}
            >
              <IconButton
                onClick={handleFavourite}
                variant="outlined"
                color="neutral"
                sx={{ marginLeft: 1 }}
              >
                {favourite ? (
                  <FavoriteIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: theme.palette.secondary.main,
                    }}
                  />
                ) : (
                  <FavoriteIcon sx={{ fontSize: "1.2rem", color: "#919192" }} />
                )}
              </IconButton>
              <IconButton
                variant="contained"
                color="neutral"
                sx={{ mr: "auto" }}
              >
                <DeleteIcon
                  variant="contained"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  sx={{ fontSize: "1.5rem", color: "#919192" }}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </DeleteIcon>
              </IconButton>
            </Box>
            {/* </Link> */}
          </CardActionArea>
        </Card>
      </ListItem>
    </>
  );
}
export default Workout;
