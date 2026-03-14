import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserTier } from '../contexts/UserTierContext';
import { useNotif } from '../contexts/NotifContext';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { canAccessCompass, isAdmin } = useUserTier();
  const { unreadNotification, markNotificationAsRead } = useNotif();

  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/checkin', label: 'Check-in', icon: '✓' },
    { path: '/progress', label: 'Progress', icon: '📊' },
    { 
      path: '/compass', 
      label: 'Compass', 
      icon: '🧭',
      disabled: !canAccessCompass 
    },
    { path: '/journal', label: 'Journal', icon: '📔' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin', icon: '👤' });
  }

  const handleNavClick = (path, disabled) => {
    if (disabled) {
      // Show upgrade prompt for Compass
      alert('My Ikigai Compass is available to Premium members. Contact your course provider to unlock this feature.');
      return;
    }
    navigate(path);
  };

  const handleNotificationClick = () => {
    if (unreadNotification) {
      markNotificationAsRead();
    }
  };

  return (
    <>
      {/* Admin Notification Banner */}
      {unreadNotification && (
        <div className="gi-card mx-4 mt-4 p-4 border-l-4 border-gi-gold">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <img src="/app-logo.png" alt="Genba Ikigai" className="w-8 h-8" />
              <span className="ml-3 text-xl font-light text-gi-white">Genba Ikigai</span>
            </div>
            <button onClick={handleNotificationClick} className="text-gi-horizon hover:text-gi-white">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gi-deep border-t border-gi-slate z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isDisabled = item.disabled;
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path, isDisabled)}
                disabled={isDisabled}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                  isActive 
                    ? 'text-gi-white' 
                    : isDisabled 
                      ? 'text-gi-mist/50 cursor-not-allowed' 
                      : 'text-gi-mist hover:text-gi-white'
                }`}
              >
                <span className="text-xl mb-1">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <div className="w-1 h-1 bg-gi-gold rounded-full mt-1"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Add padding to account for fixed navigation */}
      <div className="h-20"></div>
    </>
  );
}
