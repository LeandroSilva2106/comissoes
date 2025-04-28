import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, BookOpen, Calendar, AlertTriangle, Clock, CheckCircle, 
  XCircle, ChevronRight, BarChart2
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { mockGlobalStats, mockCommissionStats, mockMeetings } from '../../data/mockData';
import StatCard from '../../components/dashboard/StatCard';
import CommissionTable from '../../components/dashboard/CommissionTable';
import MeetingList from '../../components/dashboard/MeetingList';
import AttendanceChart from '../../components/dashboard/AttendanceChart';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuthStore();
  
  // Filter upcoming meetings (scheduled status)
  const upcomingMeetings = mockMeetings.filter(meeting => meeting.status === 'scheduled');
  
  // Format greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {getGreeting()}, {currentUser?.name.split(' ')[0]}!
        </h1>
        <p className="text-gray-600 mt-1">
          Bem-vindo ao Sistema de Gestão de Comissões da UNIDAS.
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total de Membros" 
          value={mockGlobalStats.totalUsers} 
          icon={<Users className="text-blue-600" />}
          change={+2}
          changeText="desde o mês passado"
        />
        <StatCard 
          title="Comissões Ativas" 
          value={mockGlobalStats.totalCommissions} 
          icon={<BookOpen className="text-green-600" />}
        />
        <StatCard 
          title="Reuniões Realizadas" 
          value={mockGlobalStats.totalMeetings} 
          icon={<Calendar className="text-purple-600" />}
          change={+4}
          changeText="nos últimos 30 dias"
        />
        <StatCard 
          title="Taxa de Presença" 
          value={`${mockGlobalStats.averageAttendance}%`} 
          icon={<CheckCircle className="text-amber-600" />}
          change={+5}
          changeText="comparado ao mês anterior"
          isPositive={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Upcoming Meetings */}
        <div className="lg:col-span-2">
          <div className="card h-full">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-gray-800">Próximas Reuniões</h2>
              <Link to="/meetings" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                Ver todas <ChevronRight size={16} />
              </Link>
            </div>
            <div className="card-body p-0">
              <MeetingList meetings={upcomingMeetings} />
              
              {upcomingMeetings.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                  <Calendar size={48} className="text-gray-300 mb-2" />
                  <p>Não há reuniões agendadas para os próximos dias.</p>
                  <Link to="/meetings" className="mt-2 text-blue-600 hover:text-blue-800">
                    Agendar uma reunião
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Attendance Chart */}
        <div>
          <div className="card h-full">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-gray-800">Taxa de Presença</h2>
            </div>
            <div className="card-body">
              <AttendanceChart />
            </div>
          </div>
        </div>
      </div>
      
      {/* Commissions Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-800">Visão Geral das Comissões</h2>
          <Link to="/commissions" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
            Ver todas <ChevronRight size={16} />
          </Link>
        </div>
        <div className="card-body p-0">
          <CommissionTable commissions={mockCommissionStats} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;