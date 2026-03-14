import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserTier } from '../contexts/UserTierContext';
import Navigation from '../components/Navigation';
import { habitsData, dailyReflectionPrompts } from '../data/habitsData';
import { calculateStreak, getHabitCheckinByDate } from '../services/firestoreService';
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

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Set today's habit (rotate through habits)
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const habitIndex = dayOfYear % habitsData.length;
    setTodayHabit(habitsData[habitIndex]);

    // Set random reflection prompt
    const randomPrompt = dailyReflectionPrompts[Math.floor(Math.random() * dailyReflectionPrompts.length)];
    setReflectionPrompt(randomPrompt);

    // Load user data
    loadUserData();
  }, [currentUser]);

  const loadUserData = async () => {
    if (!currentUser) return;

    try {
      // Get streak
      const userStreak = await calculateStreak(currentUser.uid);
      setStreak(userStreak);

      // Check today's checkin
      const today = new Date().toISOString().split('T')[0];
      const checkin = await getHabitCheckinByDate(currentUser.uid, today);
      setTodayCheckin(checkin);

      // TODO: Load weekly intention
      // const intention = await getWeeklyIntention(currentUser.uid);
      // setWeeklyIntention(intention);
      
      console.log('User data loaded successfully from Firestore');
    } catch (error) {
      console.log('Firestore data loading failed, using defaults:', error.message);
      // Set default values when Firestore is unavailable
      setStreak(0);
      setTodayCheckin(null);
      setWeeklyIntention(null);
    }
  };

  const getFirstName = (displayName) => {
    if (!displayName) return 'Leader';
    return displayName.split(' ')[0];
  };

  return (
    <div className="min-h-screen bg-gi-deep pb-20">
      <div className="px-4 py-6">
        {/* Greeting */}
        <h1 className="text-3xl font-light text-gi-white mb-6 tracking-wide">
          {greeting}, {getFirstName(currentUser?.displayName)}
        </h1>

        {/* Today's Habit Card */}
        {todayHabit && (
          <div 
            className="gi-card p-6 mb-6 relative overflow-hidden"
            style={{
              backgroundImage: `url(${singleStoneImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-light text-gi-white">Today's Habit</h2>
                {todayCheckin && (
                  <span className="gi-score-pill gi-score-high">✓ Done</span>
                )}
              </div>
              <h3 className="text-2xl font-light text-gi-gold mb-2">{todayHabit.name}</h3>
              <p className="text-gi-white text-sm leading-relaxed">{todayHabit.essence}</p>
              {!todayCheckin && (
                <button
                  onClick={() => navigate('/checkin')}
                  className="mt-4 gi-button-primary text-sm"
                >
                  Check In Now
                </button>
              )}
            </div>
          </div>
        )}

        {/* Streak Counter */}
        <div className="gi-card p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gi-horizon text-sm uppercase tracking-wide mb-1">Current Streak</p>
              <p className="text-3xl font-light text-gi-gold">{streak}</p>
              <p className="text-gi-mist text-sm">days in a row</p>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
        </div>

        {/* Bus Check-in Shortcut */}
        <div className="gi-card p-6 mb-6">
          <h3 className="text-lg font-light text-gi-white mb-3">Quick Check-in</h3>
          <p className="text-gi-horizon text-sm mb-4">How are you feeling today?</p>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => navigate('/compass')}
              className="p-3 rounded-lg border-2 border-gi-ember text-gi-ember hover:bg-gi-ember hover:text-gi-white transition-colors"
            >
              Red Bus
            </button>
            <button
              onClick={() => navigate('/compass')}
              className="p-3 rounded-lg border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-gi-white transition-colors"
            >
              Amber Bus
            </button>
            <button
              onClick={() => navigate('/compass')}
              className="p-3 rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-gi-white transition-colors"
            >
              Green Bus
            </button>
          </div>
        </div>

        {/* Weekly Intention */}
        {weeklyIntention ? (
          <div className="gi-card p-6 mb-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-light text-gi-white">This Week's Intention</h3>
              <button
                onClick={() => navigate('/compass')}
                className="text-gi-horizon hover:text-gi-white text-sm"
              >
                Edit
              </button>
            </div>
            <p className="text-gi-white italic">"{weeklyIntention.intention}"</p>
            <div className="mt-3">
              <span className={`gi-score-pill ${
                weeklyIntention.lived === 'yes' ? 'gi-score-high' :
                weeklyIntention.lived === 'partially' ? 'gi-score-medium' :
                'gi-score-low'
              }`}>
                {weeklyIntention.lived || 'Not set'}
              </span>
            </div>
          </div>
        ) : (
          <div className="gi-card p-6 mb-6">
            <h3 className="text-lg font-light text-gi-white mb-3">Weekly Intention</h3>
            <p className="text-gi-horizon text-sm mb-4">Set your intention for this week</p>
            <button
              onClick={() => navigate('/compass')}
              className="gi-button-secondary text-sm"
            >
              Set Intention
            </button>
          </div>
        )}

        {/* Daily Reflection Prompt */}
        <div 
          className="gi-card p-6 mb-6 relative overflow-hidden"
          style={{
            backgroundImage: `url(${bookDeskImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="relative z-10">
            <h3 className="text-lg font-light text-gi-white mb-3">Daily Reflection</h3>
            <p className="text-gi-white italic text-sm leading-relaxed">
              {reflectionPrompt}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => navigate('/checkin')}
            className="gi-card p-4 text-center hover:bg-[#2E4156] transition-colors"
          >
            <div className="text-2xl mb-2">✓</div>
            <p className="text-gi-white text-xs">Today's Check-in</p>
          </button>
          <button
            onClick={() => navigate('/progress')}
            className="gi-card p-4 text-center hover:bg-[#2E4156] transition-colors"
          >
            <div className="text-2xl mb-2">📊</div>
            <p className="text-gi-white text-xs">My Progress</p>
          </button>
          <button
            onClick={() => navigate('/journal')}
            className="gi-card p-4 text-center hover:bg-[#2E4156] transition-colors"
          >
            <div className="text-2xl mb-2">📔</div>
            <p className="text-gi-white text-xs">Journal</p>
          </button>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
