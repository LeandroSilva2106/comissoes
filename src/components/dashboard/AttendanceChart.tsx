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
import { mockCommissionStats } from '../../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AttendanceChart: React.FC = () => {
  const commissionNames = mockCommissionStats.map(commission => commission.name);
  const attendanceRates = mockCommissionStats.map(commission => commission.attendanceRate);
  
  const data = {
    labels: commissionNames,
    datasets: [
      {
        label: 'Taxa de Presença (%)',
        data: attendanceRates,
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)',
          'rgba(8, 145, 178, 0.7)',
          'rgba(245, 158, 11, 0.7)',
        ],
        borderColor: [
          'rgba(37, 99, 235, 1)',
          'rgba(8, 145, 178, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
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
        callbacks: {
          label: function(context: any) {
            return `Presença: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: number) {
            return value + '%';
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
  
  return (
    <div className="h-[250px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AttendanceChart;