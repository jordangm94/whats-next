import { Add, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Typography,
  BottomNavigation,
  Accordion,
  AccordionSummary,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Slide,
  Fab,
} from "@mui/material";
import "../app/globals.css";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskCard } from "@/components/taskCard";
import { CompletedTaskCard } from "@/components/completedTaskCard";
import { TaskDrawer } from "@/components/taskDrawer";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [parsedTaskList, setParsedTaskList] = useState<Task[]>([]);

  interface Task {
    id: string;
    title: string;
    description: string;
    date: string;
    status: boolean;
  }

  const toggleDrawer = (open: boolean) => () => {
    setOpenDrawer(open);
  };

  const toggleDialogue = (open: boolean) => () => {
    setOpenDialogue(open);
  };

  const setDrawerMode = (mode: "add" | "edit", task?: Task) => () => {
    setMode(mode);

    if (mode === "add") {
      setTitle("");
      setDescription("");
      setDate(new Date());
    } else if (mode === "edit") {
      if (!task) {
        console.error("Task is undefined in edit mode");
        return;
      }
      setId(task?.id || "");
      setTitle(task?.title || "");
      setDescription(task?.description || "");
      setDate(new Date(task?.date) || new Date());
    }
  };

  const editExistingTask = (taskList: [Task]) => {
    const taskToEdit = taskList.find((task: Task) => task.id === id);

    if (taskToEdit) {
      taskToEdit.title = title;
      taskToEdit.description = description;

      localStorage.setItem("Tasks", JSON.stringify(taskList));

      setParsedTaskList(taskList);
    }
  };

  const addTaskToExistingTaskList = (taskList: [Task], newTaskObject: Task) => {
    taskList.push(newTaskObject);
    localStorage.setItem("Tasks", JSON.stringify(taskList));
    setParsedTaskList((prev) => [...prev, newTaskObject]);
  };

  const createNewTaskList = (newTaskObject: Task) => {
    localStorage.setItem("Tasks", JSON.stringify([newTaskObject]));
    setParsedTaskList([newTaskObject]);
  };

  const handleDelete = (id: string) => {
    const tasks = localStorage.getItem("Tasks");
    const taskList = tasks ? JSON.parse(tasks) : [];

    if (!id) {
      console.warn("No task ID was provided for deletion");
    }

    if (taskList.length > 0) {
      const taskListAfterTaskDeleted = taskList.filter(
        (task: Task) => task.id !== id
      );
      localStorage.setItem("Tasks", JSON.stringify(taskListAfterTaskDeleted));
      setParsedTaskList(taskListAfterTaskDeleted);
    }
    setId("");
    toggleDialogue(false)();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tasks = localStorage.getItem("Tasks");
    const taskList = tasks ? JSON.parse(tasks) : [];

    if (mode === "edit") {
      if (taskList.length > 0) {
        editExistingTask(taskList);
      } else {
        console.warn("No tasks available to edit");
      }
    }

    if (mode === "add") {
      const newTaskObject = {
        id: uuidv4(),
        title: title,
        description: description,
        date: date.toISOString(),
        status: false,
      };

      if (taskList.length > 0) {
        addTaskToExistingTaskList(taskList, newTaskObject);
      } else {
        createNewTaskList(newTaskObject);
      }
    }

    setId("");
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
          height: 56,
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Typography variant="h5" sx={{ color: "white", mr: 1 }}>
          {"What's"}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
          }}
        >
          NEXT
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
              onCardClick={() => {
                setDrawerMode("edit", task)();
                toggleDrawer(true)();
              }}
              onCheckClick={(e) => {
                e.stopPropagation();
                updateTaskStatus(task.id, true);
              }}
              onDeleteClick={(e) => {
                e.stopPropagation();
                setId(task.id);
                toggleDialogue(true)();
              }}
            />
          ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Accordion
          sx={{
            maxWidth: "360px",
            width: "90%",
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
            <Typography component="span">{`Completed (${
              filterTasksByStatusAndSort(parsedTaskList, true).length
            })`}</Typography>
          </AccordionSummary>
          {parsedTaskList &&
            filterTasksByStatusAndSort(parsedTaskList, true).map((task) => (
              <CompletedTaskCard
                key={task.id}
                title={task.title}
                onCardClick={() => {
                  setDrawerMode("edit", task)();
                  toggleDrawer(true)();
                }}
                onDeleteClick={(e) => {
                  e.stopPropagation();
                  setId(task.id);
                  toggleDialogue(true)();
                }}
                onRestoreClick={(e) => {
                  e.stopPropagation();
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
        <Fab
          color="primary"
          sx={{
            position: "absolute",
            bottom: "20px",
            zIndex: 1,
            bgcolor: "white",
            color: "#1976d2",
            "&:hover": {
              bgcolor: "#e0e0e0",
            },
          }}
          onClick={() => {
            setDrawerMode("add")();
            toggleDrawer(true)();
          }}
        >
          <Add
            onClick={() => {
              setDrawerMode("add")();
              toggleDrawer(true)();
            }}
          />
        </Fab>
      </BottomNavigation>
      <TaskDrawer
        mode={mode}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        date={date ? date : new Date()}
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        handleSubmit={handleSubmit}
      />
      <Dialog
        PaperProps={{
          sx: {
            bgcolor: "#1976d2",
            color: "white",
          },
        }}
        open={openDialogue}
        onClose={toggleDialogue(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "white" }}>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "white" }} onClick={toggleDialogue(false)}>
            Cancel
          </Button>
          <Button
            sx={{ color: "#ff4c4c", fontWeight: "bold" }}
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
