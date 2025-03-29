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

function Workout({ id, title, image, isFavourite, fetchWorkouts }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [favourite, setFavourite] = useState(isFavourite);

  const handleFavourite = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(
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
      <ListItem>
        <Card
          sx={{
            maxWidth: 345,
            maxHeigt: 50,
            backgroundColor: "#525257",
            borderRadius: "10px",
            borderTop: "5px solid #4B51F4",
            borderRight: "5px solid #FF6262",
            borderBottom: "5px solid #FF6262",
            borderLeft: "5px solid #4B51F4",
          }}
        >
          <CardActionArea>
            <CardMedia component="img" image={image} alt={title} />
            <CardContent
              sx={{ paddingBottom: 0.5, backgroundColor: "#525257" }}
            >
              <Typography variant="h6" sx={{ fontSize: "0.85rem" }}>
                <Link
                  to={`/workouts/${id}`}
                  style={{ textDecoration: "none", color: "#e5e5e7" }}
                >
                  {title}
                </Link>
              </Typography>
            </CardContent>
            <IconButton
              onClick={handleFavourite}
              variant="outlined"
              color="neutral"
              sx={{ marginLeft: 1 }}
            >
              {favourite ? (
                <FavoriteIcon color="error" sx={{ fontSize: "1.2rem" }} />
              ) : (
                <FavoriteIcon sx={{ fontSize: "1.2rem", color: "#919192" }} />
              )}
            </IconButton>
            <IconButton variant="contained" color="neutral" sx={{ mr: "auto" }}>
              <DeleteIcon
                variant="contained"
                onClick={handleDelete}
                disabled={isDeleting}
                sx={{ fontSize: "1.2rem", color: "#919192" }}
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
