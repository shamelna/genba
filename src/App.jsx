import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { UserTierProvider } from './contexts/UserTierContext.jsx';
import { NotifProvider } from './contexts/NotifContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import GenbIkigaiWidget from './components/GenbIkigaiWidget.jsx';
import LeftNavigationPanel from './components/LeftNavigationPanel.jsx';
import Navigation from './components/Navigation.jsx';

// Import pages
import Login from './pages/Login.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Home from './pages/Home.jsx';
import CheckIn from './pages/CheckIn.jsx';
import Progress from './pages/Progress.jsx';
import LearningDashboard from './pages/LearningDashboard.jsx';
import Compass from './pages/Compass.jsx';
import Journal from './pages/Journal.jsx';
import Settings from './pages/Settings.jsx';
import Admin from './pages/Admin.jsx';
import CaseStudyPage from './pages/CaseStudyPage.jsx';

function App() {
  return (
    <AuthProvider>
      <UserTierProvider>
        <NotifProvider>
          <Router>
            <div className="min-h-screen bg-gi-deep">
              {/* Always show header navigation */}
              <Navigation />
              
              <div className="flex pt-16"> {/* Add padding for header */}
                <LeftNavigationPanel />
                <div className="flex-1 overflow-hidden">
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
                      path="/dashboard" 
                      element={<ProtectedRoute><LearningDashboard /></ProtectedRoute>}
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
                    
                    <Route
                      path="/case-study/:moduleId"
                      element={<ProtectedRoute><CaseStudyPage /></ProtectedRoute>}
                    />

                    <Route path="/" element={<Navigate to="/home" replace />} />
                  </Routes>
                </div>
              </div>
              <GenbIkigaiWidget />
            </div>
          </Router>
        </NotifProvider>
      </UserTierProvider>
    </AuthProvider>
  );
}

export default App;
