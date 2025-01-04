import { Box, Checkbox, Typography } from "@mui/material";
import { RadioButtonUnchecked, RadioButtonChecked } from "@mui/icons-material";

export type TaskCardProps = {
  taskTitle: string;
  taskDescription: string;
};

export const TaskCard = ({ taskTitle, taskDescription }: TaskCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        pl: 1,
        height: 85,
        width: "350px",
        overflow: "hidden",
        bgcolor: "#1976d2",
        borderRadius: 3,
      }}
    >
      <Checkbox
        icon={<RadioButtonUnchecked />}
        checkedIcon={<RadioButtonChecked />}
        color="default"
        sx={{ color: "white" }}
      />
      <Box
        sx={{
          height: "50px",
          width: "260px",
          display: "flex",
          flexDirection: "column",
          pl: 1,
        }}
      >
        <Typography sx={{ fontWeight: "bold", color: "white" }}>
          {taskTitle}
        </Typography>
        <Typography
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "white",
          }}
        >
          {taskDescription}
        </Typography>
      </Box>
    </Box>
  );
};
