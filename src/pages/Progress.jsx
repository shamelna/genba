import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { calculateHabitAverages, getHabitCheckins } from '../services/firestoreService';
import { habitsData } from '../data/habitsData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function Progress() {
  const [timeRange, setTimeRange] = useState(30);
  const [habitAverages, setHabitAverages] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    loadProgressData();
  }, [timeRange]);

  const loadProgressData = async () => {
    setLoading(true);
    try {
      // Mock user ID - in real app, get from auth context
      const userId = 'mock-user-id';
      const averages = await calculateHabitAverages(userId, timeRange);
      setHabitAverages(averages);
      
      // Check for celebration (first time averaging 4+)
      const highAverages = Object.values(averages).filter(h => h.average >= 4);
      if (highAverages.length > 0 && timeRange === 30) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 5000);
      }
    } catch (error) {
      console.error('Error loading progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (average) => {
    if (average >= 4) return 'gi-score-high';
    if (average >= 3) return 'gi-score-medium';
    return 'gi-score-low';
  };

  const prepareRadarData = () => {
    return Object.values(habitAverages).map(habit => ({
      habit: habit.habitName,
      score: habit.average,
      fullMark: 5
    }));
  };

  const timeRanges = [
    { label: '30 Days', value: 30 },
    { label: '60 Days', value: 60 },
    { label: '90 Days', value: 90 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gi-deep flex items-center justify-center">
        <div className="text-gi-white">Loading progress data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gi-deep pt-16 pb-6">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-light text-gi-white mb-2 tracking-wide">
            My Progress
          </h1>
          <p className="text-gi-horizon">
            Track your growth across the 16 habits
          </p>
        </div>

        {/* Time Range Toggle */}
        <div className="flex space-x-2 mb-6">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                timeRange === range.value
                  ? 'bg-gi-gold text-gi-deep'
                  : 'bg-gi-slate text-gi-horizon hover:text-gi-white'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Celebration Toast */}
        {showCelebration && (
          <div className="gi-card p-4 mb-6 border-l-4 border-gi-gold">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🎉</span>
              <div>
                <p className="text-gi-gold font-medium">Congratulations!</p>
                <p className="text-gi-white text-sm">
                  You're averaging 4+ on multiple habits. Keep up the great work!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Radar Chart */}
        <div className="gi-card p-6 mb-6">
          <h2 className="text-xl font-light text-gi-white mb-4">Habit Radar</h2>
          {Object.keys(habitAverages).length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={prepareRadarData()}>
                <PolarGrid 
                  gridType="polygon" 
                  stroke="#4A6478" 
                  radialLines={true}
                />
                <PolarAngleAxis 
                  dataKey="habit" 
                  tick={{ fill: '#7A9BB0', fontSize: 10 }}
                  className="text-xs"
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 5]}
                  tick={{ fill: '#4A6478', fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#FFD559"
                  fill="rgba(255, 213, 89, 0.15)"
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12">
              <p className="text-gi-mist">No data available for this time period</p>
              <p className="text-gi-horizon text-sm mt-2">Complete more check-ins to see your progress</p>
            </div>
          )}
        </div>

        {/* Habit List */}
        <div className="gi-card p-6">
          <h2 className="text-xl font-light text-gi-white mb-4">Habit Performance</h2>
          {Object.keys(habitAverages).length > 0 ? (
            <div className="space-y-3">
              {Object.values(habitAverages)
                .sort((a, b) => b.average - a.average)
                .map((habit) => (
                  <div key={habit.habitName} className="flex items-center justify-between p-3 bg-gi-slate/50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-gi-white font-medium">{habit.habitName}</p>
                      <p className="text-gi-mist text-sm">{habit.count} check-ins</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gi-gold font-medium">
                        {habit.average.toFixed(1)}/5
                      </span>
                      <span className={`gi-score-pill ${getScoreColor(habit.average)}`}>
                        {habit.average >= 4 ? 'Strong' : habit.average >= 3 ? 'Growing' : 'Developing'}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gi-mist">No check-ins completed yet</p>
              <p className="text-gi-horizon text-sm mt-2">Start your daily check-ins to track progress</p>
            </div>
          )}
        </div>

        {/* Insights */}
        {Object.keys(habitAverages).length > 0 && (
          <div className="gi-card p-6 mt-6">
            <h2 className="text-xl font-light text-gi-white mb-4">Insights</h2>
            <div className="space-y-3">
              {Object.values(habitAverages).filter(h => h.average >= 4).length > 0 && (
                <div className="flex items-start">
                  <span className="text-gi-gold mr-2">💪</span>
                  <p className="text-gi-white text-sm">
                    You're excelling in {Object.values(habitAverages).filter(h => h.average >= 4).length} habit(s)
                  </p>
                </div>
              )}
              {Object.values(habitAverages).filter(h => h.average < 3).length > 0 && (
                <div className="flex items-start">
                  <span className="text-gi-horizon mr-2">🎯</span>
                  <p className="text-gi-white text-sm">
                    Focus on {Object.values(habitAverages).filter(h => h.average < 3).length} habit(s) that need more attention
                  </p>
                </div>
              )}
              <div className="flex items-start">
                <span className="text-gi-horizon mr-2">📈</span>
                <p className="text-gi-white text-sm">
                  Consistency is key - keep up your daily practice!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
