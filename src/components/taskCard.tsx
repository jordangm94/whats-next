import { Box, Checkbox, Typography } from "@mui/material";
import { RadioButtonUnchecked, RadioButtonChecked } from "@mui/icons-material";

export type TaskCardProps = {
  key: string;
  title: string;
  description: string;
  onCardClick?: () => void;
  onCheckClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

export const TaskCard = ({
  title,
  description,
  key,
  onCardClick,
  onCheckClick,
}: TaskCardProps) => {
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
      onClick={onCardClick}
    >
      <Checkbox
        icon={<RadioButtonUnchecked />}
        checkedIcon={<RadioButtonChecked />}
        color="default"
        sx={{ color: "white" }}
        onClick={onCheckClick}
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
        <Typography
          sx={{
            fontWeight: "bold",
            color: "white",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
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
