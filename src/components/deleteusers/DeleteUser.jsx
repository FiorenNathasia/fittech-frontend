import React, { useState } from "react";
import axios from "axios";

const DeleteUser = ({ id, onSuccess }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setError(false);
    setSuccess(false);
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      await axios.delete(`/users/${id}`, {
        headers: { authorization: "Bearer " + accessToken },
      });
      setSuccess(true);
      onSuccess();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <button className="deleteButton" onClick={handleDelete}>
        Delete Your Account
      </button>
      {error && <span className="error">Failed to delete your account</span>}
      {success && (
        <span className="success">
          Your account has been deleted successfully...
        </span>
      )}
    </div>
  );
};

export default DeleteUser;
