import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Button } from "@mui/material";
import pill from "../../assets/pill.png";

function Welcome() {
  const navigate = useNavigate();

  const signup = () => {
    navigate("/signup");
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#cfe8fc",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "absolute",
            top: 100,
            left: 0,
            width: "100%",
          }}
        >
          <Typography
            sx={{ fontSize: "3.5rem", fontWeight: "700" }}
            variant="h2"
          >
            FIT
            <img src={pill} alt="pill" width="23rem" />
            TECH
          </Typography>
          <Typography sx={{ fontSize: "0.6rem" }} variant="h4" gutterBottom>
            an all in one smart playlist for your favourite workouts
          </Typography>
        </Box>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            position: "fixed",
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "auto",
          }}
        >
          <Button
            onClick={login}
            variant="outlined"
            sx={{
              borderColor: "#4B51F4",
              borderRadius: "50px",
              width: "13rem",
              background: "#EFEFEF",
              ":hover": {
                bgcolor: "#282A33",
                color: "white",
              },
              fontWeight: "bold",
              color: "black",
            }}
          >
            LOGIN
          </Button>
          <Button
            variant="outlined"
            onClick={signup}
            sx={{
              borderColor: "#FF6262",
              borderRadius: "50px",
              width: "13rem",
              background: "#EFEFEF",
              ":hover": {
                bgcolor: "#282A33",
                color: "white",
              },
              color: "black",
              fontWeight: "bold",
            }}
          >
            SIGNUP
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default Welcome;
