import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockUsers } from '../../data/mockData';
import { 
  Plus, Search, Filter, ChevronRight, CheckCircle2, Users as UsersIcon
} from 'lucide-react';

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = mockUsers.filter(
    user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Membros</h1>
          <p className="text-gray-600">Gerencie os membros das comissões</p>
        </div>
        
        <button className="btn btn-primary">
          <Plus size={18} />
          Novo Membro
        </button>
      </div>
      
      <div className="card mb-6">
        <div className="card-body p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar membros..."
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
      
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Lista de Membros</h2>
          <div className="text-sm text-gray-500">{filteredUsers.length} membros</div>
        </div>
        <div className="card-body p-0">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Empresa</th>
                  <th>Estado</th>
                  <th>Comissões</th>
                  <th>Data de Entrada</th>
                  <th>Perfil</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td>
                      <div className="flex items-center">
                        {user.avatarUrl ? (
                          <img 
                            src={user.avatarUrl} 
                            alt={user.name} 
                            className="h-8 w-8 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <span className="text-gray-700 font-medium">{user.name.charAt(0)}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>{user.company}</td>
                    <td>{user.state}</td>
                    <td>
                      <div className="flex items-center">
                        <UsersIcon size={14} className="text-gray-400 mr-1" />
                        {user.commissions.length}
                      </div>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'coordinator' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.role === 'admin' ? 'Administrador' : 
                        user.role === 'coordinator' ? 'Coordenador' : 'Visualizador'}
                      </span>
                    </td>
                    <td>
                      <Link 
                        to={`/users/${user.id}`} 
                        className="text-blue-600 hover:text-blue-800 flex items-center justify-end"
                      >
                        <span className="sr-only">Ver perfil</span>
                        <ChevronRight size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <UsersIcon size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhum membro encontrado</h3>
              <p>Tente ajustar os filtros ou adicione novos membros</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;