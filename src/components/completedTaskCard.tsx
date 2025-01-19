import { Box, Tooltip, Typography } from "@mui/material";
import { Check, Delete, Restore } from "@mui/icons-material";

export type CompletedTaskCardProps = {
  key: string;
  title: string;
  onCardClick: () => void;
  onDeleteClick: (e: React.MouseEvent<SVGElement>) => void;
  onRestoreClick: (e: React.MouseEvent<SVGElement>) => void;
};

export const CompletedTaskCard = ({
  key,
  title,
  onCardClick,
  onDeleteClick,
  onRestoreClick,
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
        width: "100%",
        overflow: "hidden",
        bgcolor: "#90caf9",
        borderRadius: 3,
        mb: 2,
      }}
      onClick={onCardClick}
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
      <Box sx={{ display: "flex", pr: 2, gap: 1 }}>
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
          <Restore sx={{ color: "white" }} onClick={onRestoreClick} />
        </Tooltip>
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
    </Box>
  );
};
