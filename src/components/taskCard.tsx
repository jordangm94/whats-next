import { Box, Checkbox, Tooltip, Typography } from "@mui/material";
import {
  RadioButtonUnchecked,
  RadioButtonChecked,
  Delete,
} from "@mui/icons-material";

export type TaskCardProps = {
  key: string;
  title: string;
  description: string;
  onCardClick: () => void;
  onCheckClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onDeleteClick: (e: React.MouseEvent<SVGElement>) => void;
};

export const TaskCard = ({
  title,
  description,
  key,
  onCardClick,
  onCheckClick,
  onDeleteClick,
}: TaskCardProps) => {
  return (
    <Box
      key={key}
      sx={{
        display: "flex",
        alignItems: "center",
        px: 1,
        height: 85,
        maxWidth: "350px",
        width: "90%",
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
          width: "250px",
          "@media (max-width: 389px)": {
            width: "75%",
          },
          display: "flex",
          flexDirection: "column",
          px: 1,
          overflow: "auto",
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
      <Tooltip
        title="Delete"
        placement="top"
        disableInteractive
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [3, -10],
                },
              },
            ],
          },
        }}
      >
        <Delete sx={{ color: "white" }} onClick={onDeleteClick} />
      </Tooltip>
    </Box>
  );
};
