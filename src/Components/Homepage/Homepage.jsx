import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.scss";
import axios from "axios";
import Modal from "../Modal/Modal";

function Homepage() {
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const fetchWorkoutList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8080/workouts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setWorkouts(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsername = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8080/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data.data.firstName);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkoutList();
    fetchUsername();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <>
      <main className="homepage">
        <div className="homepage__container">
          <p>Welcome back {user}</p>
          <div className="homepage__list">
            {workouts.map((workout) => (
              <ul key={workout.id}>
                <div className="homepage__workout" title={workout.title}>
                  {workout.title}
                </div>
              </ul>
            ))}
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
      </main>
    </>
  );
}

export default Homepage;
