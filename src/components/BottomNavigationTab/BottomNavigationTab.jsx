import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function BottomNavigationTab({ openModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const currentPath = location.pathname;

  const homepage = () => {
    navigate("/homepage");
  };

  const favourites = () => {
    navigate("/favourites");
  };

  return (
    <>
      <Box
        sx={{
          bottom: 0,
          position: "fixed",
          display: { xs: "flex", sm: "none" },
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          paddingBottom: 2,
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          maxWidth: "22rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Paper
          sx={{
            height: "5rem",
            backgroundColor: theme.palette.background.default,
            width: "100%",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderStyle: "solid",
            borderTop: "5px solid #4B51F4",
            borderRight: "5px solid #FF6262",
            borderBottom: "5px solid #FF6262",
            borderLeft: "5px solid #4B51F4",
          }}
          elevation={3}
        >
          <BottomNavigation
            value={currentPath}
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <BottomNavigationAction
              value="/homepage"
              icon={
                <HomeIcon
                  sx={{
                    fontSize: "2.5rem",
                    color: currentPath === "/homepage" ? "#4B51F4" : "#a1a1a1",
                  }}
                />
              }
              onClick={homepage}
            />

            <IconButton onClick={openModal}>
              <AddCircleOutlineIcon
                sx={{
                  fontSize: "4rem",
                  color: "#a1a1a1",
                  ":hover": {
                    color: theme.palette.secondary.main,
                  },
                }}
              />
            </IconButton>
            <BottomNavigationAction
              value="/favourites"
              icon={
                <FavoriteIcon
                  sx={{
                    fontSize: "2.25rem",
                    color:
                      currentPath === "/favourites" ? "#FF6262" : "#a1a1a1",
                  }}
                />
              }
              onClick={favourites}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
}

export default BottomNavigationTab;
