import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import pill from "../../assets/pill.png";

function Header({ firstName }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "fixed",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 1000,
          padding: "1rem 0",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <IconButton
          onClick={logout}
          sx={{
            position: "absolute",
            right: "1rem",
            color: theme.palette.secondary.main,
            width: "3rem",
          }}
        >
          <LogoutIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>
        <Typography
          variant="h2"
          sx={{
            fontSize: "2rem",
            fontWeight: "700",
            color: theme.palette.primary.main,
            marginTop: "1rem",
          }}
        >
          FIT
          <img src={pill} alt="pill" width="10rem" />
          TECH
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "500",
            color: theme.palette.primary.main,
          }}
          variant="h2"
        >
          Welcome back {firstName}
        </Typography>
      </Box>
    </>
  );
}

export default Header;
