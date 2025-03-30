import { useState } from "react";
import axios from "axios";
//Styling
import { Box, TextField, Typography, Button, Modal } from "@mui/material";

function ModalAdd({ closeModal, fetchWorkouts }) {
  const [url, setUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("accessToken");
    const workout = {
      video_url: url,
    };
    try {
      await axios.post("http://localhost:8080/api/workouts/", workout, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeModal();
      fetchWorkouts();
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsSaving(false);
  };

  return (
    <>
      <Modal open={open} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#38383d" }}
          >
            Add New Workout
          </Typography>

          <TextField
            fullWidth
            label="Workout URL"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isSaving}
            sx={{ backgroundColor: "#a9a9ae" }}
          />

          {error && (
            <Typography color="error" sx={{ fontSize: "0.875rem" }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              onClick={closeModal}
              disabled={isSaving}
              variant="outlined"
              sx={{
                borderStyle: "solid",
                borderTop: "3px solid #4B51F4",
                borderRight: "3px solid #FF6262",
                borderBottom: "3px solid #FF6262",
                borderLeft: "3px solid #4B51F4",
                borderRadius: "25px",
                width: "6rem",
                height: "2.5rem",
                background: "#EFEFEF",
                ":hover": {
                  bgcolor: "#282A33",
                  opacity: 0.75,
                  color: "white",
                },
                color: "black",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSaving}
              variant="outlined"
              sx={{
                borderStyle: "solid",
                borderTop: "3px solid #4B51F4",
                borderRight: "3px solid #FF6262",
                borderBottom: "3px solid #FF6262",
                borderLeft: "3px solid #4B51F4",
                borderRadius: "25px",
                width: "5rem",
                height: "2.5rem",
                background: "#EFEFEF",
                ":hover": {
                  bgcolor: "#282A33",
                  opacity: 0.75,
                  color: "white",
                },
                color: "black",
                fontWeight: "bold",
              }}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ModalAdd;
