import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.scss";
import axios from "axios";
import Modal from "../Modal/Modal";
import WorkoutList from "../WorkoutList/WorkoutList";

function Homepage() {
  const [workoutsList, setWorkoutsList] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const fetchWorkoutList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8080/api/workouts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setWorkoutsList(data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8080/api/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchPageData = async () => {
    await fetchWorkoutList();
    await fetchUser();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (error) {
    return <div>Cannot display dashboard</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="homepage">
        <div className="homepage__container">
          <p>Welcome back {user?.firstName}</p>
          <div className="homepage__list">
            <WorkoutList workouts={workoutsList} />
          </div>
          <button
            className="homepage__modal"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Open
          </button>
          {openModal && (
            <Modal
              closeModal={() => setOpenModal(false)}
              fetchWorkouts={fetchWorkoutList}
            />
          )}
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
}

export default Homepage;
