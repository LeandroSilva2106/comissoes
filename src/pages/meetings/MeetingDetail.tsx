import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Edit, Clock, Calendar, MapPin, Users, BookOpen,
  FileText, CheckCircle, XCircle, AlertTriangle, CheckCircle2,
  XCircle as XCircleIcon, UserCheck, UserX
} from 'lucide-react';
import { mockMeetings, mockMeetingAttendance, mockCommissions } from '../../data/mockData';

const getTabs = () => [
  { id: 'details', label: 'Detalhes' },
  { id: 'attendance', label: 'Presenças' },
  { id: 'notes', label: 'Anotações' }
];

const MeetingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('details');
  
  // Find the meeting data
  const meeting = mockMeetings.find(m => m.id === id);
  
  // Get commission data
  const commission = mockCommissions.find(c => c.id === meeting?.commissionId);
  
  // Get attendance data
  const attendanceData = mockMeetingAttendance[id || ''] || [];
  
  if (!meeting) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Reunião não encontrada</h2>
        <Link to="/meetings" className="btn btn-primary">
          <ChevronLeft size={18} />
          Voltar para Reuniões
        </Link>
      </div>
    );
  }
  
  // Calculate attendance stats
  const totalMembers = attendanceData.length;
  const presentMembers = attendanceData.filter(a => a.present).length;
  const absentMembers = attendanceData.filter(a => !a.present).length;
  const attendanceRate = totalMembers > 0 ? Math.round((presentMembers / totalMembers) * 100) : 0;
  
  const isPast = new Date(meeting.date.split('/').reverse().join('-')) < new Date();
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/meetings" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ChevronLeft size={16} className="mr-1" />
          Voltar para Reuniões
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-800">{meeting.title}</h1>
          
          <div className="flex items-center gap-2">
            <button className="btn btn-outline">
              <Edit size={16} />
              Editar
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
          <div className="flex items-center text-gray-600">
            <Calendar size={18} className="mr-2" />
            <span>{meeting.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2" />
            <span>{meeting.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2" />
            <span>{meeting.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen size={18} className="mr-2" />
            <span>{meeting.commissionName}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <span 
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              meeting.status === 'completed' ? 'bg-green-100 text-green-800' :
              meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
              meeting.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}
          >
            {meeting.status === 'completed' ? (
              <>
                <CheckCircle2 size={16} className="mr-1" />
                Reunião Realizada
              </>
            ) : meeting.status === 'scheduled' ? (
              <>
                <Calendar size={16} className="mr-1" />
                Reunião Agendada
              </>
            ) : meeting.status === 'in-progress' ? (
              <>
                <Clock size={16} className="mr-1" />
                Em Andamento
              </>
            ) : (
              <>
                <XCircleIcon size={16} className="mr-1" />
                Reunião Cancelada
              </>
            )}
          </span>
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
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {isPast && (
                <>
                  <div className="card p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Presentes</h3>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <span className="text-3xl font-bold text-green-600">{presentMembers}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <UserCheck size={16} className="text-green-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {presentMembers} de {totalMembers} membros
                          </span>
                        </div>
                        <div className="mt-1">
                          <button 
                            onClick={() => setActiveTab('attendance')} 
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Ver lista
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ausentes</h3>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <span className="text-3xl font-bold text-red-600">{absentMembers}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <UserX size={16} className="text-red-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {absentMembers} de {totalMembers} membros
                          </span>
                        </div>
                        <div className="mt-1">
                          <button 
                            onClick={() => setActiveTab('attendance')} 
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Taxa de Presença</h3>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <span 
                          className={`text-3xl font-bold ${
                            attendanceRate >= 90 ? 'text-green-600' : 
                            attendanceRate >= 75 ? 'text-amber-600' : 'text-red-600'
                          }`}
                        >
                          {attendanceRate}%
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              attendanceRate >= 90 ? 'bg-green-600' : 
                              attendanceRate >= 75 ? 'bg-amber-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${attendanceRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {!isPast && (
                <div className="card p-5 md:col-span-3">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Reunião Agendada</h3>
                      <p className="text-gray-600">
                        Esta reunião está agendada para {meeting.date} às {meeting.time}.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="btn btn-primary">
                      Iniciar Reunião
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Meeting Agenda */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-800">Pauta da Reunião</h3>
                  <button className="btn btn-sm btn-outline">
                    <Edit size={16} />
                    Editar
                  </button>
                </div>
                <div className="card-body">
                  <div className="flex items-start">
                    <FileText size={20} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      {meeting.agenda.split(',').map((item, index) => (
                        <div key={index} className="mb-2">
                          <div className="flex items-baseline">
                            <span className="text-gray-800 font-medium">
                              {index + 1}.
                            </span>
                            <p className="ml-2">{item.trim()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Commission Info */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-800">Comissão</h3>
                  <Link to={`/commissions/${commission?.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
                    Ver comissão
                  </Link>
                </div>
                <div className="card-body">
                  {commission ? (
                    <div>
                      <h4 className="text-base font-medium text-gray-800">{commission.name}</h4>
                      <p className="text-gray-600 mb-4">{commission.description}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <div className="flex items-center text-gray-600">
                          <Users size={16} className="mr-1" />
                          <span>{commission.memberCount} Membros</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-1" />
                          <span>{commission.meetingCount} Reuniões</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Informações da comissão não disponíveis</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-800">Lista de Presenças</h3>
              <div>
                {meeting.status === 'completed' ? (
                  <span className="text-sm text-gray-600">
                    Taxa de presença: <strong>{attendanceRate}%</strong>
                  </span>
                ) : (
                  <button className="btn btn-sm btn-primary">
                    Registrar Presenças
                  </button>
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {isPast && attendanceData.length > 0 ? (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Membro</th>
                        <th>Empresa</th>
                        <th>Presença</th>
                        <th>Justificativa</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((attendance) => (
                        <tr key={attendance.userId} className="hover:bg-gray-50">
                          <td>
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden mr-3">
                                <img 
                                  src={`https://images.pexels.com/photos/${1000000 + parseInt(attendance.userId)}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=150`} 
                                  alt={attendance.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150";
                                  }}
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{attendance.name}</p>
                                <p className="text-xs text-gray-500">{attendance.email}</p>
                              </div>
                            </div>
                          </td>
                          <td>{attendance.company}</td>
                          <td>
                            <span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                attendance.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {attendance.present ? (
                                <>
                                  <CheckCircle size={12} className="mr-1" />
                                  Presente
                                </>
                              ) : (
                                <>
                                  <XCircle size={12} className="mr-1" />
                                  Ausente
                                </>
                              )}
                            </span>
                          </td>
                          <td>
                            {!attendance.present ? (
                              attendance.justification ? (
                                <span className="text-gray-600">{attendance.justification}</span>
                              ) : (
                                <span className="inline-flex items-center text-red-600">
                                  <AlertTriangle size={14} className="mr-1" />
                                  Sem justificativa
                                </span>
                              )
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td>
                            <button className="text-blue-600 hover:text-blue-800">
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  {isPast ? (
                    <>
                      <Users size={48} className="mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhum registro de presença</h3>
                      <p>Não há registros de presença para esta reunião.</p>
                      <button className="mt-4 btn btn-primary">
                        Registrar Presenças
                      </button>
                    </>
                  ) : (
                    <>
                      <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Reunião agendada</h3>
                      <p>As presenças poderão ser registradas quando a reunião ocorrer.</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-800">Anotações da Reunião</h3>
              <button className="btn btn-sm btn-primary">
                Salvar Anotações
              </button>
            </div>
            <div className="card-body">
              {isPast ? (
                <div>
                  <textarea
                    className="form-textarea h-48"
                    placeholder="Registre aqui as principais discussões, decisões e encaminhamentos da reunião..."
                  ></textarea>
                  
                  <div className="mt-6">
                    <h4 className="text-base font-medium text-gray-800 mb-3">Anexos</h4>
                    <button className="btn btn-outline">
                      <Plus size={16} className="mr-1" />
                      Adicionar Anexo
                    </button>
                    
                    <div className="mt-4 text-gray-500 text-sm">
                      Nenhum anexo disponível.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Reunião agendada</h3>
                  <p>As anotações poderão ser registradas quando a reunião ocorrer.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingDetail;