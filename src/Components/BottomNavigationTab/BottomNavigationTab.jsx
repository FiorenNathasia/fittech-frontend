import { useNavigate } from "react-router-dom";
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
  const theme = useTheme();

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
          width: "90%",
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
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <BottomNavigationAction
              label="Recents"
              icon={
                <HomeIcon
                  sx={{
                    fontSize: "2.5rem",
                    color: "#a1a1a1",
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
              label="Favourites"
              icon={
                <FavoriteIcon
                  sx={{
                    fontSize: "2.25rem",
                    color: "#a1a1a1",
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
