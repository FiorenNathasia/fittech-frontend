import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Homepage from "./pages/Homepage/Homepage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import WorkoutPage from "./pages/WorkoutPage/WorkoutPage";
import Welcome from "./pages/Welcome/Welcome";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/bebas-neue";
import "@fontsource/montserrat";
import "@fontsource/bebas-neue";
import Favourites from "./pages/Favourites/Favourites";
import { Box } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0B1B2B",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#FF6262",
        contrastText: "#FFFFFF",
      },
      background: {
        default: "#F5F5F5",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#1C1C1E",
        secondary: "#4A4A4A",
      },
    },
    typography: {
      fontFamily: `"MyCustomFont", "Arial", sans-serif`,
      h1: {
        fontFamily: `"Bebas Neue", sans-serif`,
        fontSize: "3rem",
        fontWeight: 400,
        letterSpacing: "2px",
      },
      h2: {
        fontFamily: `"Bebas Neue", sans-serif`,
        fontSize: "2.5rem",
        fontWeight: 400,
        letterSpacing: "1.5px",
      },
      h3: {
        fontFamily: `"MyCustomFont", sans-serif`,
        fontSize: "2rem",
        fontWeight: 500,
        letterSpacing: -1,
      },
    },
  });

  return (
    <Box height="100vh" sx={{ backgroundColor: "#F5F5F5" }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favourites"
              element={
                <ProtectedRoute>
                  <Favourites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workouts/:id"
              element={
                <ProtectedRoute>
                  <WorkoutPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Box>
  );
}

export default App;
