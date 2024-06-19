import "./Dashboard.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/");
    } else {
      axios
        .get("/users/:id", {
          headers: { authorization: "Bearer " + accessToken },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.error(err);
          navigate("/");
        });
    }
  }, [refresh, navigate]);

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="ddashboard">
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
