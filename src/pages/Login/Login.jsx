import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
//Styling
import {
  Alert,
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Link,
  CircularProgress,
} from "@mui/material";
import GradientCircular from "../../components/GradientCircular/GradientCircular";
import pill from "../../assets/pill.png";
import landingbg from "../../assets/landingbg.mp4";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function Login() {
  const [videoLoading, setVideoLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLogIn(true);
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        user
      );
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLogIn(false);
  };
  const handleSetDemoAccount = () => {
    setEmail("demo@email.com");
    setPassword("password");
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
        {videoLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
          >
            <GradientCircular size={70} thickness={3} />
          </Box>
        )}
        <video
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoading(false)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50% )",
            zIndex: 0,
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
              variant="h1"
            >
              FIT
              <img src={pill} alt="pill" width="23rem" />
              TECH
            </Typography>
            <Typography
              sx={{ fontSize: "0.8rem", color: "white" }}
              variant="h3"
              gutterBottom
            >
              An all in one smart playlist for your favourite workouts
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "rgba(217, 217, 217, 0.5)",
              backdropFilter: "blur(10px)",
              height: "420px",
              width: "346px",
              borderStyle: "solid",
              borderTop: "3px solid #4B51F4",
              borderRight: "3px solid #FF6262",
              borderBottom: "3px solid #FF6262",
              borderLeft: "3px solid #4B51F4",
              borderRadius: "41px",
              marginTop: { xs: 10, sm: 18 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  position: "relative",
                  display: "inline-block",
                  fontSize: "2rem",
                  paddingBottom: "5px",
                  fontWeight: "600",
                  paddingTop: 3,
                }}
              >
                LOGIN
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -3,
                    left: 0,
                    width: "100%",
                    height: 3,
                    backgroundImage:
                      "linear-gradient(to right, blue 50%, red 50%)",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </Typography>
              <Alert
                severity="success"
                icon={<CheckCircleOutlineIcon style={{ color: "#4B51F4" }} />}
                sx={{
                  mt: 1,
                  width: "15rem",
                  backgroundColor: "rgba(239, 239, 239, 0.8)",
                  color: "#4B51F4",
                  fontWeight: "300",
                  fontSize: "0.85rem",
                  borderRadius: "10px",
                  backdropFilter: "blur(4px)",
                }}
              >
                <Typography color="black">
                  Here to demo the app?{" "}
                  <Link
                    onClick={handleSetDemoAccount}
                    sx={{ cursor: "pointer", color: "#4B51F4" }}
                  >
                    Use this account
                  </Link>
                </Typography>
              </Alert>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "15px",
                  // paddingTop: "1.25rem",
                  paddingBottom: "0.5rem",
                }}
              >
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="filled"
                  InputLabelProps={{
                    sx: {
                      color: "white",
                      fontFamily: `"MyCustomFont", sans-serif`,
                      fontWeight: "300",
                      letterSpacing: -1,
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      borderRadius: "20px",
                      backgroundColor: "#282A33",
                      opacity: 0.5,
                      width: "15rem",
                      height: "3rem",
                      color: "white",
                      fontWeight: "300",
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                  InputLabelProps={{
                    sx: {
                      color: "white",
                      fontFamily: `"MyCustomFont", sans-serif`,
                      fontWeight: "300",
                      letterSpacing: -1,
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      borderRadius: "20px",
                      backgroundColor: "#282A33",
                      opacity: 0.5,
                      width: "15rem",
                      height: "3rem",
                      color: "white",
                      fontWeight: "300",
                    },
                  }}
                />
                {error && (
                  <Typography
                    variant="h3"
                    sx={{ fontSize: "0.75rem", color: "red" }}
                  >
                    {error}
                  </Typography>
                )}
              </Box>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={!isLogIn ? handleSubmit : undefined}
                  sx={{
                    pointerEvents: isLogIn ? "none" : "auto",
                    opacity: isLogIn ? 0.6 : 1,
                    borderStyle: "solid",
                    borderTop: "3px solid #4B51F4",
                    borderRight: "3px solid #FF6262",
                    borderBottom: "3px solid #FF6262",
                    borderLeft: "3px solid #4B51F4",
                    borderRadius: "41px",
                    width: "13rem",
                    height: "3rem",
                    background: "#EFEFEF",
                    ":hover": {
                      bgcolor: "#282A33",
                      opacity: 0.75,
                      color: "white",
                    },
                    color: "black",
                    fontWeight: "bold",
                    fontFamily: `"Bebas Neue", sans-serif`,
                    fontSize: "1.25rem",
                  }}
                >
                  {isLogIn ? (
                    <>
                      Logging In...
                      <CircularProgress
                        size={20}
                        sx={{
                          color: "#4B51F4",
                          position: "absolute",
                          right: 16,
                        }}
                      />
                    </>
                  ) : (
                    "LOGIN"
                  )}
                </Button>
                <Typography variant="h3" sx={{ fontSize: "1rem", pb: 2 }}>
                  Not a member yet?{" "}
                  <Link href="/signup" component="a" sx={{ color: "#353AA8" }}>
                    Signup Here
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;
