import "./Workout.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
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
} from "@mui/material";

function Workout({ id, title, image, fetchWorkouts }) {
  const [isDeleting, setIsDeleting] = useState(false);

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
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              disabled={isDeleting}
              fullWidth
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </CardActionArea>
        </Card>
      </ListItem>
    </>
  );
}
export default Workout;
