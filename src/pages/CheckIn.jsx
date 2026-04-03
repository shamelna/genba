import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { habitsData } from '../data/habitsData';
import { saveHabitCheckin, getHabitCheckinByDate } from '../services/firestoreService';
import habitCheckinBg from '../../assets/habit-checkin-desk-bg.jpg';
import authorPortrait from '../../assets/author-mark-forkun-portrait.jpg';
import authorGenba from '../../assets/author-mark-forkun-genba.jpg';

export default function CheckIn() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [score, setScore] = useState(3);
  const [reflection, setReflection] = useState('');
  const [hanseiPrompt, setHanseiPrompt] = useState('');
  const [showCoachingTip, setShowCoachingTip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todayCheckin, setTodayCheckin] = useState(null);
  const [showLearnMore, setShowLearnMore] = useState(false);

  useEffect(() => {
    // Set today's habit (rotate through habits)
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const habitIndex = dayOfYear % habitsData.length;
    const habit = habitsData[habitIndex];
    setSelectedHabit(habit);
    
    // Set random hansei prompt
    const randomPrompt = habit.hanseiPrompts[Math.floor(Math.random() * habit.hanseiPrompts.length)];
    setHanseiPrompt(randomPrompt);

    // Check if already checked in today
    loadTodayCheckin();
  }, []);

  const loadTodayCheckin = async () => {
    if (!currentUser) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const checkin = await getHabitCheckinByDate(currentUser.uid, today);
      setTodayCheckin(checkin);
      if (checkin) {
        setShowCoachingTip(true);
      }
    } catch (error) {
      console.error('Error loading today\'s checkin:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHabit || loading) return;

    setLoading(true);
    try {
      await saveHabitCheckin(currentUser.uid, {
        habitIndex: selectedHabit.id,
        habitName: selectedHabit.name,
        score,
        reflection,
        prompt: hanseiPrompt
      });

      setShowCoachingTip(true);
      setTodayCheckin({
        habitName: selectedHabit.name,
        score,
        reflection
      });
    } catch (error) {
      console.error('Error saving checkin:', error);
      alert('Error saving checkin. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (value) => {
    if (value <= 2) return 'bg-gi-ember';
    if (value === 3) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  const getScoreLabel = (value) => {
    if (value <= 2) return 'Struggling';
    if (value === 3) return 'Progressing';
    return 'Leading';
  };

  if (!selectedHabit) {
    return (
      <div className="min-h-screen bg-gi-deep flex items-center justify-center">
        <div className="text-gi-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gi-deep pt-16 pb-6">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-8"
        style={{ backgroundImage: `url(${habitCheckinBg})` }}
      />
      <div className="fixed inset-0 bg-gi-deep/90" />
      
      <div className="relative z-10 px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-light text-gi-white mb-2 tracking-wide">
            Daily Check-in
          </h1>
          <p className="text-gi-horizon">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Habit Card */}
        <div className="gi-card p-6 mb-6">
          <h2 className="text-2xl font-light text-gi-gold mb-3 tracking-wide">
            {selectedHabit.name}
          </h2>
          <p className="text-gi-white leading-relaxed mb-4">
            {selectedHabit.essence}
          </p>

          {/* Author photo for Genchi Genbutsu */}
          {selectedHabit.id === 3 && (
            <div className="flex items-center mb-4 p-3 bg-gi-slate/50 rounded-lg">
              <img 
                src={authorGenba} 
                alt="Author at the Genba" 
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="text-gi-gold text-sm font-medium">Author at the Genba</p>
                <p className="text-gi-mist text-xs">Go and see for yourself</p>
              </div>
            </div>
          )}

          {/* Learn More */}
          <button
            onClick={() => setShowLearnMore(!showLearnMore)}
            className="text-gi-horizon hover:text-gi-white text-sm mb-4"
          >
            {showLearnMore ? 'Show Less' : 'Learn More'} →
          </button>

          {showLearnMore && (
            <div className="mt-4 p-4 bg-gi-slate/50 rounded-lg">
              <p className="text-gi-white text-sm leading-relaxed">
                {selectedHabit.coachingTip}
              </p>
              <blockquote className="mt-3 pt-3 border-t border-gi-horizon/30">
                <p className="text-gi-horizon text-xs italic">
                  "{selectedHabit.quote}"
                </p>
              </blockquote>
            </div>
          )}
        </div>

        {!showCoachingTip ? (
          <>
            {/* Score Slider */}
            <div className="gi-card p-6 mb-6">
              <h3 className="text-lg font-light text-gi-white mb-4">How did you do today?</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gi-mist mb-2">
                  <span>Struggling</span>
                  <span className="text-gi-gold font-medium">{getScoreLabel(score)}</span>
                  <span>Leading</span>
                </div>
                
                <div className="relative">
                  <div className="h-2 bg-gi-slate rounded-full">
                    <div 
                      className={`h-2 rounded-full transition-all ${getScoreColor(score)}`}
                      style={{ width: `${(score / 5) * 100}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  />
                </div>
                
                <div className="flex justify-between mt-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setScore(value)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        score === value 
                          ? 'bg-gi-gold border-gi-gold text-gi-deep' 
                          : 'border-gi-horizon text-gi-mist hover:border-gi-white'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hansei Prompt */}
            <div className="gi-card p-6 mb-6">
              <h3 className="text-lg font-light text-gi-white mb-3">Self-Reflection</h3>
              <p className="text-gi-horizon italic mb-4">
                {hanseiPrompt}
              </p>
            </div>

            {/* Reflection Text */}
            <div className="gi-card p-6 mb-6">
              <label className="block text-gi-white mb-2 text-sm uppercase tracking-wide">
                Optional Reflection (max 300 characters)
              </label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value.slice(0, 300))}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold resize-none"
                rows={4}
              />
              <p className="text-gi-mist text-xs mt-2 text-right">
                {reflection.length}/300
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full gi-button-primary disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Check-in'}
            </button>
          </>
        ) : (
          /* Coaching Tip Card */
          <div className="gi-card p-6 border-l-4 border-gi-gold">
            <div className="flex items-start mb-4">
              <img 
                src={authorPortrait} 
                alt="Mark Forkun" 
                className="w-12 h-12 rounded-full mr-3"
              />
              <div className="flex-1">
                <h3 className="text-lg font-light text-gi-gold mb-2">Coaching Tip</h3>
                <p className="text-gi-white leading-relaxed mb-3">
                  {selectedHabit.coachingTip}
                </p>
                <blockquote className="text-gi-horizon text-sm italic">
                  "{selectedHabit.quote}"
                </blockquote>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gi-slate/50 rounded-lg">
              <p className="text-gi-white text-center mb-3">
                Great job completing your check-in! You scored <span className="text-gi-gold font-medium">{score}/5</span> today.
              </p>
              <button
                onClick={() => navigate('/home')}
                className="w-full gi-button-primary"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
