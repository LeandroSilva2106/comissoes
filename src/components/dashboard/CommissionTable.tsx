import React from 'react';
import { Link } from 'react-router-dom';
import { CommissionStats } from '../../types';
import { ChevronRight, Users, Calendar } from 'lucide-react';

interface CommissionTableProps {
  commissions: CommissionStats[];
}

const CommissionTable: React.FC<CommissionTableProps> = ({ commissions }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Nome da Comissão</th>
            <th>Membros</th>
            <th>Reuniões</th>
            <th>Taxa de Presença</th>
            <th>Última Reunião</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((commission) => (
            <tr key={commission.id} className="transition-colors hover:bg-gray-50">
              <td className="font-medium text-gray-800">{commission.name}</td>
              <td>
                <div className="flex items-center">
                  <Users size={16} className="text-gray-400 mr-1" />
                  {commission.memberCount}
                </div>
              </td>
              <td>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-1" />
                  {commission.meetingCount}
                </div>
              </td>
              <td>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div 
                    className={`h-2.5 rounded-full ${
                      commission.attendanceRate >= 90 ? 'bg-green-600' : 
                      commission.attendanceRate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${commission.attendanceRate}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{commission.attendanceRate}%</p>
              </td>
              <td>{commission.lastMeeting}</td>
              <td>
                <Link 
                  to={`/commissions/${commission.id}`} 
                  className="text-blue-600 hover:text-blue-800 flex items-center justify-end"
                >
                  <span className="sr-only">Ver comissão</span>
                  <ChevronRight size={18} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommissionTable;