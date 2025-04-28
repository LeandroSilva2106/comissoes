import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockMeetings } from '../../data/mockData';
import { 
  Plus, Search, Filter, Calendar, Clock, MapPin, Users, 
  CheckCircle2, XCircle, CalendarDays
} from 'lucide-react';

const Meetings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter meetings based on search term and status
  const filteredMeetings = mockMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.commissionName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'completed' && meeting.status === 'completed') ||
                         (statusFilter === 'scheduled' && meeting.status === 'scheduled') ||
                         (statusFilter === 'in-progress' && meeting.status === 'in-progress');
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reuniões</h1>
          <p className="text-gray-600">Gerencie as reuniões das comissões</p>
        </div>
        
        <button className="btn btn-primary">
          <Plus size={18} />
          Nova Reunião
        </button>
      </div>
      
      <div className="card mb-6">
        <div className="card-body p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar reuniões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select"
              >
                <option value="all">Todos os status</option>
                <option value="scheduled">Agendadas</option>
                <option value="in-progress">Em andamento</option>
                <option value="completed">Realizadas</option>
              </select>
              
              <button className="btn btn-outline">
                <Filter size={18} />
                Mais Filtros
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Lista de Reuniões</h2>
          <div className="text-sm text-gray-500">{filteredMeetings.length} reuniões</div>
        </div>
        <div className="card-body p-0">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Comissão</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Local</th>
                  <th>Status</th>
                  <th>Presença</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredMeetings.map((meeting) => (
                  <tr key={meeting.id} className="hover:bg-gray-50">
                    <td className="font-medium text-gray-800">{meeting.title}</td>
                    <td>{meeting.commissionName}</td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time}</td>
                    <td className="max-w-[150px] truncate">{meeting.location}</td>
                    <td>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          meeting.status === 'completed' ? 'bg-green-100 text-green-800' :
                          meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          meeting.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {meeting.status === 'completed' ? (
                          <>
                            <CheckCircle2 size={12} className="mr-1" />
                            Realizada
                          </>
                        ) : meeting.status === 'scheduled' ? (
                          <>
                            <Calendar size={12} className="mr-1" />
                            Agendada
                          </>
                        ) : meeting.status === 'in-progress' ? (
                          <>
                            <Clock size={12} className="mr-1" />
                            Em Andamento
                          </>
                        ) : (
                          <>
                            <XCircle size={12} className="mr-1" />
                            Cancelada
                          </>
                        )}
                      </span>
                    </td>
                    <td>
                      {meeting.status === 'completed' ? (
                        <div className="text-sm">
                          {meeting.attendees}/{meeting.attendees + meeting.absentees}
                          <span className="text-xs text-gray-500 ml-1">
                            ({Math.round(meeting.attendees / (meeting.attendees + meeting.absentees) * 100)}%)
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">-</span>
                      )}
                    </td>
                    <td>
                      <Link 
                        to={`/meetings/${meeting.id}`} 
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredMeetings.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <CalendarDays size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma reunião encontrada</h3>
              <p>Tente ajustar os filtros ou agende uma nova reunião</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meetings;