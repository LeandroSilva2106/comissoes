import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Edit, User as UserIcon, Mail, Phone, Building,
  MapPin, BookOpen, Calendar, Clock, CheckCircle, XCircle, 
  AlertTriangle, BarChart2
} from 'lucide-react';
import { mockUsers, mockCommissions, mockAttendanceReports } from '../../data/mockData';

const getTabs = () => [
  { id: 'overview', label: 'Visão Geral' },
  { id: 'commissions', label: 'Comissões' },
  { id: 'attendance', label: 'Presenças' }
];

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the user data
  const user = mockUsers.find(u => u.id === id);
  
  // Get user's commissions
  const userCommissions = mockCommissions.filter(
    commission => user?.commissions.includes(commission.id)
  );
  
  // Get attendance report
  const attendanceReport = mockAttendanceReports.find(report => report.userId === id);
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Usuário não encontrado</h2>
        <Link to="/users" className="btn btn-primary">
          <ChevronLeft size={18} />
          Voltar para Membros
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/users" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ChevronLeft size={16} className="mr-1" />
          Voltar para Membros
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="md:flex-shrink-0">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center">
                <UserIcon size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              
              <div className="flex items-center gap-2">
                <button className="btn btn-outline">
                  <Edit size={16} />
                  Editar
                </button>
              </div>
            </div>
            
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                user.role === 'coordinator' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              {user.role === 'admin' ? 'Administrador' : 
              user.role === 'coordinator' ? 'Coordenador' : 'Visualizador'}
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={18} className="mr-2" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building size={18} className="mr-2" />
                <span>{user.company}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2" />
                <span>{user.state}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen size={18} className="mr-2" />
                <span>{user.commissions.length} Comissões</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-2" />
                <span>Desde {user.joinDate}</span>
              </div>
            </div>
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Comissões</h3>
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="text-3xl font-bold text-blue-600">{userCommissions.length}</span>
                  </div>
                  <div className="flex-1">
                    <ul className="text-sm text-gray-600">
                      {userCommissions.slice(0, 2).map(commission => (
                        <li key={commission.id} className="truncate">• {commission.name}</li>
                      ))}
                      {userCommissions.length > 2 && (
                        <li className="text-blue-600 hover:text-blue-800">
                          <button onClick={() => setActiveTab('commissions')}>
                            +{userCommissions.length - 2} mais
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              
              {attendanceReport && (
                <>
                  <div className="card p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Presenças</h3>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <span className="text-3xl font-bold text-green-600">{attendanceReport.attended}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {attendanceReport.attended} de {attendanceReport.totalMeetings} reuniões
                          </span>
                        </div>
                        <div className="mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(attendanceReport.attended / attendanceReport.totalMeetings) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ausências</h3>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <span className="text-3xl font-bold text-gray-700">
                          {attendanceReport.excused + attendanceReport.missed}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <AlertTriangle size={16} className="text-amber-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {attendanceReport.excused} justificadas, {attendanceReport.missed} sem justificativa
                          </span>
                        </div>
                        
                        <div className="mt-1">
                          <button onClick={() => setActiveTab('attendance')} className="text-sm text-blue-600 hover:text-blue-800">
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {!attendanceReport && (
                <div className="card p-5 md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Participação em Reuniões</h3>
                  <div className="text-gray-600">
                    <p>Este membro ainda não participou de nenhuma reunião.</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Commissions */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-800">Comissões Participantes</h3>
                <button className="btn btn-sm btn-outline">
                  <BookOpen size={16} className="mr-1" />
                  Adicionar
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Comissão</th>
                        <th>Descrição</th>
                        <th>Total de Membros</th>
                        <th>Reuniões</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {userCommissions.map((commission) => (
                        <tr key={commission.id} className="hover:bg-gray-50">
                          <td className="font-medium text-gray-800">{commission.name}</td>
                          <td className="max-w-[250px] truncate">{commission.description}</td>
                          <td>{commission.memberCount}</td>
                          <td>{commission.meetingCount}</td>
                          <td>
                            <Link 
                              to={`/commissions/${commission.id}`} 
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
                
                {userCommissions.length === 0 && (
                  <div className="py-6 text-center text-gray-500">
                    <p>Este membro não participa de nenhuma comissão</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Commissions Tab */}
        {activeTab === 'commissions' && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-800">Comissões Participantes</h3>
              <button className="btn btn-sm btn-primary">
                <BookOpen size={16} className="mr-1" />
                Adicionar à Comissão
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Comissão</th>
                      <th>Descrição</th>
                      <th>Data de Entrada</th>
                      <th>Total de Membros</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userCommissions.map((commission) => (
                      <tr key={commission.id} className="hover:bg-gray-50">
                        <td className="font-medium text-gray-800">{commission.name}</td>
                        <td className="max-w-[250px] truncate">{commission.description}</td>
                        <td>{user.joinDate}</td>
                        <td>{commission.memberCount}</td>
                        <td>
                          <div className="flex items-center space-x-2">
                            <Link 
                              to={`/commissions/${commission.id}`} 
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Ver
                            </Link>
                            <button className="text-red-600 hover:text-red-800">
                              Remover
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {userCommissions.length === 0 && (
                <div className="py-6 text-center text-gray-500">
                  <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma comissão</h3>
                  <p>Este membro não participa de nenhuma comissão</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div>
            {attendanceReport ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="card p-5">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total de Reuniões</h3>
                    <p className="text-2xl font-semibold">{attendanceReport.totalMeetings}</p>
                  </div>
                  
                  <div className="card p-5">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Presenças</h3>
                    <div className="flex items-center">
                      <p className="text-2xl font-semibold text-green-600">{attendanceReport.attended}</p>
                      <span className="text-sm text-gray-500 ml-2">
                        ({Math.round((attendanceReport.attended / attendanceReport.totalMeetings) * 100)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="card p-5">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Faltas Justificadas</h3>
                    <div className="flex items-center">
                      <p className="text-2xl font-semibold text-amber-600">{attendanceReport.excused}</p>
                      <span className="text-sm text-gray-500 ml-2">
                        ({Math.round((attendanceReport.excused / attendanceReport.totalMeetings) * 100)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="card p-5">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Faltas Sem Justificativa</h3>
                    <div className="flex items-center">
                      <p className="text-2xl font-semibold text-red-600">{attendanceReport.missed}</p>
                      <span className="text-sm text-gray-500 ml-2">
                        ({Math.round((attendanceReport.missed / attendanceReport.totalMeetings) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-lg font-semibold text-gray-800">Histórico de Presenças</h3>
                    <button className="btn btn-sm btn-outline">
                      <BarChart2 size={16} className="mr-1" />
                      Exportar
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="w-full max-w-md">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">Taxa de Presença</h3>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                {attendanceReport.attendanceRate}%
                              </span>
                            </div>
                          </div>
                          <div className="flex h-4 overflow-hidden text-xs bg-gray-200 rounded-full">
                            <div 
                              className="flex flex-col justify-center text-center text-white bg-green-500 shadow-none" 
                              style={{ width: `${attendanceReport.attendanceRate}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-8">
                          <div className="text-center p-4 rounded-lg bg-green-50">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-500 mb-2">
                              <CheckCircle size={20} />
                            </div>
                            <h4 className="text-sm font-medium text-gray-700">Presenças</h4>
                            <p className="text-xl font-semibold text-green-600">{attendanceReport.attended}</p>
                          </div>
                          
                          <div className="text-center p-4 rounded-lg bg-amber-50">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-500 mb-2">
                              <AlertTriangle size={20} />
                            </div>
                            <h4 className="text-sm font-medium text-gray-700">Justificadas</h4>
                            <p className="text-xl font-semibold text-amber-600">{attendanceReport.excused}</p>
                          </div>
                          
                          <div className="text-center p-4 rounded-lg bg-red-50">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-500 mb-2">
                              <XCircle size={20} />
                            </div>
                            <h4 className="text-sm font-medium text-gray-700">Não Justificadas</h4>
                            <p className="text-xl font-semibold text-red-600">{attendanceReport.missed}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="card">
                <div className="card-body">
                  <div className="text-center py-12">
                    <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Sem histórico de presenças</h3>
                    <p className="text-gray-600 mb-4">Este membro ainda não participou de nenhuma reunião.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;