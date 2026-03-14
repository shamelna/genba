import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { UserTierProvider } from './contexts/UserTierContext.jsx';
import { NotifProvider } from './contexts/NotifContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Import pages
import Login from './pages/Login.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Home from './pages/Home.jsx';
import CheckIn from './pages/CheckIn.jsx';
import Progress from './pages/Progress.jsx';
import Compass from './pages/Compass.jsx';
import Journal from './pages/Journal.jsx';
import Settings from './pages/Settings.jsx';
import Admin from './pages/Admin.jsx';

function App() {
  return (
    <AuthProvider>
      <UserTierProvider>
        <NotifProvider>
          <Router>
            <div className="min-h-screen bg-gi-deep">
              <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route 
                  path="/onboarding" 
                  element={<ProtectedRoute><Onboarding /></ProtectedRoute>}
                />
                <Route 
                  path="/home" 
                  element={<ProtectedRoute><Home /></ProtectedRoute>}
                />
                <Route 
                  path="/checkin" 
                  element={<ProtectedRoute><CheckIn /></ProtectedRoute>}
                />
                <Route 
                  path="/progress" 
                  element={<ProtectedRoute><Progress /></ProtectedRoute>}
                />
                <Route 
                  path="/compass" 
                  element={<ProtectedRoute requirePremium={true}><Compass /></ProtectedRoute>}
                />
                <Route 
                  path="/journal" 
                  element={<ProtectedRoute><Journal /></ProtectedRoute>}
                />
                <Route 
                  path="/settings" 
                  element={<ProtectedRoute><Settings /></ProtectedRoute>}
                />
                <Route 
                  path="/admin" 
                  element={<ProtectedRoute requireAdmin={true}><Admin /></ProtectedRoute>}
                />
                
                <Route path="/" element={<Navigate to="/home" replace />} />
              </Routes>
            </div>
          </Router>
        </NotifProvider>
      </UserTierProvider>
    </AuthProvider>
  );
}

export default App;
