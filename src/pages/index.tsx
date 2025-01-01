import { Box, Typography } from "@mui/material";
import "../app/globals.css";

// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { LocationOn } from "@mui/icons-material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1976d2",
        height: 50,
        width: "100",
        position: "sticky",
      }}
    >
      <Typography variant="h5" sx={{ color: "white" }}>
        Tasks
      </Typography>
    </Box>
  );
}

{
  /* <AppBar>
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "center",
    }}
    variant="dense"
  >
    <Typography variant="h5" sx={{ color: "white" }}>
      Tasks
    </Typography>
  </Toolbar>
</AppBar> */
}
