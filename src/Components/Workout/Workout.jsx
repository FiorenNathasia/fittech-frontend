import "./Workout.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//Styling
import {
  ListItem,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Workout({ id, title, image, fetchWorkouts }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    const fetchFavouriteStatus = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/workouts/${id}`,
          { headers: { Authorization: "Bearer " + token } }
        );
        setFavourite(response.data.is_favourite);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavouriteStatus();
  }, [id]);

  const handleFavourite = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const updatedFavourite = await axios.put(
        `http://localhost:8080/api/workouts/${id}/favourite`,
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
      const deletedVideo = await axios.delete(
        `http://localhost:8080/api/workouts/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      await fetchWorkouts();
    } catch (error) {
      console.log(error);
    }
    setIsDeleting(false);
  };

  return (
    <>
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia component="img" image={image} alt={title} />
            <CardContent>
              <Typography variant="h6" component="div">
                <Link
                  to={`/workouts/${id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {title}
                </Link>
              </Typography>
            </CardContent>
            <IconButton
              onClick={handleFavourite}
              variant="outlined"
              color="neutral"
              sx={{ mr: "auto" }}
            >
              {favourite ? <FavoriteIcon color="error" /> : <FavoriteBorder />}
            </IconButton>
            <IconButton variant="outlined" color="neutral" sx={{ mr: "auto" }}>
              <DeleteIcon
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </DeleteIcon>
            </IconButton>
          </CardActionArea>
        </Card>
      </ListItem>
    </>
  );
}
export default Workout;
