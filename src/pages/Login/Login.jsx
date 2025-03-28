import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Styling
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Stack,
  IconButton,
  Link,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pill from "../../assets/pill.png";
import desktopbg from "../../assets/dekstopbg.jpg";
import mobile from "../../assets/mobilebg.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        user
      );
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/homepage");
    } catch (error) {
      setError(error.response.data.message);
    }
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
          backgroundImage: `url(${mobile})`,
          backgroundSize: "160%",
          backgroundPosition: "center top -5px",
          backgroundRepeat: "no-repeat",
          flexDirection: "column",
          "@media (min-width:600px)": {
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${desktopbg})`,
          },
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
          <Typography
            sx={{ fontSize: "1.25rem", fontWeight: "700", color: "white" }}
            variant="h2"
          >
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
              sx={{
                position: "relative",
                display: "inline-block",
                fontSize: "1.5rem",
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
                gap: "15px",
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
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
                    color: "white", // Change label color (example: red)
                  },
                }}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    backgroundColor: "#282A33",
                    opacity: 0.5,
                    width: "15rem",
                    height: "3rem",
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
                  },
                }}
                InputProps={{
                  sx: {
                    borderRadius: "20px",
                    backgroundColor: "#282A33",
                    opacity: 0.5,
                    width: "15rem",
                    height: "3rem",
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
                onClick={handleSubmit}
                sx={{
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
                }}
              >
                LOGIN
              </Button>
              <Typography>
                Not a member yet?{" "}
                <Link href="/signup" component="a">
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
