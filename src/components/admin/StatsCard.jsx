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
import { useBigChart } from "../../hooks/useBigChart";

const StatsCard = ({ title, data }) => {
  const { isOpen, openBigChart, closeBigChart } = useBigChart();
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

  return (
    <>
      <Card onClick={openBigChart} className="cursor-pointer">
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

      <Modal open={isOpen} onClose={closeBigChart}>
        <Box
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded shadow-lg w-[90%] max-w-3xl"
          sx={{
            position: "relative",
            bgcolor: "background.paper",
          }}
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

export default StatsCard;
