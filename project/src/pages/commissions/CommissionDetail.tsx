import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, Calendar, ChevronLeft, Edit, Trash, Plus, UserPlus, 
  Calendar as CalendarIcon, CheckCircle2, XCircle, AlertCircle,
  Clock, MapPin
} from 'lucide-react';
import { mockCommissions, mockCommissionMembers, mockMeetings } from '../../data/mockData';

const getTabs = () => [
  { id: 'overview', label: 'Visão Geral' },
  { id: 'members', label: 'Membros' },
  { id: 'meetings', label: 'Reuniões' }
];

const CommissionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the commission data
  const commission = mockCommissions.find(c => c.id === id);
  
  // Get commission members
  const members = mockCommissionMembers[id || ''] || [];
  
  // Get meetings for this commission
  const commissionMeetings = mockMeetings.filter(m => m.commissionId === id);
  
  if (!commission) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comissão não encontrada</h2>
        <Link to="/commissions" className="btn btn-primary">
          <ChevronLeft size={18} />
          Voltar para Comissões
        </Link>
      </div>
    );
  }
  
  // Calculate attendance stats
  const totalMeetings = commissionMeetings.length;
  const pastMeetings = commissionMeetings.filter(m => 
    m.status === 'completed' || m.status === 'cancelled'
  ).length;
  const upcomingMeetings = commissionMeetings.filter(m => 
    m.status === 'scheduled' || m.status === 'in-progress'
  ).length;
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/commissions" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ChevronLeft size={16} className="mr-1" />
          Voltar para Comissões
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-800">{commission.name}</h1>
          
          <div className="flex items-center gap-2">
            <button className="btn btn-outline">
              <Edit size={16} />
              Editar
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 mt-1">{commission.description}</p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center text-gray-600">
            <Users size={18} className="mr-1" />
            <span>{commission.memberCount} Membros</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={18} className="mr-1" />
            <span>{commission.meetingCount} Reuniões</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CalendarIcon size={18} className="mr-1" />
            <span>Criada em {commission.createdAt}</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px space-x-6 overflow-x-auto">
          {getTabs().map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="card p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Membros</h3>
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="text-3xl font-bold text-blue-600">{commission.memberCount}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex -space-x-2 overflow-hidden">
                      {members.slice(0, 3).map((member) => (
                        <div key={member.userId} className="inline-block h-8 w-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                          <img 
                            src={`https://images.pexels.com/photos/${1000000 + parseInt(member.userId)}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=150`} 
                            alt={member.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150";
                            }}
                          />
                        </div>
                      ))}
                      
                      {commission.memberCount > 3 && (
                        <div className="inline-flex items-center justify-center h-8 w-8 rounded-full border-2 border-white bg-gray-100 text-xs font-medium text-gray-500">
                          +{commission.memberCount - 3}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-1">
                      <Link to="#" onClick={() => setActiveTab('members')} className="text-sm text-blue-600 hover:text-blue-800">
                        Ver todos
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Reuniões Realizadas</h3>
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="text-3xl font-bold text-green-600">{pastMeetings}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">
                      {pastMeetings === 0 ? (
                        <p>Nenhuma reunião realizada ainda</p>
                      ) : (
                        <p>Última em {commissionMeetings.find(m => m.status === 'completed')?.date || '-'}</p>
                      )}
                    </div>
                    
                    <div className="mt-1">
                      <Link to="#" onClick={() => setActiveTab('meetings')} className="text-sm text-blue-600 hover:text-blue-800">
                        Ver histórico
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Próximas Reuniões</h3>
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="text-3xl font-bold text-amber-600">{upcomingMeetings}</span>
                  </div>
                  <div className="flex-1">
                    {upcomingMeetings === 0 ? (
                      <p className="text-sm text-gray-500">Nenhuma reunião agendada</p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Próxima em {commissionMeetings.find(m => m.status === 'scheduled')?.date || '-'}
                      </p>
                    )}
                    
                    <div className="mt-1">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Agendar reunião
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Members */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-800">Membros Recentes</h3>
                  <button className="btn btn-sm btn-outline" onClick={() => setActiveTab('members')}>
                    <UserPlus size={16} />
                    Adicionar
                  </button>
                </div>
                <div className="card-body p-0">
                  <div className="divide-y divide-gray-100">
                    {members.slice(0, 5).map((member) => (
                      <div key={member.userId} className="flex items-center p-4 hover:bg-gray-50">
                        <div className="flex-shrink-0 mr-3">
                          <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                            <img 
                              src={`https://images.pexels.com/photos/${1000000 + parseInt(member.userId)}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=150`} 
                              alt={member.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150";
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">{member.name}</p>
                          <p className="text-sm text-gray-500 truncate">{member.company}</p>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          <span className="text-sm text-gray-500">{member.attendanceRate}% presença</span>
                        </div>
                      </div>
                    ))}
                    
                    {members.length === 0 && (
                      <div className="py-6 text-center text-gray-500">
                        <p>Nenhum membro nesta comissão</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Upcoming Meetings */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-800">Próximas Reuniões</h3>
                  <button className="btn btn-sm btn-outline">
                    <Plus size={16} />
                    Agendar
                  </button>
                </div>
                <div className="card-body p-0">
                  <div className="divide-y divide-gray-100">
                    {commissionMeetings
                      .filter(m => m.status === 'scheduled')
                      .slice(0, 5)
                      .map((meeting) => (
                        <div key={meeting.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-3">
                              <div className="p-2 rounded-md bg-blue-100 text-blue-600">
                                <CalendarIcon size={18} />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-800">{meeting.title}</h4>
                              
                              <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
                                <div className="flex items-center text-xs text-gray-500">
                                  <Clock size={12} className="mr-1" />
                                  {meeting.date} às {meeting.time}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <MapPin size={12} className="mr-1" />
                                  <span className="truncate">{meeting.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <Link to={`/meetings/${meeting.id}`} className="text-blue-600 hover:text-blue-800">
                                Ver
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    
                    {commissionMeetings.filter(m => m.status === 'scheduled').length === 0 && (
                      <div className="py-6 text-center text-gray-500">
                        <p>Não há reuniões agendadas</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-800">Membros da Comissão</h3>
              <button className="btn btn-sm btn-primary">
                <UserPlus size={16} />
                Adicionar Membro
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Empresa</th>
                      <th>Data de Entrada</th>
                      <th>Taxa de Presença</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.userId} className="hover:bg-gray-50">
                        <td>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden mr-3">
                              <img 
                                src={`https://images.pexels.com/photos/${1000000 + parseInt(member.userId)}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=150`} 
                                alt={member.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150";
                                }}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td>{member.company}</td>
                        <td>{member.joinDate}</td>
                        <td>
                          <div className="flex items-center">
                            <div 
                              className={`h-2 w-2 rounded-full mr-2 ${
                                member.attendanceRate >= 90 ? 'bg-green-500' :
                                member.attendanceRate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                            ></div>
                            <span>{member.attendanceRate}%</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit size={16} />
                              <span className="sr-only">Editar</span>
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <Trash size={16} />
                              <span className="sr-only">Remover</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {members.length === 0 && (
                <div className="py-6 text-center text-gray-500">
                  <p>Nenhum membro nesta comissão</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Meetings Tab */}
        {activeTab === 'meetings' && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-800">Reuniões da Comissão</h3>
              <button className="btn btn-sm btn-primary">
                <Plus size={16} />
                Agendar Reunião
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Data</th>
                      <th>Horário</th>
                      <th>Local</th>
                      <th>Status</th>
                      <th>Presença</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionMeetings.map((meeting) => (
                      <tr key={meeting.id} className="hover:bg-gray-50">
                        <td>
                          <div>
                            <p className="font-medium text-gray-800">{meeting.title}</p>
                          </div>
                        </td>
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
                          <div className="flex items-center space-x-2">
                            <Link to={`/meetings/${meeting.id}`} className="text-blue-600 hover:text-blue-800">
                              Ver
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {commissionMeetings.length === 0 && (
                <div className="py-6 text-center text-gray-500">
                  <p>Nenhuma reunião registrada para esta comissão</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommissionDetail;