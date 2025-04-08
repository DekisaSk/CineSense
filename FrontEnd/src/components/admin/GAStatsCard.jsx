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
import { useTheme } from "@mui/material/styles";
import useGAData from "../../hooks/useGAData";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GAStatsCard = ({ title, metric }) => {
  const { data, loading, error } = useGAData(metric);
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const openBigChart = () => setIsOpen(true);
  const closeBigChart = () => setIsOpen(false);

  const formattedLabels = data
    ? data.labels.map((label) => {
        // label format: "YYYYMMDD"
        const day = label.slice(6, 8);
        const month = label.slice(4, 6);
        return `${day}/${month}`;
      })
    : [];

  const chartData = {
    labels: formattedLabels,
    datasets: [
      {
        label: title,
        data: data ? data.values : [],
        fill: true,
        borderColor: "white",
        tension: 0.2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <>
      <Card onClick={openBigChart} style={{ cursor: "pointer" }}>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            {title}
          </Typography>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">Error: {error}</Typography>}
          {!loading && !error && (
            <div style={{ height: "150px" }}>
              <Line
                data={chartData}
                options={options}
                style={{ backgroundColor: theme.palette.background.primary }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Modal open={isOpen} onClose={closeBigChart}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded shadow-lg w-[90%] max-w-3xl"
          sx={{ position: "relative", bgcolor: "background.paper" }}
        >
          <IconButton
            aria-label="close"
            onClick={closeBigChart}
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

export default GAStatsCard;
