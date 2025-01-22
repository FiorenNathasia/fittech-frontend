import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.scss";
import axios from "axios";

function Homepage() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  const fetchWorkoutList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8080/workouts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(data);
      setWorkouts(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkoutList();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <main className="homepage">
        <div className="homepage__container">
          <div className="homepage__list">
            {workouts.map((workout) => (
              <ul key={workout.id}>
                <div className="homepage__workout" title={workout.title}>
                  {workout.title}
                </div>
              </ul>
            ))}
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      </main>
    </>
  );
}

export default Homepage;
