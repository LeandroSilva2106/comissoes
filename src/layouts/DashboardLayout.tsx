import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  Menu, X, LayoutDashboard, Users, BookOpen, Calendar, BarChart, 
  LogOut, ChevronDown, Bell, Globe2, User as UserIcon
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center ml-2 lg:ml-0">
              <Globe2 size={28} className="text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-800">UNIDAS</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <div className="relative">
              <div className="flex items-center cursor-pointer">
                {currentUser?.avatarUrl ? (
                  <img 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.name} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {currentUser?.name.charAt(0)}
                  </div>
                )}
                <div className="ml-2 hidden lg:block">
                  <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">{currentUser?.role === 'admin' ? 'Administrador' : 
                    currentUser?.role === 'coordinator' ? 'Coordenador' : 'Membro'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-200 ease-in-out bg-white border-r border-gray-200 pt-16 lg:pt-0 overflow-y-auto`}
        >
          <div className="p-4">
            <nav className="space-y-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={closeSidebarOnMobile}
              >
                <LayoutDashboard size={20} className="mr-3" />
                Dashboard
              </NavLink>
              
              <NavLink 
                to="/users" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={closeSidebarOnMobile}
              >
                <Users size={20} className="mr-3" />
                Membros
              </NavLink>
              
              <NavLink 
                to="/commissions" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={closeSidebarOnMobile}
              >
                <BookOpen size={20} className="mr-3" />
                Comissões
              </NavLink>
              
              <NavLink 
                to="/meetings" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={closeSidebarOnMobile}
              >
                <Calendar size={20} className="mr-3" />
                Reuniões
              </NavLink>
              
              <NavLink 
                to="/reports" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={closeSidebarOnMobile}
              >
                <BarChart size={20} className="mr-3" />
                Relatórios
              </NavLink>
              
              <hr className="my-4 border-gray-200" />
              
              <button 
                onClick={handleLogout} 
                className="w-full flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <LogOut size={20} className="mr-3" />
                Sair
              </button>
            </nav>
          </div>
        </aside>
        
        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pt-4 fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;