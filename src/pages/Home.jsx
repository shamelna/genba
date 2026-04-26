import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserTier } from '../contexts/UserTierContext';
import HabitsHouseInline from '../components/HabitsHouseInline';
import { getCourseProgress } from '../services/firestoreService';
import { MODULE_ORDER, MODULE_LABELS } from '../data/caseStudies';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isPremium } = useUserTier();

  const [greeting, setGreeting] = useState('');
  const [progress, setProgress] = useState({});
  const [currentModuleId, setCurrentModuleId] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    loadUserData();
  }, [currentUser]);

  const loadUserData = async () => {
    if (!currentUser) return;
    try {
      const courseProgress = await getCourseProgress(currentUser.uid);
      setProgress(courseProgress);
      
      // Find current module (started but not completed)
      const currentModule = Object.keys(courseProgress).find(moduleId => 
        courseProgress[moduleId]?.started && !courseProgress[moduleId]?.completed
      ) || MODULE_ORDER[0];
      
      setCurrentModuleId(currentModule);
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  const getFirstName = (name) => name ? name.split(' ')[0] : 'Leader';

  const getCurrentModuleStatus = () => {
    if (!currentModuleId || !progress[currentModuleId]) return { status: 'not-started', label: 'Start Learning' };
    
    const moduleProgress = progress[currentModuleId];
    if (moduleProgress.completed) return { status: 'completed', label: 'Review Module' };
    if (moduleProgress.started) return { status: 'in-progress', label: 'Continue Learning' };
    return { status: 'not-started', label: 'Start Learning' };
  };

  const currentModuleStatus = getCurrentModuleStatus();

  return (
    <div className="min-h-screen bg-gi-deep pt-16 pb-6">
      <div className="px-4 pt-6 pb-2 max-w-6xl mx-auto">
        {/* Greeting */}
        <p className="text-gi-horizon text-sm uppercase tracking-widest mb-1">
          {greeting}
        </p>
        <h1 className="text-2xl font-light text-gi-white mb-8 tracking-wide">
          {getFirstName(currentUser?.displayName)}
        </h1>

        {/* Current Module Progress */}
        {currentModuleId && (
          <div className="mb-8">
            <h2 className="text-lg font-light text-gi-white mb-4">Current Module</h2>
            <div className="gi-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-medium text-gi-white mb-2">
                    {MODULE_LABELS[currentModuleId]}
                  </h3>
                  <p className="text-gi-horizon text-sm">
                    {currentModuleStatus.status === 'completed' && 'Completed'}
                    {currentModuleStatus.status === 'in-progress' && 'In Progress'}
                    {currentModuleStatus.status === 'not-started' && 'Not Started'}
                  </p>
                </div>
                <div className="text-3xl">
                  {currentModuleStatus.status === 'completed' && '✓'}
                  {currentModuleStatus.status === 'in-progress' && '→'}
                  {currentModuleStatus.status === 'not-started' && '🔒'}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gi-slate/30 rounded-full h-2 mb-6">
                <div 
                  className="h-full bg-gradient-to-r transition-all duration-300"
                  style={{
                    width: currentModuleStatus.status === 'completed' ? '100%' : 
                           currentModuleStatus.status === 'in-progress' ? '40%' : '0%',
                    background: currentModuleStatus.status === 'completed' ? 'linear-gradient(to right, #4AB3A0, #FFD559)' :
                                 currentModuleStatus.status === 'in-progress' ? 'linear-gradient(to right, #4AB3A0, #4AB3A0)' :
                                 'transparent'
                  }}
                />
              </div>

              {/* Continue Learning Button */}
              <button
                onClick={() => navigate(`/case-study/${currentModuleId}`)}
                className="w-full bg-gi-gold hover:bg-gi-gold/90 text-gi-deep font-semibold py-4 rounded-gi transition-colors flex items-center justify-center gap-2"
              >
                <span>{currentModuleStatus.label}</span>
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="gi-card p-4 text-center">
            <div className="text-2xl font-bold text-gi-gold mb-1">
              {Object.values(progress).filter(p => p.completed).length}
            </div>
            <div className="text-gi-horizon text-sm">Modules Complete</div>
          </div>
          <div className="gi-card p-4 text-center">
            <div className="text-2xl font-bold text-gi-teal mb-1">
              {Object.values(progress).filter(p => p.started).length}
            </div>
            <div className="text-gi-horizon text-sm">Modules Started</div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="gi-card p-6 mb-8">
          <h2 className="text-lg font-light text-gi-white mb-4">Coming Up</h2>
          <div className="space-y-3">
            {MODULE_ORDER.filter(moduleId => !progress[moduleId]?.started).slice(0, 3).map(moduleId => (
              <div key={moduleId} className="flex items-center justify-between py-2 border-b border-gi-slate/30 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🔒</span>
                  <span className="text-gi-horizon">{MODULE_LABELS[moduleId]}</span>
                </div>
                <span className="text-gi-mist text-sm">Locked</span>
              </div>
            ))}
          </div>
        </div>

        {/* 16 Habits House - Full width utilization */}
        <div className="mb-8">
          <h2 className="text-lg font-light text-gi-white mb-4">16 Habits House</h2>
          <div className="gi-card p-8">
            <div className="w-full">
              <HabitsHouseInline currentModuleId={currentModuleId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
