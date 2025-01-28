import { useState } from "react";
import "./Modal.scss";
import axios from "axios";

function Modal({ closeModal, fetchWorkouts }) {
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const workout = {
      video_url: url,
    };
    console.log(workout);
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
    } catch (error) {
      console.log(error);
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
            ></input>
          </div>
          <div className="modal__footer">
            <button className="modal__submits" onClick={handleSubmit}>
              Save
            </button>
            <button className="modal__cancel" onClick={() => closeModal()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
