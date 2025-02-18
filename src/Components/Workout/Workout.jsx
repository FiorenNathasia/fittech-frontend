import "./Workout.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
      fetchWorkouts();
    } catch (error) {
      console.log(error);
    }
    setIsDeleting(false);
  };
  return (
    <>
      <Link style={{ color: "black" }} to={`/workouts/${id}`}>
        {title}
      </Link>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </>
  );
}
export default Workout;
