import React from 'react';
import { Outlet } from 'react-router-dom';
import { Globe2 } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 py-6 px-8 text-white text-center">
          <div className="flex items-center justify-center mb-2">
            <Globe2 size={32} className="mr-2" />
            <h1 className="text-2xl font-bold">UNIDAS</h1>
          </div>
          <p className="text-blue-100">Sistema de Gestão de Comissões</p>
        </div>
        
        <Outlet />
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-500">
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;