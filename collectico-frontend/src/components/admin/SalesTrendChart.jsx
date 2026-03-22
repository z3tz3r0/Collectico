import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const SalesTrendChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 2900, 2500, 4100, 3800, 4800, 2000, 5200, 5800, 6200, 7000, 7500],
        fill: true,
        backgroundColor: 'rgba(75, 100, 255, 0.1)',
        borderColor: 'blue',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(75, 100, 255, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#8A8A8A'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
            drawBorder: false,
        },
        ticks: {
          callback: function(value) {
            return '$' + value / 1000 + 'k';
          },
          stepSize: 2000,
          color: '#8A8A8A'
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default SalesTrendChart;
