import { Add, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  Stack,
  Button,
  Tooltip,
  Accordion,
  AccordionSummary,
} from "@mui/material";
import "../app/globals.css";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { TkTextField } from "@/components/tkTextField";
import { v4 as uuidv4 } from "uuid";
import { TaskCard } from "@/components/taskCard";
import { CompletedTaskCard } from "@/components/completedTaskCard";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dateObject = new Date();
  const [parsedTaskList, setParsedTaskList] = useState<Task[]>([]);

  interface Task {
    id: string;
    title: string;
    description: string;
    date: string;
    status: boolean;
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tasks = localStorage.getItem("Tasks");

    const newTaskObject = {
      id: uuidv4(),
      title: title,
      description: description,
      date: dateObject.toISOString(),
      status: false,
    };

    if (tasks) {
      const taskList = JSON.parse(tasks);
      taskList.push(newTaskObject);
      localStorage.setItem("Tasks", JSON.stringify(taskList));
      setParsedTaskList((prev) => [...prev, newTaskObject]);
    } else {
      localStorage.setItem("Tasks", JSON.stringify([newTaskObject]));
      setParsedTaskList([newTaskObject]);
    }
    setTitle("");
    setDescription("");
  };

  const filterTasksByStatusAndSort = (
    taskList: Task[],
    status: boolean = false
  ) => {
    if (!Array.isArray(taskList)) {
      console.warn("Invalid taskList provided, returning empty array.");
      return [];
    }
    return taskList.filter((task) => task.status === status).reverse();
  };

  const markTaskAsComplete = (id: string) => {
    const tasks = localStorage.getItem("Tasks");

    if (tasks) {
      const taskList = JSON.parse(tasks);

      taskList.map((task: Task) => {
        if (task.id === id) {
          task.status = true;
        }
      });

      localStorage.setItem("Tasks", JSON.stringify(taskList));
      setParsedTaskList(taskList);
    }
  };

  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem("Tasks");

    const parsedTasks: Task[] = tasksFromLocalStorage
      ? JSON.parse(tasksFromLocalStorage)
      : [];
    setParsedTaskList(parsedTasks);
  }, []);

  const DrawerList = (
    <Box sx={{ width: "100%" }} role="presentation">
      <form onSubmit={handleSubmit}>
        <Stack sx={{ px: 4, py: 2 }} spacing={1}>
          <TkTextField
            label="Task Name"
            variant="standard"
            placeholder="Enter the task name"
            multiline={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        {parsedTaskList &&
          filterTasksByStatusAndSort(parsedTaskList, false).map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              onClick={() => {
                markTaskAsComplete(task.id);
              }}
            />
          ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Accordion
          sx={{
            width: "360px",
            boxShadow: "none",
            borderTop: "solid lightgrey 1px",
            pb: "56px",
          }}
          defaultExpanded={
            filterTasksByStatusAndSort(parsedTaskList, false).length > 0
              ? false
              : true
          }
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">{`Completed Tasks (${
              filterTasksByStatusAndSort(parsedTaskList, true).length
            })`}</Typography>
          </AccordionSummary>
          {parsedTaskList &&
            filterTasksByStatusAndSort(parsedTaskList, true).map((task) => (
              <CompletedTaskCard key={task.id} title={task.title} />
            ))}
        </Accordion>
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
