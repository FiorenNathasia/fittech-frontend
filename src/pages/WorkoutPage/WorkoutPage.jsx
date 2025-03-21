import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

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
      <div className="workoutpage">
        {error && <div style={{ color: "black" }}>{error}</div>}
        <div className="workoutpage__container">{workout?.title}</div>
        <button onClick={back}></button>
        <ReactPlayer url={workout?.video_url} />
        <a href={workout?.video_url}>
          <button>Go to video</button>
        </a>
        <h1>Steps</h1>
        <ul>
          {workout?.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default WorkoutPage;
