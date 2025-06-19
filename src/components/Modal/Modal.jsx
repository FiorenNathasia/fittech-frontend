import { useState } from "react";
import axios from "axios";
//Styling
import {
  Box,
  TextField,
  Typography,
  Button,
  Modal,
  useTheme,
  CircularProgress,
} from "@mui/material";

function ModalAdd({ closeModal, onSaveComplete }) {
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const handleSubmit = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("accessToken");
    const workout = {
      video_url: url,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/workouts/`,
        workout,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeModal();
      onSaveComplete();
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsSaving(false);
  };

  const handleSetVideoLink = () => {
    setLink("https://youtu.be/YJ3QuchrUNA?si=mdAwMWJkNpMS95bh");
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
            sx={{
              color: theme.palette.primary.main,
              fontFamily: `"MyCustomFont", sans-serif`,
              fontWeight: "600",
              fontSize: "1.25rem",
              letterSpacing: -1,
            }}
          >
            Add New Workout
          </Typography>

          <TextField
            fullWidth
            label="Workout URL"
            type="url"
            variant="filled"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isSaving}
            sx={{ backgroundColor: theme.palette.background.default }}
            InputLabelProps={{
              sx: {
                fontFamily: `"MyCustomFont", sans-serif`,
                fontWeight: "300",
                letterSpacing: -1,
                color: theme.palette.text.secondary,
              },
            }}
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
              variant="filled"
              sx={{
                borderRadius: "25px",
                width: "6rem",
                height: "2.5rem",
                background: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                fontWeight: "500",
                fontFamily: `"MyCustomFont", sans-serif`,
                ":hover": {
                  bgcolor: "#282A33",
                  opacity: 0.75,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={!isSaving ? handleSubmit : undefined}
              variant="filled"
              sx={{
                borderRadius: "25px",
                width: isSaving ? "8rem" : "5rem",
                height: "2.5rem",
                background: "#4B51F4",
                color: theme.palette.primary.contrastText,
                fontWeight: "500",
                fontFamily: `"MyCustomFont", sans-serif`,
                ":hover": {
                  bgcolor: "#282A33",
                  opacity: 0.75,
                },
              }}
            >
              {isSaving ? (
                <>
                  Saving
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "red",
                      position: "absolute",
                      right: 12,
                    }}
                  />
                </>
              ) : (
                "SAVE"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ModalAdd;
