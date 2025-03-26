import { useState } from "react";
import { Card, CardContent, Typography, Modal, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const StatsCard = ({ title, data }) => {
  const [open, setOpen] = useState(false);

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: title,
        data: data,
        fill: true,
        borderColor: "primary",
        tension: 0.2,
      },
    ],
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
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-[90%] max-w-3xl">
          <Typography variant="h5" className="mb-4">
            {title} - Detailed View
          </Typography>
          <div style={{ height: "400px" }}>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default StatsCard;
