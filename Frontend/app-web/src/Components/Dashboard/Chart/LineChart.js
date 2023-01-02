import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


export default function LineChart({ dataTitle, dataValue, labels, dataTension }) {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: dataTitle,
          data: dataValue,
          tension: dataTension,
          hoverBackgroundColor: 'rgba(36, 255, 195)',
          borderColor: "rgb(255, 36, 36)",
          pointRadius: 8,
          pointBackgroundColor: "rgb(238, 255, 36)",
          backgroundColor: "rgba(255, 36, 36, 0.1)",
        },
      ],
      labels,
    };
  }, []);

  const options = {
    fill: true,
    responsive: true,
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: dataTitle,
      }
    },
   
  };

  return <Line data={data} options={options} />;
}
