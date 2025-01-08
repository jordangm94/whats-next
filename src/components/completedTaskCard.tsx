import { Box, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

export type CompletedTaskCardProps = {
  key: string;
  title: string;
};

export const CompletedTaskCard = ({ key, title }: CompletedTaskCardProps) => {
  return (
    <Box
      key={key}
      sx={{
        display: "flex",
        alignItems: "center",
        pl: 1,
        height: 60,
        width: "350px",
        overflow: "hidden",
        bgcolor: "#90caf9",
        borderRadius: 3,
        mb: 2,
      }}
    >
      <Check sx={{ color: "white", ml: 1 }} />
      <Typography
        sx={{
          color: "white",
          pl: 1,
          textDecoration: "line-through",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
