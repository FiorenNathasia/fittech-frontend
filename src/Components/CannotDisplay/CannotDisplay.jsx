import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function CannotDisplay() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 4,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#FF6B6B", mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        We couldn’t display this page. It might be a temporary issue.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </Box>
  );
}

export default CannotDisplay;
