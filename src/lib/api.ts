import { supabase } from './supabase';
import { User, Commission, Meeting, CommissionMember, MeetingAttendance } from '../types';

// Users API
export const usersApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        commission_members (
          commission_id,
          join_date,
          commission:commissions (
            name,
            description
          )
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Commissions API
export const commissionsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('commissions')
      .select(`
        *,
        members:commission_members (
          user:users (
            id,
            name,
            email,
            company
          )
        )
      `)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('commissions')
      .select(`
        *,
        members:commission_members (
          join_date,
          user:users (
            id,
            name,
            email,
            company,
            avatar_url
          )
        ),
        meetings (
          id,
          title,
          date,
          time,
          location,
          status
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(commission: Partial<Commission>) {
    const { data, error } = await supabase
      .from('commissions')
      .insert(commission)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, commission: Partial<Commission>) {
    const { data, error } = await supabase
      .from('commissions')
      .update(commission)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async addMember(commissionId: string, userId: string) {
    const { data, error } = await supabase
      .from('commission_members')
      .insert({
        commission_id: commissionId,
        user_id: userId
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async removeMember(commissionId: string, userId: string) {
    const { error } = await supabase
      .from('commission_members')
      .delete()
      .eq('commission_id', commissionId)
      .eq('user_id', userId);
    
    if (error) throw error;
  }
};

// Meetings API
export const meetingsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('meetings')
      .select(`
        *,
        commission:commissions (
          name
        ),
        attendance:meeting_attendance (
          present,
          justification,
          user:users (
            name
          )
        )
      `)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('meetings')
      .select(`
        *,
        commission:commissions (
          id,
          name,
          description
        ),
        attendance:meeting_attendance (
          present,
          justification,
          user:users (
            id,
            name,
            email,
            company,
            avatar_url
          )
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(meeting: Partial<Meeting>) {
    const { data, error } = await supabase
      .from('meetings')
      .insert(meeting)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, meeting: Partial<Meeting>) {
    const { data, error } = await supabase
      .from('meetings')
      .update(meeting)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async markAttendance(meetingId: string, attendance: MeetingAttendance[]) {
    const { error } = await supabase
      .from('meeting_attendance')
      .upsert(
        attendance.map(a => ({
          meeting_id: meetingId,
          user_id: a.userId,
          present: a.present,
          justification: a.justification
        }))
      );
    
    if (error) throw error;
  }
};

// Statistics API
export const statsApi = {
  async getGlobalStats() {
    const [
      { count: totalUsers },
      { count: totalCommissions },
      { count: totalMeetings },
      { data: attendanceData }
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('commissions').select('*', { count: 'exact', head: true }),
      supabase.from('meetings').select('*', { count: 'exact', head: true }),
      supabase.from('meeting_attendance').select('present')
    ]);

    const averageAttendance = attendanceData?.length
      ? (attendanceData.filter(a => a.present).length / attendanceData.length) * 100
      : 0;

    return {
      totalUsers,
      totalCommissions,
      totalMeetings,
      averageAttendance: Math.round(averageAttendance)
    };
  },

  async getCommissionStats() {
    const { data, error } = await supabase
      .from('commissions')
      .select(`
        id,
        name,
        members:commission_members (count),
        meetings (
          id,
          date,
          attendance:meeting_attendance (
            present
          )
        )
      `);
    
    if (error) throw error;

    return data?.map(commission => {
      const totalAttendance = commission.meetings.reduce((sum, meeting) => 
        sum + (meeting.attendance?.filter(a => a.present).length || 0), 0);
      const totalPossibleAttendance = commission.meetings.reduce((sum, meeting) => 
        sum + (meeting.attendance?.length || 0), 0);
      
      return {
        id: commission.id,
        name: commission.name,
        memberCount: commission.members,
        meetingCount: commission.meetings.length,
        attendanceRate: totalPossibleAttendance 
          ? Math.round((totalAttendance / totalPossibleAttendance) * 100)
          : 0,
        lastMeeting: commission.meetings
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.date
      };
    });
  }
};