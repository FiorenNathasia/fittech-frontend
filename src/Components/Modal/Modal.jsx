import { useState } from "react";
import "./Modal.scss";
import axios from "axios";
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
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Add New Workout
          </Typography>

          <TextField
            fullWidth
            label="Workout URL"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isSaving}
          />

          {error && (
            <Typography color="error" sx={{ fontSize: "0.875rem" }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={closeModal} disabled={isSaving} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSaving}
              variant="contained"
              color="primary"
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
