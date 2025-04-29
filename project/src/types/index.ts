// User and auth types
export type UserRole = 'admin' | 'coordinator' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  state: string;
  role: UserRole;
  joinDate: string;
  commissions: string[];
  avatarUrl?: string;
}

// Commission types
export interface Commission {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  meetingCount: number;
  createdAt: string;
}

export interface CommissionMember {
  userId: string;
  name: string;
  email: string;
  company: string;
  joinDate: string;
  attendanceRate: number;
}

// Meeting types
export interface Meeting {
  id: string;
  commissionId: string;
  commissionName: string;
  title: string;
  date: string;
  time: string;
  location: string;
  agenda: string;
  attendees: number;
  absentees: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export interface MeetingAttendance {
  userId: string;
  name: string;
  email: string;
  company: string;
  present: boolean;
  justification?: string;
}

// Stats and report types
export interface CommissionStats {
  id: string;
  name: string;
  memberCount: number;
  meetingCount: number;
  attendanceRate: number;
  lastMeeting?: string;
}

export interface GlobalStats {
  totalUsers: number;
  totalCommissions: number;
  totalMeetings: number;
  averageAttendance: number;
  upcomingMeetings: number;
}

export interface AttendanceReport {
  userId: string;
  name: string;
  totalMeetings: number;
  attended: number;
  excused: number;
  missed: number;
  attendanceRate: number;
}