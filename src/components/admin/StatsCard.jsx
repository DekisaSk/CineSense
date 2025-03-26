import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useTheme } from "@mui/material/styles";

const StatsCard = ({ title, data }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: title,
        data: data,
        fill: true,
        borderColor: "white",
        tension: 0.2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card onClick={handleOpen} className="cursor-pointer">
        <CardContent>
          <Typography variant="h6" className="mb-4">
            {title}
          </Typography>
          <div style={{ height: "150px" }}>
            <Line
              data={chartData}
              options={options}
              style={{ backgroundColor: theme.palette.background.primary }}
            />
          </div>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded shadow-lg w-[90%] max-w-3xl"
          sx={{
            position: "relative",
            bgcolor: "background.paper",
          }}
        >
          {/* Close button on top-right */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" className="mb-4">
            {title} - Detailed View
          </Typography>
          <div style={{ height: "400px" }}>
            <Line
              data={chartData}
              options={options}
              style={{ backgroundColor: theme.palette.background.primary }}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default StatsCard;
