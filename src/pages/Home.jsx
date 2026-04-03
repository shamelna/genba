import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserTier } from '../contexts/UserTierContext';
import Navigation from '../components/Navigation';
import CourseJourneyCard from '../components/CourseJourneyCard';
import HabitsHouseInline from '../components/HabitsHouseInline';
import { habitsData, dailyReflectionPrompts } from '../data/habitsData';
import { calculateStreak, getHabitCheckinByDate, getCourseProgress } from '../services/firestoreService';
import { MODULE_ORDER } from '../data/caseStudies';
import singleStoneImage from '../../assets/single-stone-card.jpg';
import bookDeskImage from '../../assets/book-open-desk.jpg';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isPremium } = useUserTier();

  const [greeting, setGreeting] = useState('');
  const [todayHabit, setTodayHabit] = useState(null);
  const [streak, setStreak] = useState(0);
  const [todayCheckin, setTodayCheckin] = useState(null);
  const [weeklyIntention, setWeeklyIntention] = useState(null);
  const [reflectionPrompt, setReflectionPrompt] = useState('');
  // Daily practice drawer — collapsed by default so Course Journey stays hero
  const [showDaily, setShowDaily] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    setTodayHabit(habitsData[dayOfYear % habitsData.length]);

    const randomPrompt = dailyReflectionPrompts[Math.floor(Math.random() * dailyReflectionPrompts.length)];
    setReflectionPrompt(randomPrompt);

    loadUserData();
  }, [currentUser]);

  const loadUserData = async () => {
    if (!currentUser) return;
    try {
      const [userStreak, courseProgress] = await Promise.all([
        calculateStreak(currentUser.uid),
        getCourseProgress(currentUser.uid),
      ]);
      setStreak(userStreak);

      // Determine which module is currently active
      const activeId = MODULE_ORDER.find(id => !courseProgress?.[id]?.completed)
        || MODULE_ORDER[MODULE_ORDER.length - 1];
      setCurrentModuleId(activeId);

      const today = new Date().toISOString().split('T')[0];
      const checkin = await getHabitCheckinByDate(currentUser.uid, today);
      setTodayCheckin(checkin);
    } catch (error) {
      setStreak(0);
      setTodayCheckin(null);
      setWeeklyIntention(null);
    }
  };

  const getFirstName = (name) => name ? name.split(' ')[0] : 'Leader';

  return (
    <div className="min-h-screen bg-gi-deep pt-16 pb-6">
      <div className="px-4 pt-6 pb-2">
        {/* Greeting — lighter weight now that journey card is the hero */}
        <p className="text-gi-horizon text-sm uppercase tracking-widest mb-1">
          {greeting}
        </p>
        <h1 className="text-2xl font-light text-gi-white mb-6 tracking-wide">
          {getFirstName(currentUser?.displayName)}
        </h1>

        {/* ── HERO: Course Journey Card ── */}
        {!isPremium && (
          <CourseJourneyCard
            onboardingComplete={!!currentUser?.onboardingComplete}
            hero
          />
        )}

        {/* ── 16 HABITS HOUSE ── */}
        <div
          className="mb-4 rounded-gi overflow-hidden"
          style={{
            background: '#1C2B3A',
            border: '1px solid rgba(46,65,86,0.7)',
            padding: '12px 10px 10px',
          }}
        >
          <HabitsHouseInline currentModuleId={currentModuleId} />
        </div>

        {/* ── DAILY PRACTICE DRAWER ── */}
        <div className="mb-4">
          {/* Toggle row — always visible, shows glanceable stats */}
          <button
            onClick={() => setShowDaily(v => !v)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-gi transition-colors"
            style={{
              background: showDaily ? '#253545' : 'transparent',
              border: '1px solid rgba(74, 100, 120, 0.4)',
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-gi-horizon text-xs uppercase tracking-widest">
                Daily Practice
              </span>
              {/* Glanceable stat pills */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs text-gi-mist">
                  🔥 <span className="text-gi-gold font-medium">{streak}</span>
                </span>
                {todayCheckin ? (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-700/30 text-green-400 border border-green-700/40">
                    ✓ Done
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gi-slate text-gi-mist border border-gi-mist/20">
                    Check in
                  </span>
                )}
              </div>
            </div>
            <span
              className="text-gi-mist text-sm transition-transform duration-200"
              style={{ transform: showDaily ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}
            >
              ↓
            </span>
          </button>

          {/* Collapsible content */}
          {showDaily && (
            <div className="mt-3 flex flex-col gap-4">

              {/* Today's Habit */}
              {todayHabit && (
                <div
                  className="gi-card p-5 relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${singleStoneImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay',
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-gi-horizon text-xs uppercase tracking-widest">Today's Habit</p>
                      {todayCheckin && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-700/40 text-green-400 border border-green-700/50">
                          ✓ Done
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-light text-gi-gold mb-1">{todayHabit.name}</h3>
                    <p className="text-gi-white text-sm leading-relaxed opacity-90">{todayHabit.essence}</p>
                    {!todayCheckin && (
                      <button
                        onClick={() => navigate('/checkin')}
                        className="mt-4 bg-gi-gold text-gi-deep font-semibold px-5 py-2 rounded-gi hover:opacity-90 transition-opacity text-sm"
                      >
                        Check In Now
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Streak — full width; Bus card only for premium */}
              <div className={`grid gap-3 ${isPremium ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <div className="gi-card p-4">
                  <p className="text-gi-horizon text-xs uppercase tracking-wide mb-2">Streak</p>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-light text-gi-gold leading-none">{streak}</p>
                    <p className="text-gi-mist text-xs mb-0.5">days</p>
                  </div>
                  <div className="text-2xl mt-2">🔥</div>
                </div>

                {isPremium && (
                  <div className="gi-card p-4">
                    <p className="text-gi-horizon text-xs uppercase tracking-wide mb-2">Bus Check-in</p>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { label: 'Red', color: '#C0392B' },
                        { label: 'Amber', color: '#B45309' },
                        { label: 'Green', color: '#15803D' },
                      ].map(({ label, color }) => (
                        <button
                          key={label}
                          onClick={() => navigate('/compass')}
                          className="text-xs py-1 px-2 rounded text-left transition-all hover:opacity-80"
                          style={{ border: `1px solid ${color}`, color, background: `${color}18` }}
                        >
                          {label} Bus
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Weekly Intention */}
              {weeklyIntention ? (
                <div className="gi-card p-5">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-gi-horizon text-xs uppercase tracking-widest">This Week's Intention</p>
                    <button onClick={() => navigate('/compass')} className="text-gi-horizon hover:text-gi-white text-xs">
                      Edit
                    </button>
                  </div>
                  <p className="text-gi-white italic text-sm">"{weeklyIntention.intention}"</p>
                </div>
              ) : (
                <div className="gi-card p-5 flex items-center justify-between">
                  <div>
                    <p className="text-gi-horizon text-xs uppercase tracking-widest mb-1">Weekly Intention</p>
                    <p className="text-gi-mist text-sm">Set your focus for this week</p>
                  </div>
                  <button
                    onClick={() => navigate('/compass')}
                    className="text-gi-gold text-sm border border-gi-gold/40 px-3 py-1.5 rounded-gi hover:bg-gi-gold/10 transition-colors flex-shrink-0 ml-4"
                  >
                    Set →
                  </button>
                </div>
              )}

              {/* Daily Reflection Prompt */}
              <div
                className="gi-card p-5 relative overflow-hidden"
                style={{
                  backgroundImage: `url(${bookDeskImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundBlendMode: 'overlay',
                }}
              >
                <div className="relative z-10">
                  <p className="text-gi-horizon text-xs uppercase tracking-widest mb-2">Daily Reflection</p>
                  <p className="text-gi-white italic text-sm leading-relaxed">
                    {reflectionPrompt}
                  </p>
                </div>
              </div>


            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
}
