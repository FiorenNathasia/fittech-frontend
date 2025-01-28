import "./Workout.scss";
import { Link } from "react-router-dom";

function Workout({ id, title, image }) {
  return (
    <>
      <Link style={{ color: "black" }} to={`/workouts/${id}`}>
        {title}
      </Link>
    </>
  );
}
export default Workout;
