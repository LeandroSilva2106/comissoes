import React from 'react';
import { Link } from 'react-router-dom';
import { Meeting } from '../../types';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';

interface MeetingListProps {
  meetings: Meeting[];
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings }) => {
  return (
    <div className="divide-y divide-gray-100">
      {meetings.map((meeting) => (
        <div key={meeting.id} className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{meeting.title}</h3>
              <p className="text-sm text-gray-600">{meeting.commissionName}</p>
              
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1 flex-shrink-0" />
                  {meeting.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1 flex-shrink-0" />
                  {meeting.time}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={14} className="mr-1 flex-shrink-0" />
                  <span className="truncate">{meeting.location}</span>
                </div>
              </div>
            </div>
            
            <Link 
              to={`/meetings/${meeting.id}`} 
              className="text-blue-600 hover:text-blue-800 flex items-center pt-1"
            >
              <span className="sr-only">Ver reunião</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingList;