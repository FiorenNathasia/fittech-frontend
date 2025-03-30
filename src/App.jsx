import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Homepage from "./pages/Homepage/Homepage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Import the ProtectedRoute component
import WorkoutPage from "./pages/WorkoutPage/WorkoutPage";
import Welcome from "./pages/Welcome/Welcome";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0B1B2B",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#F44336",
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
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
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
    </>
  );
}

export default App;
