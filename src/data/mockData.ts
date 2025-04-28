import { User, Commission, Meeting, CommissionMember, MeetingAttendance, CommissionStats, GlobalStats, AttendanceReport } from '../types';
import { format, subDays, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Helper function to format dates
const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy', { locale: ptBR });
};

// Helper function to format times
const formatTime = (date: Date): string => {
  return format(date, 'HH:mm', { locale: ptBR });
};

// Generate mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@unidas.org.br',
    phone: '(11) 98765-4321',
    company: 'Localiza',
    state: 'SP',
    role: 'admin',
    joinDate: formatDate(subDays(new Date(), 365)),
    commissions: ['1', '2'],
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@unidas.org.br',
    phone: '(21) 98765-1234',
    company: 'Movida',
    state: 'RJ',
    role: 'coordinator',
    joinDate: formatDate(subDays(new Date(), 240)),
    commissions: ['1'],
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Mariana Costa',
    email: 'mariana.costa@unidas.org.br',
    phone: '(31) 99876-5432',
    company: 'Unidas',
    state: 'MG',
    role: 'coordinator',
    joinDate: formatDate(subDays(new Date(), 180)),
    commissions: ['2'],
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    name: 'Paulo Santos',
    email: 'paulo.santos@unidas.org.br',
    phone: '(11) 97654-3210',
    company: 'Alugue',
    state: 'SP',
    role: 'viewer',
    joinDate: formatDate(subDays(new Date(), 120)),
    commissions: ['1', '3'],
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '5',
    name: 'Juliana Lima',
    email: 'juliana.lima@unidas.org.br',
    phone: '(41) 98877-6655',
    company: 'Locamerica',
    state: 'PR',
    role: 'viewer',
    joinDate: formatDate(subDays(new Date(), 90)),
    commissions: ['3'],
    avatarUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '6',
    name: 'Roberto Almeida',
    email: 'roberto.almeida@unidas.org.br',
    phone: '(51) 99887-7665',
    company: 'Rent a Car',
    state: 'RS',
    role: 'viewer',
    joinDate: formatDate(subDays(new Date(), 60)),
    commissions: ['2', '3'],
    avatarUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

// Generate mock commissions
export const mockCommissions: Commission[] = [
  {
    id: '1',
    name: 'Comissão de Tecnologia',
    description: 'Responsável por avaliar e propor melhorias tecnológicas no setor',
    memberCount: 3,
    meetingCount: 12,
    createdAt: formatDate(subDays(new Date(), 400))
  },
  {
    id: '2',
    name: 'Comissão de Sustentabilidade',
    description: 'Desenvolve práticas sustentáveis para o setor de locação de veículos',
    memberCount: 4,
    meetingCount: 8,
    createdAt: formatDate(subDays(new Date(), 250))
  },
  {
    id: '3',
    name: 'Comissão de Regulamentação',
    description: 'Acompanha e propõe mudanças na legislação do setor',
    memberCount: 3,
    meetingCount: 6,
    createdAt: formatDate(subDays(new Date(), 120))
  }
];

