import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

function LinearColor() {
  return (
    <>
      <Stack
        sx={{ width: "100%", color: "#FF6262", backgroundColor: "#4B51F4" }}
      >
        <LinearProgress color="inherit" />
      </Stack>
    </>
  );
}

export default LinearColor;
