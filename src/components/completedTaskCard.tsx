import { Box, Tooltip, Typography } from "@mui/material";
import { Check, Restore } from "@mui/icons-material";

export type CompletedTaskCardProps = {
  key: string;
  title: string;
  onClick: () => void;
};

export const CompletedTaskCard = ({
  key,
  title,
  onClick,
}: CompletedTaskCardProps) => {
  return (
    <Box
      key={key}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        pl: 1,
        height: 60,
        width: "350px",
        overflow: "hidden",
        bgcolor: "#90caf9",
        borderRadius: 3,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", width: "280px" }}>
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
      <Box sx={{ pr: 3 }}>
        <Tooltip
          title="Restore"
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
          <Restore sx={{ color: "white" }} onClick={onClick} />
        </Tooltip>
      </Box>
    </Box>
  );
};
