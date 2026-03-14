import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserTier } from '../contexts/UserTierContext';
import heroBook from '../../assets/hero-book-floating-water.jpg';
import book3d from '../../assets/book-3d-mockup-editorial.jpg';
import authorCoachingImage from '../../assets/author-mark-forkun-coaching.jpg';

export default function Onboarding() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [userName, setUserName] = useState('');
  const { currentUser, updateUserProfile } = useAuth();
  const { isPremium } = useUserTier();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.displayName) {
      setUserName(currentUser.displayName);
    }
  }, [currentUser]);

  useEffect(() => {
    console.log('Onboarding - currentUser:', currentUser);
    console.log('Onboarding - onboardingComplete:', currentUser?.onboardingComplete);
    if (currentUser?.onboardingComplete) {
      console.log('Onboarding complete, navigating to home');
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const handleCompleteOnboarding = async () => {
    try {
      console.log('Completing onboarding for user:', currentUser.uid);
      console.log('Setting displayName:', userName);
      
      if (!currentUser || !currentUser.uid) {
        console.error('No current user or UID found');
        return;
      }
      
      // Set a timeout to ensure navigation happens even if Firestore hangs
      const navigationTimeout = setTimeout(() => {
        console.log('Timeout reached, forcing navigation to home');
        navigate('/home');
      }, 3000);
      
      await updateUserProfile(currentUser.uid, {
        displayName: userName,
        onboardingComplete: true
      });
      
      clearTimeout(navigationTimeout);
      console.log('Onboarding completed successfully, navigating to home');
      navigate('/home');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      // Still navigate even if Firestore fails
      console.log('Navigating to home despite Firestore error');
      navigate('/home');
    }
  };

  const renderScreen1 = () => (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gi-deep via-gi-slate to-gi-deep" />
      
      <div className="relative z-10 w-full max-w-lg mx-4 text-center px-6">
        {/* Book Image */}
        <div className="mb-8">
          <img 
            src={book3d} 
            alt="Genba Ikigai Book" 
            className="w-48 h-auto mx-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-light tracking-wider text-gi-white mb-4">
          Genba Ikigai
        </h1>
        
        <p className="text-gi-horizon text-lg mb-8 leading-relaxed">
          Leading to Serve - A companion app for your journey of continuous improvement and servant leadership
        </p>

        <button
          onClick={() => setCurrentScreen(2)}
          className="gi-button-primary text-lg px-8 py-4"
        >
          Begin My Journey
        </button>
      </div>
    </div>
  );

  const renderScreen2 = () => (
    <div className="min-h-screen bg-gi-deep flex items-center justify-center">
      <div className="w-full max-w-lg mx-4 px-6">
        <h2 className="text-3xl font-light text-gi-white mb-6 text-center tracking-wide">
          Welcome to Your Journey
        </h2>

        {/* Author Image */}
        <div className="mb-6">
          <img 
            src={authorCoachingImage} 
            alt="Mark Forkun Coaching" 
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gi-gold/20"
          />
        </div>

        {/* Name Input */}
        <div className="gi-card p-6 mb-6">
          <label className="block text-gi-white mb-2 text-sm uppercase tracking-wide">
            Your Name
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold"
          />
        </div>

        {/* Introduction Card */}
        <div className="gi-card p-6 mb-6">
          <p className="text-gi-white leading-relaxed mb-4">
            This app is designed to support your journey through the 16 habits of lean leadership. 
            Each day, you'll reflect on practices that build humility, service, and continuous improvement.
          </p>
          <p className="text-gi-horizon text-sm italic">
            "Leadership is not about being in charge. It's about taking care of those in your charge."
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentScreen(1)}
            className="flex-1 gi-button-secondary"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentScreen(3)}
            disabled={!userName.trim()}
            className="flex-1 gi-button-primary disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  const renderScreen3 = () => (
    <div className="min-h-screen bg-gi-deep flex items-center justify-center">
      <div className="w-full max-w-lg mx-4 px-6">
        <h2 className="text-3xl font-light text-gi-white mb-6 text-center tracking-wide">
          {isPremium ? 'Your Complete Journey' : 'Start with 16 Habits'}
        </h2>

        {/* Features Overview */}
        <div className="space-y-4 mb-8">
          <div className="gi-card p-6">
            <h3 className="text-xl font-light text-gi-gold mb-3">
              16 Habits Daily Coach
            </h3>
            <p className="text-gi-white leading-relaxed">
              Daily check-ins for the 16 fundamental habits of lean leadership. 
              Each habit includes reflection prompts, coaching tips, and progress tracking.
            </p>
          </div>

          {isPremium && (
            <div className="gi-card p-6 border-l-4 border-gi-gold">
              <h3 className="text-xl font-light text-gi-gold mb-3">
                My Ikigai Compass
              </h3>
              <p className="text-gi-white leading-relaxed">
                Discover your purpose through the Bus Check-in system and Ikigai Map. 
                Align your daily work with your deeper calling and values.
              </p>
            </div>
          )}

          <div className="gi-card p-6">
            <h3 className="text-xl font-light text-gi-gold mb-3">
              Progress & Journal
            </h3>
            <p className="text-gi-white leading-relaxed">
              Track your growth over time with visual progress charts and maintain 
              a personal journal of your leadership journey.
            </p>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mb-8">
          <p className="text-gi-horizon italic">
            "The journey of a thousand miles begins with a single step."
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentScreen(2)}
            className="flex-1 gi-button-secondary"
          >
            Back
          </button>
          <button
            onClick={handleCompleteOnboarding}
            className="flex-1 gi-button-primary"
          >
            I'm Ready
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentScreen === 1 && renderScreen1()}
      {currentScreen === 2 && renderScreen2()}
      {currentScreen === 3 && renderScreen3()}
    </>
  );
}
