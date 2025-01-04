import { Add } from "@mui/icons-material";
import {
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  Stack,
  Button,
  Tooltip,
} from "@mui/material";
import "../app/globals.css";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { TkTextField } from "@/components/tkTextField";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const dateObject = new Date();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tasks = localStorage.getItem("Tasks");

    const newTaskObject = {
      id: uuidv4(),
      taskName: task,
      description: description,
      date: dateObject.toISOString(),
    };

    if (tasks) {
      const taskList = JSON.parse(tasks);
      taskList.push(newTaskObject);

      localStorage.setItem("Tasks", JSON.stringify(taskList));
    } else {
      localStorage.setItem("Tasks", JSON.stringify([newTaskObject]));
    }
    setTask("");
    setDescription("");
  };

  const DrawerList = (
    <Box sx={{ width: "100%" }} role="presentation">
      <form onSubmit={handleSubmit}>
        <Stack sx={{ px: 4, py: 2 }} spacing={1}>
          <TkTextField
            label="Task Name"
            variant="standard"
            placeholder="Enter the task name"
            multiline={false}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <TkTextField
            label="Description"
            variant="standard"
            placeholder="Enter the task description"
            multiline={true}
            maxRows={3}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              pt: 1,
              borderBottom: "1px solid white",
            }}
          >
            <Typography>Date</Typography>
            <Tooltip
              title="This date is automatically set to today"
              placement="top"
            >
              <Typography
                sx={{
                  fontStyle: "italic",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >{`${dateObject.toDateString()}`}</Typography>
            </Tooltip>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              sx={{
                width: 170,
                bgcolor: "whitesmoke",
                color: "#1976d2",
                borderRadius: 4,
                mt: 3,
              }}
              variant="contained"
              type="submit"
            >
              SAVE
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );

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
          onClick={() => setOpen(true)}
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
      <Drawer
        id="create-task-drawer"
        PaperProps={{
          sx: {
            color: "white",
            bgcolor: "#1976d2",
            boxSizing: "border-box",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
        open={open}
        onClose={toggleDrawer(false)}
        anchor="bottom"
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
