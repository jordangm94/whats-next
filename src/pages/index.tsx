import {
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import "../app/globals.css";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Add } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Home() {
  return (
    <>
      <Box
        id="top-nav-bar"
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
      <BottomNavigation
        showLabels
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          bgcolor: "#1976d2",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BottomNavigationAction
          label="Menu"
          sx={{
            "& .MuiBottomNavigationAction-label": {
              color: "white",
              fontSize: "0.90rem",
            },
          }}
          icon={<MenuIcon sx={{ color: "white" }} />}
        />
        <BottomNavigationAction
          label="Add"
          sx={{
            "& .MuiBottomNavigationAction-label": {
              color: "white",
              fontSize: "0.90rem",
            },
          }}
          icon={<Add sx={{ color: "white" }} />}
        />
        <BottomNavigationAction
          label="Sort"
          sx={{
            "& .MuiBottomNavigationAction-label": {
              color: "white",
              fontSize: "0.90rem",
            },
          }}
          icon={<MoreHorizIcon sx={{ color: "white" }} />}
        />
      </BottomNavigation>
    </>
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
