import { Box, Checkbox, Typography } from "@mui/material";
import { RadioButtonUnchecked, RadioButtonChecked } from "@mui/icons-material";

export type TaskCardProps = {
  key: string;
  title: string;
  description: string;
};

export const TaskCard = ({ title, description, key }: TaskCardProps) => {
  return (
    <Box
      key={key}
      sx={{
        display: "flex",
        alignItems: "center",
        pl: 1,
        height: 85,
        width: "350px",
        overflow: "hidden",
        bgcolor: "#1976d2",
        borderRadius: 3,
        mb: 2,
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
          {title}
        </Typography>
        <Typography
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "white",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
