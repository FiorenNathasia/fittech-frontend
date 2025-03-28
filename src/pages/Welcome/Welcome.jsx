import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Button } from "@mui/material";
import pill from "../../assets/pill.png";
import landingbg from "../../assets/landingbg.mp4";

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
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50% )",
            zIndex: -1,
          }}
        >
          <source src={landingbg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              top: 80,
              left: 0,
              width: "100%",
            }}
          >
            <Typography
              sx={{ fontSize: "3.5rem", fontWeight: "700", color: "white" }}
              variant="h2"
            >
              FIT
              <img src={pill} alt="pill" width="23rem" />
              TECH
            </Typography>
            <Typography
              sx={{ fontSize: "0.6rem", color: "white" }}
              variant="h4"
              gutterBottom
            >
              An all in one smart playlist for your favourite workouts
            </Typography>
          </Box>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "fixed",
              bottom: "150px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "auto",
              alignItems: "center",
              gap: "1rem",
              "@media (min-width:600px)": {
                flexDirection: "row",
              },
            }}
          >
            <Button
              onClick={login}
              variant="outlined"
              sx={{
                borderColor: "#4B51F4",
                borderRadius: "50px",
                width: "13rem",
                height: "3.5rem",
                borderWidth: "3px",
                background: "#EFEFEF",
                opacity: 0.85,
                ":hover": {
                  bgcolor: "#282A33",
                  color: "white",
                  opacity: 0.75,
                  borderTop: "3px solid #4B51F4",
                  borderRight: "3px solid #FF6262",
                  borderBottom: "3px solid #FF6262",
                  borderLeft: "3px solid #4B51F4",
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
                borderWidth: "3px",
                borderRadius: "50px",
                width: "13rem",
                height: "3.5rem",
                background: "#EFEFEF",
                opacity: 0.85,
                ":hover": {
                  bgcolor: "#282A33",
                  color: "white",
                  opacity: 0.75,
                  borderTop: "3px solid #4B51F4",
                  borderRight: "3px solid #FF6262",
                  borderBottom: "3px solid #FF6262",
                  borderLeft: "3px solid #4B51F4",
                },
                color: "black",
                fontWeight: "bold",
              }}
            >
              SIGNUP
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Welcome;
