import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Styling
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  IconButton,
  Link,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pill from "../../assets/pill.png";
import desktopbg from "../../assets/dekstopbg.jpg";
import mobile from "../../assets/mobilebg.jpg";

function Login() {
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

      navigate("/homepage");
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLogIn(false);
  };

  const welcome = () => {
    navigate("/");
  };

  //Demo User Login
  const demoUser = {
    email: "demo@email.com",
    password: "password",
  };

  const demoLoginData = () => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundImage: {
            xs: `url(${mobile})`,
            sm: `url(${desktopbg})`,
          },
          backgroundSize: { xs: "150%", sm: "cover" },
          backgroundPosition: { xs: "center top  -5px", sm: "center" },
          backgroundRepeat: "no-repeat",
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
            top: 45,
            left: 0,
            width: "100%",
          }}
        >
          <Typography variant="h2" sx={{ color: "white" }}>
            FIT
            <img src={pill} alt="pill" width="10rem" />
            TECH
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
            height: "405px",
            width: "346px",
            borderStyle: "solid",
            borderTop: "3px solid #4B51F4",
            borderRight: "3px solid #FF6262",
            borderBottom: "3px solid #FF6262",
            borderLeft: "3px solid #4B51F4",
            borderRadius: "41px",
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
            <IconButton
              onClick={welcome}
              sx={{
                color: "#4B51F4",
                position: "absolute",
                top: 50,
                left: 35,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h2"
              sx={{
                position: "relative",
                display: "inline-block",
                fontSize: "2rem",
                paddingBottom: "5px",
                fontWeight: "600",
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                paddingTop: "1.25rem",
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
              <Typography variant="h3" sx={{ fontSize: "0.9rem" }}>
                Are you here for a demonstration?{" "}
                <Link
                  onClick={demoLoginData}
                  sx={{
                    color: "#4B51F4",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Autofill here
                </Link>
              </Typography>
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
              <Typography variant="h3" sx={{ fontSize: "1rem" }}>
                Not a member yet?{" "}
                <Link href="/signup" component="a" sx={{ color: "#4B51F4" }}>
                  Signup Here
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;
