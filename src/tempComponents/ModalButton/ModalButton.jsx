//Styling
import { Box, IconButton, useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function ModalButton({ openModal }) {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          display: { xs: "none", sm: "block" },
        }}
      >
        <IconButton
          onClick={openModal}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
            width: "4rem",
            height: "4rem",
            boxShadow: 3,
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: "3rem" }} />
        </IconButton>
      </Box>
    </>
  );
}

export default ModalButton;
