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

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSignUp(true);
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        user
      );
      navigate("/login");
      return response;
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
    setIsSignUp(false);
  };

  const welcome = () => {
    navigate("/");
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
            height: { xs: "490px", sm: "530px" },
            width: "346px",
            borderStyle: "solid",
            borderTop: "3px solid #4B51F4",
            borderRight: "3px solid #FF6262",
            borderBottom: "3px solid #FF6262",
            borderLeft: "3px solid #4B51F4",
            borderRadius: "41px",
            marginTop: { xs: "2rem", sm: "0rem" },
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
              SIGNUP
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
                gap: "15px",
                paddingTop: "1.5rem",
                paddingBottom: "1.5rem",
              }}
            >
              <TextField
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="filled"
                InputLabelProps={{
                  sx: {
                    color: "white",
                    fontFamily: `"MyCustomFont", sans-serif`,
                    fontWeight: "300",
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
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                    letterSpacing: -1,
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
                  variant="body1"
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
                gap: "10px",
              }}
            >
              <Button
                variant="outlined"
                onClick={!isSignUp ? handleSubmit : undefined}
                sx={{
                  pointerEvents: isSignUp ? "none" : "auto",
                  opacity: isSignUp ? 0.6 : 1,
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
                  fontWeight: "600",
                  fontFamily: `"Bebas Neue", sans-serif`,
                  fontSize: "1.25rem",
                }}
              >
                {isSignUp ? (
                  <>
                    Signing Up...
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
                  "SIGNUP "
                )}
              </Button>
              <Typography variant="h3" sx={{ fontSize: "1rem" }}>
                Already a member?{" "}
                <Link href="/login" component="a" sx={{ color: "#4B51F4" }}>
                  Login Here
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Signup;