// Generate mock commission members
export const mockCommissionMembers: Record<string, CommissionMember[]> = {
  '1': [
    {
      userId: '1',
      name: 'Ana Silva',
      email: 'ana.silva@unidas.org.br',
      company: 'Localiza',
      joinDate: formatDate(subDays(new Date(), 365)),
      attendanceRate: 95
    },
    {
      userId: '2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@unidas.org.br',
      company: 'Movida',
      joinDate: formatDate(subDays(new Date(), 240)),
      attendanceRate: 92
    },
    {
      userId: '4',
      name: 'Paulo Santos',
      email: 'paulo.santos@unidas.org.br',
      company: 'Alugue',
      joinDate: formatDate(subDays(new Date(), 120)),
      attendanceRate: 88
    }
  ],
  '2': [
    {
      userId: '1',
      name: 'Ana Silva',
      email: 'ana.silva@unidas.org.br',
      company: 'Localiza',
      joinDate: formatDate(subDays(new Date(), 365)),
      attendanceRate: 90
    },
    {
      userId: '3',
      name: 'Mariana Costa',
      email: 'mariana.costa@unidas.org.br',
      company: 'Unidas',
      joinDate: formatDate(subDays(new Date(), 180)),
      attendanceRate: 94
    },
    {
      userId: '6',
      name: 'Roberto Almeida',
      email: 'roberto.almeida@unidas.org.br',
      company: 'Rent a Car',
      joinDate: formatDate(subDays(new Date(), 60)),
      attendanceRate: 86
    }
  ],
  '3': [
    {
      userId: '4',
      name: 'Paulo Santos',
      email: 'paulo.santos@unidas.org.br',
      company: 'Alugue',
      joinDate: formatDate(subDays(new Date(), 120)),
      attendanceRate: 85
    },
    {
      userId: '5',
      name: 'Juliana Lima',
      email: 'juliana.lima@unidas.org.br',
      company: 'Locamerica',
      joinDate: formatDate(subDays(new Date(), 90)),
      attendanceRate: 91
    },
    {
      userId: '6',
      name: 'Roberto Almeida',
      email: 'roberto.almeida@unidas.org.br',
      company: 'Rent a Car',
      joinDate: formatDate(subDays(new Date(), 60)),
      attendanceRate: 83
    }
  ]
};

// Generate mock meetings
export const mockMeetings: Meeting[] = [
  {
    id: '1',
    commissionId: '1',
    commissionName: 'Comissão de Tecnologia',
    title: 'Discussão sobre novas tecnologias para rastreamento',
    date: formatDate(subDays(new Date(), 30)),
    time: formatTime(new Date(new Date().setHours(14, 0))),
    location: 'Sala de Reuniões - Sede UNIDAS',
    agenda: 'Apresentação de novas tecnologias, discussão de viabilidade, próximos passos',
    attendees: 3,
    absentees: 0,
    status: 'completed'
  },
  {
    id: '2',
    commissionId: '1',
    commissionName: 'Comissão de Tecnologia',
    title: 'Avaliação de sistemas de gestão de frota',
    date: formatDate(subDays(new Date(), 15)),
    time: formatTime(new Date(new Date().setHours(10, 30))),
    location: 'Videoconferência - Microsoft Teams',
    agenda: 'Análise comparativa de sistemas, prós e contras, recomendações',
    attendees: 2,
    absentees: 1,
    status: 'completed'
  },
  {
    id: '3',
    commissionId: '2',
    commissionName: 'Comissão de Sustentabilidade',
    title: 'Implementação de frota elétrica',
    date: formatDate(subDays(new Date(), 7)),
    time: formatTime(new Date(new Date().setHours(15, 0))),
    location: 'Sala de Reuniões - Sede UNIDAS',
    agenda: 'Análise de viabilidade, infraestrutura necessária, cronograma de implementação',
    attendees: 3,
    absentees: 1,
    status: 'completed'
  },
  {
    id: '4',
    commissionId: '3',
    commissionName: 'Comissão de Regulamentação',
    title: 'Análise de novas regras fiscais para locadoras',
    date: formatDate(new Date()),
    time: formatTime(new Date(new Date().setHours(16, 0))),
    location: 'Videoconferência - Zoom',
    agenda: 'Discussão das novas regras, impactos no setor, estratégias de adaptação',
    attendees: 0,
    absentees: 0,
    status: 'in-progress'
  },
  {
    id: '5',
    commissionId: '1',
    commissionName: 'Comissão de Tecnologia',
    title: 'Planejamento de atualização de sistemas',
    date: formatDate(addDays(new Date(), 7)),
    time: formatTime(new Date(new Date().setHours(11, 0))),
    location: 'Sala de Reuniões - Sede UNIDAS',
    agenda: 'Definição de cronograma, alocação de recursos, contingências',
    attendees: 0,
    absentees: 0,
    status: 'scheduled'
  },
  {
    id: '6',
    commissionId: '2',
    commissionName: 'Comissão de Sustentabilidade',
    title: 'Revisão de metas ambientais',
    date: formatDate(addDays(new Date(), 14)),
    time: formatTime(new Date(new Date().setHours(14, 30))),
    location: 'Videoconferência - Microsoft Teams',
    agenda: 'Avaliação de resultados, ajustes de metas, novas iniciativas',
    attendees: 0,
    absentees: 0,
    status: 'scheduled'
  }
];

