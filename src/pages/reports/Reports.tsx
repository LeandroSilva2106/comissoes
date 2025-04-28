import React, { useState } from 'react';
import { mockAttendanceReports, mockCommissionStats } from '../../data/mockData';
import { 
  Download, Filter, BarChart2, PieChart, UsersRound, Calendar, 
  CheckCircle2, XCircle, AlertTriangle
} from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState('30days');
  
  // Get data for attendance rate chart
  const commissionNames = mockCommissionStats.map(commission => commission.name);
  const attendanceRates = mockCommissionStats.map(commission => commission.attendanceRate);
  
  const attendanceBarData = {
    labels: commissionNames,
    datasets: [
      {
        label: 'Taxa de Presença (%)',
        data: attendanceRates,
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const attendanceBarOptions = {
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
        }
      }
    }
  };
  
  // Get data for presence distribution chart
  const totalAttended = mockAttendanceReports.reduce((sum, report) => sum + report.attended, 0);
  const totalExcused = mockAttendanceReports.reduce((sum, report) => sum + report.excused, 0);
  const totalMissed = mockAttendanceReports.reduce((sum, report) => sum + report.missed, 0);
  
  const presenceDistributionData = {
    labels: ['Presentes', 'Ausências Justificadas', 'Ausências Não Justificadas'],
    datasets: [
      {
        data: [totalAttended, totalExcused, totalMissed],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const presenceDistributionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
          <p className="text-gray-600">Visualize e exporte relatórios do sistema</p>
        </div>
        
        <button className="btn btn-primary">
          <Download size={18} className="mr-1" />
          Exportar
        </button>
      </div>
      
      <div className="card mb-6">
        <div className="card-body p-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Relatório
              </label>
              <select
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="form-select"
              >
                <option value="attendance">Taxa de Presença</option>
                <option value="members">Membros por Comissão</option>
                <option value="meetings">Reuniões Realizadas</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
                Período
              </label>
              <select
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="form-select"
              >
                <option value="30days">Últimos 30 dias</option>
                <option value="90days">Últimos 90 dias</option>
                <option value="year">Este ano</option>
                <option value="all">Todo o período</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="btn btn-outline">
                <Filter size={18} className="mr-1" />
                Mais Filtros
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <div className="p-5">
            <div className="flex items-center mb-2">
              <div className="p-2 rounded-md bg-blue-100 text-blue-700 mr-3">
                <BarChart2 size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Taxa de Presença Média</h3>
            </div>
            <p className="text-3xl font-bold text-blue-700">89%</p>
            <p className="text-sm text-gray-500 mt-1">Nos últimos 30 dias</p>
          </div>
        </div>
        
        <div className="card">
          <div className="p-5">
            <div className="flex items-center mb-2">
              <div className="p-2 rounded-md bg-green-100 text-green-700 mr-3">
                <UsersRound size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Total de Participantes</h3>
            </div>
            <p className="text-3xl font-bold text-green-700">6</p>
            <p className="text-sm text-gray-500 mt-1">Ativos em comissões</p>
          </div>
        </div>
        
        <div className="card">
          <div className="p-5">
            <div className="flex items-center mb-2">
              <div className="p-2 rounded-md bg-purple-100 text-purple-700 mr-3">
                <Calendar size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Reuniões Realizadas</h3>
            </div>
            <p className="text-3xl font-bold text-purple-700">3</p>
            <p className="text-sm text-gray-500 mt-1">Nos últimos 30 dias</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-800">Taxa de Presença por Comissão</h3>
            <button className="btn btn-sm btn-outline">
              <Download size={14} className="mr-1" />
              Exportar
            </button>
          </div>
          <div className="card-body">
            <div className="h-[300px]">
              <Bar data={attendanceBarData} options={attendanceBarOptions} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-800">Distribuição de Presenças</h3>
            <button className="btn btn-sm btn-outline">
              <Download size={14} className="mr-1" />
              Exportar
            </button>
          </div>
          <div className="card-body">
            <div className="h-[300px] flex items-center justify-center">
              <div className="w-[250px]">
                <Pie data={presenceDistributionData} options={presenceDistributionOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-800">Relatório de Presenças Individuais</h3>
          <button className="btn btn-sm btn-outline">
            <Download size={14} className="mr-1" />
            Exportar Excel
          </button>
        </div>
        <div className="card-body p-0">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Membro</th>
                  <th>Total de Reuniões</th>
                  <th>Presenças</th>
                  <th>Ausências Justificadas</th>
                  <th>Ausências Não Justificadas</th>
                  <th>Taxa de Presença</th>
                </tr>
              </thead>
              <tbody>
                {mockAttendanceReports.map((report) => (
                  <tr key={report.userId} className="hover:bg-gray-50">
                    <td className="font-medium text-gray-800">{report.name}</td>
                    <td>{report.totalMeetings}</td>
                    <td>
                      <div className="flex items-center">
                        <CheckCircle2 size={16} className="text-green-500 mr-1" />
                        {report.attended}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <AlertTriangle size={16} className="text-amber-500 mr-1" />
                        {report.excused}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <XCircle size={16} className="text-red-500 mr-1" />
                        {report.missed}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <div 
                          className={`h-2 w-2 rounded-full mr-2 ${
                            report.attendanceRate >= 90 ? 'bg-green-500' :
                            report.attendanceRate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        ></div>
                        <span>{report.attendanceRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;