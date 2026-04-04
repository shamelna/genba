import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserTier } from '../contexts/UserTierContext';
import { useNotif } from '../contexts/NotifContext';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { canAccessCompass, isAdmin, isPremium } = useUserTier();
  const { unreadNotification, markNotificationAsRead } = useNotif();

  // Case Study nav item — active if path starts with /case-study
  const isCaseStudyActive = location.pathname.startsWith('/case-study');

  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/checkin', label: 'Check-in', icon: '✓' },
    // Case Study — only for Basic (non-premium) users who have completed onboarding
    ...(!isPremium
      ? [{
          path: '/case-study/introduction',
          label: 'Case Study',
          icon: '📖',
          activeOverride: isCaseStudyActive,
        }]
      : []),
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
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
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gi-deep border-b border-gi-slate z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = item.activeOverride !== undefined
              ? item.activeOverride
              : location.pathname === item.path;
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

      {/* Admin Notification Banner — sits just below the fixed nav */}
      {unreadNotification && (
        <div
          className="fixed left-0 right-0 z-40 mx-4 mt-1"
          style={{ top: '64px' }}
        >
          <div className="gi-card p-3 border-l-4 border-gi-gold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/app-logo.png" alt="Genba Ikigai" className="w-6 h-6" />
              <span className="text-sm font-light text-gi-white">
                {unreadNotification.text || 'You have a new notification'}
              </span>
            </div>
            <button onClick={handleNotificationClick} className="text-gi-horizon hover:text-gi-white ml-3 flex-shrink-0">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
