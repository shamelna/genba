import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCourseProgress } from '../services/firestoreService';
import { MODULE_ORDER, MODULE_LABELS } from '../data/caseStudies';

const LeftNavigationPanel = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState({});
  const [selectedSection, setSelectedSection] = useState('course');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadProgress = async () => {
      if (currentUser) {
        const p = await getCourseProgress(currentUser.uid);
        setProgress(p);
      }
    };
    loadProgress();
  }, [currentUser]);

  const getModuleStatus = (moduleId) => {
    const moduleProgress = progress[moduleId];
    if (!moduleProgress) return { status: 'locked', icon: '🔒' };
    if (moduleProgress.completed) return { status: 'completed', icon: '✓' };
    if (moduleProgress.started) return { status: 'in-progress', icon: '→' };
    return { status: 'available', icon: '🔒' };
  };

  const isModuleAccessible = (moduleId) => {
    if (moduleId === 'introduction') return true;
    const idx = MODULE_ORDER.indexOf(moduleId);
    if (idx <= 0) return true;
    const prevModuleId = MODULE_ORDER[idx - 1];
    return progress[prevModuleId]?.completed === true;
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    if (section === 'daily-practice') {
      navigate('/checkin');
    } else if (section === 'journal') {
      navigate('/journal');
    }
  };

  const handleModuleClick = (moduleId) => {
    navigate(`/case-study/${moduleId}`);
  };

  const modules = MODULE_ORDER.map(moduleId => {
    const status = getModuleStatus(moduleId);
    const isAccessible = isModuleAccessible(moduleId);
    const isActive = location.pathname.includes(moduleId);

    return (
      <button
        key={moduleId}
        onClick={() => isAccessible && handleModuleClick(moduleId)}
        disabled={!isAccessible}
        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
          isActive
            ? 'bg-gi-slate text-gi-white'
            : isAccessible
              ? 'bg-gi-deep hover:bg-gi-slate text-gi-horizon hover:text-gi-white'
              : 'bg-gi-deep/50 text-gi-mist/50 cursor-not-allowed'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-lg">{status.icon}</span>
            <span className="text-sm font-medium">{MODULE_LABELS[moduleId]}</span>
          </div>
          {status.status === 'completed' && (
            <div className="text-xs text-gi-gold">1/5 Complete</div>
          )}
          {status.status === 'in-progress' && (
            <div className="text-xs text-gi-teal">In Progress</div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gi-slate/30 rounded-full h-1.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r transition-all duration-300"
            style={{
              width: status.status === 'completed' ? '100%' : 
                     status.status === 'in-progress' ? '40%' : '0%',
              background: status.status === 'completed' ? 'linear-gradient(to right, #4AB3A0, #FFD559)' :
                           status.status === 'in-progress' ? 'linear-gradient(to right, #4AB3A0, #4AB3A0)' :
                           'transparent'
            }}
          />
        </div>
      </button>
    );
  });

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-gi-deep border-r border-gi-slate z-40">
        <div className="flex flex-col h-full">
          {/* Course Journey Section */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <h3 className="text-gi-white text-lg font-light mb-4">Your Course Journey</h3>
              
              {/* Progress Overview */}
              <div className="gi-card p-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gi-gold mb-2">
                    {Object.values(progress).filter(p => p.completed).length}/5
                  </div>
                  <div className="text-gi-horizon text-sm">Modules Complete</div>
                </div>
              </div>

              {/* Module List */}
              <div className="space-y-2">
                {modules}
              </div>
            </div>
          </div>

          {/* Daily Practice Section */}
          <div className="border-t border-gi-slate p-4">
            <h3 className="text-gi-white text-lg font-light mb-4">Today's Practice</h3>
            
            <div className="gi-card p-4">
              <div className="mb-4">
                <p className="text-gi-mist text-sm italic mb-3">
                  "What did I avoid looking at today? Or recently?"
                </p>
                <p className="text-gi-horizon text-xs mb-4">
                  Guidance: Don't overthink this. Just notice. Write it down if it helps.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSectionClick('journal')}
                  className="w-full bg-gi-slate hover:bg-gi-slate/80 text-gi-horizon py-3 rounded-lg transition-colors"
                >
                  <span className="text-sm">Add to Journal</span>
                </button>
                <button
                  onClick={() => handleSectionClick('daily-practice')}
                  className="w-full bg-gi-teal hover:bg-gi-teal/80 text-gi-deep py-3 rounded-lg transition-colors"
                >
                  <span className="text-sm">Mark Complete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gi-slate rounded-lg"
      >
        <span className="text-gi-white text-xl">☰</span>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-gi-deep/95 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative bg-gi-deep w-80 h-full p-4 overflow-y-auto">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-gi-mist text-xl"
            >
              ×
            </button>
            
            {/* Mobile Course Journey */}
            <div className="mb-6">
              <h3 className="text-gi-white text-lg font-light mb-4">Your Course Journey</h3>
              <div className="space-y-2">
                {modules}
              </div>
            </div>

            {/* Mobile Daily Practice */}
            <div className="border-t border-gi-slate pt-4">
              <h3 className="text-gi-white text-lg font-light mb-4">Today's Practice</h3>
              <div className="gi-card p-4">
                <div className="space-y-3">
                  <button
                    onClick={() => handleSectionClick('journal')}
                    className="w-full bg-gi-slate hover:bg-gi-slate/80 text-gi-horizon py-3 rounded-lg transition-colors"
                  >
                    Add to Journal
                  </button>
                  <button
                    onClick={() => handleSectionClick('daily-practice')}
                    className="w-full bg-gi-teal hover:bg-gi-teal/80 text-gi-deep py-3 rounded-lg transition-colors"
                  >
                    Mark Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftNavigationPanel;
