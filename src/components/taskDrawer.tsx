import { Box, Button, Drawer, Stack, Tooltip, Typography } from "@mui/material";
import { TkTextField } from "./tkTextField";

export type TaskDrawerProps = {
  mode: "add" | "edit";
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: Date;
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const TaskDrawer = ({
  mode,
  title,
  setTitle,
  description,
  setDescription,
  date,
  open,
  toggleDrawer,
  handleSubmit,
}: TaskDrawerProps) => {
  const AddTaskDrawerContent = (
    <Box sx={{ width: "100%" }} role="presentation">
      <form onSubmit={handleSubmit}>
        <Stack sx={{ px: 4, py: 2 }} spacing={1}>
          <TkTextField
            label={mode === "add" ? "Task Title" : "Edit Task Title"}
            value={title}
            variant="standard"
            placeholder="Enter the task title"
            multiline={false}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TkTextField
            label={mode === "add" ? "Description" : "Edit Description"}
            value={description}
            variant="standard"
            placeholder="Enter the task description"
            multiline={true}
            maxRows={15}
            maxLength={500}
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
              >{`${date.toDateString()}`}</Typography>
            </Tooltip>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              disabled={!title ? true : false}
              onClick={toggleDrawer(false)}
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
      {AddTaskDrawerContent}
    </Drawer>
  );
};
