import React from 'react';
import { useLocation } from 'react-router-dom';
import CaseStudyPage from '../pages/CaseStudyPage';
import CheckIn from '../pages/CheckIn';
import Journal from '../pages/Journal';
import LearningDashboard from '../pages/LearningDashboard';
import LeftNavigationPanel from './LeftNavigationPanel';

const MainContentArea = () => {
  const location = useLocation();

  const renderContent = () => {
    // Route-based content rendering
    if (location.pathname.startsWith('/case-study/')) {
      return <CaseStudyPage />;
    }
    if (location.pathname === '/checkin') {
      return <CheckIn />;
    }
    if (location.pathname === '/journal') {
      return <Journal />;
    }
    if (location.pathname === '/dashboard') {
      return <LearningDashboard />;
    }
    
    // Default content (could be home or other pages)
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gi-white mb-4">
            Select a module from the course journey
          </h1>
          <p className="text-gi-horizon">
            Navigate using the left panel to access your learning materials
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 lg:ml-72 min-h-screen bg-gi-deep">
      {/* Desktop: Left Panel + Main Content */}
      <div className="hidden lg:flex h-full">
        <LeftNavigationPanel />
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </div>

      {/* Mobile: Full-screen content */}
      <div className="lg:hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainContentArea;
