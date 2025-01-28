import { useState } from "react";
import "./Modal.scss";
import axios from "axios";

function Modal({ closeModal, fetchWorkouts }) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const workout = {
      video_url: url,
    };
    setIsLoading(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/workouts/",
        workout,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeModal();
      fetchWorkouts();
      setIsLoading(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="modal__background">
        <div className="modal__container">
          <button className="modal__exit" onClick={() => closeModal()}></button>
          <div className="modal__title">
            <h1>Add new workout</h1>
          </div>
          <div className="modal__body">
            <input
              className="modal__input"
              type="url"
              value={url}
              placeholder="workout url"
              onChange={(e) => setUrl(e.target.value)}
              disabled={!isLoading}
            ></input>
            {error && <div style={{ color: "black" }}>{error}</div>}
          </div>
          <div className="modal__footer">
            <button
              className="modal__submits"
              onClick={handleSubmit}
              disabled={!isLoading}
            >
              {isLoading ? "Save" : "Saving..."}
            </button>
            <button
              className="modal__cancel"
              onClick={() => closeModal()}
              disabled={!isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
