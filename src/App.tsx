import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Commissions from './pages/commissions/Commissions';
import CommissionDetail from './pages/commissions/CommissionDetail';
import Meetings from './pages/meetings/Meetings';
import MeetingDetail from './pages/meetings/MeetingDetail';
import Reports from './pages/reports/Reports';
import UserProfile from './pages/users/UserProfile';
import NotFound from './pages/NotFound';

// Auth Guard
import ProtectedRoute from './components/auth/ProtectedRoute';

// Página de Teste de Login (adicione essa página em src/pages/LoginTest.tsx)
import LoginTest from './pages/LoginTest';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/commissions/:id" element={<CommissionDetail />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/meetings/:id" element={<MeetingDetail />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Route>

        {/* Teste de Login - Página Dev */}
        <Route path="/teste-login" element={<LoginTest />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