// Generate mock meeting attendance
export const mockMeetingAttendance: Record<string, MeetingAttendance[]> = {
  '1': [
    {
      userId: '1',
      name: 'Ana Silva',
      email: 'ana.silva@unidas.org.br',
      company: 'Localiza',
      present: true
    },
    {
      userId: '2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@unidas.org.br',
      company: 'Movida',
      present: true
    },
    {
      userId: '4',
      name: 'Paulo Santos',
      email: 'paulo.santos@unidas.org.br',
      company: 'Alugue',
      present: true
    }
  ],
  '2': [
    {
      userId: '1',
      name: 'Ana Silva',
      email: 'ana.silva@unidas.org.br',
      company: 'Localiza',
      present: true
    },
    {
      userId: '2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@unidas.org.br',
      company: 'Movida',
      present: true
    },
    {
      userId: '4',
      name: 'Paulo Santos',
      email: 'paulo.santos@unidas.org.br',
      company: 'Alugue',
      present: false,
      justification: 'Compromisso de última hora com cliente'
    }
  ],
  '3': [
    {
      userId: '1',
      name: 'Ana Silva',
      email: 'ana.silva@unidas.org.br',
      company: 'Localiza',
      present: true
    },
    {
      userId: '3',
      name: 'Mariana Costa',
      email: 'mariana.costa@unidas.org.br',
      company: 'Unidas',
      present: true
    },
    {
      userId: '6',
      name: 'Roberto Almeida',
      email: 'roberto.almeida@unidas.org.br',
      company: 'Rent a Car',
      present: false,
      justification: 'Problema de saúde'
    }
  ]
};

// Generate mock commission stats
export const mockCommissionStats: CommissionStats[] = [
  {
    id: '1',
    name: 'Comissão de Tecnologia',
    memberCount: 3,
    meetingCount: 12,
    attendanceRate: 92,
    lastMeeting: formatDate(subDays(new Date(), 15))
  },
  {
    id: '2',
    name: 'Comissão de Sustentabilidade',
    memberCount: 4,
    meetingCount: 8,
    attendanceRate: 90,
    lastMeeting: formatDate(subDays(new Date(), 7))
  },
  {
    id: '3',
    name: 'Comissão de Regulamentação',
    memberCount: 3,
    meetingCount: 6,
    attendanceRate: 86,
    lastMeeting: formatDate(new Date())
  }
];

// Generate mock global stats
export const mockGlobalStats: GlobalStats = {
  totalUsers: 6,
  totalCommissions: 3,
  totalMeetings: 6,
  averageAttendance: 89,
  upcomingMeetings: 2
};

// Generate mock attendance reports
export const mockAttendanceReports: AttendanceReport[] = [
  {
    userId: '1',
    name: 'Ana Silva',
    totalMeetings: 3,
    attended: 3,
    excused: 0,
    missed: 0,
    attendanceRate: 100
  },
  {
    userId: '2',
    name: 'Carlos Oliveira',
    totalMeetings: 2,
    attended: 2,
    excused: 0,
    missed: 0,
    attendanceRate: 100
  },
  {
    userId: '3',
    name: 'Mariana Costa',
    totalMeetings: 1,
    attended: 1,
    excused: 0,
    missed: 0,
    attendanceRate: 100
  },
  {
    userId: '4',
    name: 'Paulo Santos',
    totalMeetings: 2,
    attended: 1,
    excused: 1,
    missed: 0,
    attendanceRate: 50
  },
  {
    userId: '6',
    name: 'Roberto Almeida',
    totalMeetings: 1,
    attended: 0,
    excused: 1,
    missed: 0,
    attendanceRate: 0
  }
];