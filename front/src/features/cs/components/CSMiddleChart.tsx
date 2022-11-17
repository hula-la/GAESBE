import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      display: false,
      max: 10,
    },
  },
  scales: {
    y: {
      display: false,
    },
  },
};

const labels = ['1', '2', '3', '4'];

export const data = {
  labels,
  datasets: [
    {
      barThickness: 50,
      data: [1, 2, 3, 10],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const CSMiddleChart = () => {
  return <Bar options={options} data={data} />;
};

export default CSMiddleChart;
