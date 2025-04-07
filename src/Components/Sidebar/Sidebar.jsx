import { useNavigate } from "react-router-dom";

import {
  Typography,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";

import pill from "../../assets/pill.png";

function Sidebar({ user }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const homepage = () => {
    navigate("/homepage");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const favourites = () => {
    navigate("/favourites");
  };

  return (
    <>
      <Drawer
        sx={{
          display: { xs: "none", sm: "flex" },

          "& .MuiDrawer-paper": {
            width: 200,
          },
        }}
        variant="permanent"
      >
        <List>
          <Typography
            variant="h2"
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
              color: theme.palette.primary.main,
              marginTop: "1rem",
              marginLeft: "1.25rem",
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
              marginLeft: "1.25rem",
            }}
            variant="h2"
          >
            Welcome back {user}
          </Typography>
          <ListItem onClick={homepage}>
            <ListItemIcon>
              <HomeIcon
                sx={{
                  fontSize: "2.5rem",
                }}
              />
            </ListItemIcon>
            <Typography>Home</Typography>
          </ListItem>
          <ListItem onClick={favourites}>
            <ListItemIcon>
              <FavoriteIcon
                sx={{
                  fontSize: "2.25rem",
                }}
              />
            </ListItemIcon>
            <Typography>Favourites</Typography>
          </ListItem>
          <ListItem onClick={logout}>
            <ListItemIcon
              sx={{
                marginLeft: "0.5rem",
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            >
              <LogoutIcon sx={{ fontSize: "1.5rem" }} />
            </ListItemIcon>
            <Typography>Logout</Typography>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;
