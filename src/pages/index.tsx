import { Add, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Accordion,
  AccordionSummary,
} from "@mui/material";
import "../app/globals.css";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskCard } from "@/components/taskCard";
import { CompletedTaskCard } from "@/components/completedTaskCard";
import { AddTaskDrawer } from "@/components/addTaskDrawer";

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

  const updateTaskStatus = (id: string, updatedStatus: boolean) => {
    const tasks = localStorage.getItem("Tasks");

    if (tasks) {
      const taskList = JSON.parse(tasks);

      taskList.map((task: Task) => {
        if (task.id === id) {
          task.status = updatedStatus;
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
                updateTaskStatus(task.id, true);
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
              <CompletedTaskCard
                key={task.id}
                title={task.title}
                onClick={() => {
                  updateTaskStatus(task.id, false);
                }}
              />
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
          onClick={toggleDrawer(true)}
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
      <AddTaskDrawer
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        date={dateObject}
        open={open}
        toggleDrawer={toggleDrawer}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
