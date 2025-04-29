import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockCommissions } from '../../data/mockData';
import { 
  Plus, Search, MoreHorizontal, Users, Calendar, BookOpen, Filter
} from 'lucide-react';

const Commissions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCommissions = mockCommissions.filter(
    commission => commission.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Comissões</h1>
          <p className="text-gray-600">Gerencie as comissões e seus membros</p>
        </div>
        
        <button className="btn btn-primary">
          <Plus size={18} />
          Nova Comissão
        </button>
      </div>
      
      <div className="card mb-6">
        <div className="card-body p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar comissões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="btn btn-outline">
                <Filter size={18} />
                Filtros
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCommissions.map((commission) => (
          <Link 
            key={commission.id} 
            to={`/commissions/${commission.id}`}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-blue-100 text-blue-700">
                    <BookOpen size={24} />
                  </div>
                </div>
                
                <div className="dropdown">
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <MoreHorizontal size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mt-4 mb-1">{commission.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{commission.description}</p>
              
              <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  {commission.memberCount} Membros
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {commission.meetingCount} Reuniões
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredCommissions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <BookOpen size={64} className="text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma comissão encontrada</h3>
          <p>Não encontramos nenhuma comissão com os critérios informados</p>
        </div>
      )}
    </div>
  );
};

export default Commissions;