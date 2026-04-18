import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserTier } from '../contexts/UserTierContext';
import Navigation from '../components/Navigation';
import {
  getJournalEntries,
  calculateHabitAverages,
  getHabitCheckins,
  getCourseProgress,
  getCaseStudyReflection,
  getDailyPracticeLog,
  getPracticeSummary,
  getHabitInsights,
} from '../services/firestoreService';
import { habitsData } from '../data/habitsData';
import { habitColors, habitIcons } from '../data/dailyPractices';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer as RC2 } from 'recharts';

// ── Tab Components ────────────────────────────────────────────────────────────────

// ── Practice Tab ──────────────────────────────────────────────────────────────

function PracticeTab({ practiceLog, practiceSummary }) {
  const navigate = useNavigate();

  const formatDate = (val) => {
    if (!val) return '';
    let d = typeof val === 'string' ? new Date(val) : (val.toDate ? val.toDate() : new Date(val));
    const today = new Date();
    const diff = Math.floor((today - d) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Count by habitId for frequency chart
  const habitCounts = {};
  practiceLog.forEach(p => {
    if (p.habitId && p.habitId !== 'integration') {
      habitCounts[p.habitId] = (habitCounts[p.habitId] || 0) + 1;
    }
  });
  const chartData = Object.entries(habitCounts).map(([id, count]) => ({
    name: id.charAt(0).toUpperCase() + id.slice(1),
    count,
    habitId: id,
  }));

  const total = practiceSummary?.totalCompleted || 0;
  const lastDate = practiceSummary?.lastCompletedDate;

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="gi-card p-4 text-center">
          <p className="text-gi-horizon text-xs uppercase tracking-widest mb-1">Completed</p>
          <p className="text-3xl font-light text-gi-gold">{total}</p>
          <p className="text-gi-mist text-xs mt-0.5">practices</p>
        </div>
        <div className="gi-card p-4 text-center">
          <p className="text-gi-horizon text-xs uppercase tracking-widest mb-1">Last Practice</p>
          <p className="text-gi-white text-sm font-medium mt-1">{lastDate ? formatDate(lastDate) : '—'}</p>
        </div>
      </div>

      {/* Frequency chart */}
      {chartData.length > 0 && (
        <div className="gi-card p-5">
          <h3 className="text-base font-light text-gi-white mb-4">Practice Frequency</h3>
          <div className="space-y-3">
            {chartData.map(d => (
              <div key={d.habitId} className="flex items-center gap-3">
                <span className="text-base w-6 text-center">{habitIcons[d.habitId] || '✦'}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-gi-white text-xs font-medium">{d.name}</p>
                    <p className="text-gi-gold text-xs">{d.count}</p>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'rgba(74,100,120,0.3)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((d.count / Math.max(...chartData.map(x => x.count))) * 100, 100)}%`,
                        background: habitColors[d.habitId] || '#FFD559',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent practices */}
      <div className="gi-card p-5">
        <h3 className="text-base font-light text-gi-white mb-4">Recent Practices</h3>
        {practiceLog.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-4xl mb-3">🪞</p>
            <p className="text-gi-mist text-sm">No practices logged yet. Check the Home page to start!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {practiceLog.slice(0, 10).map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-gi"
                style={{
                  background: 'rgba(37,53,69,0.6)',
                  borderLeft: `3px solid ${habitColors[p.habitId] || '#4A6478'}`,
                }}
              >
                <span className="text-base mt-0.5">{habitIcons[p.habitId] || '✦'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-gi-white text-xs font-medium truncate">{p.habitName}</p>
                    <p className="text-gi-mist text-xs flex-shrink-0">{formatDate(p.date || p.completedAt)}</p>
                  </div>
                  <p className="text-gi-horizon text-xs italic truncate">"{p.prompt}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Habit Insights Section (used inside ProgressTab) ─────────────────────────

function HabitInsightsSection({ habitInsights, onViewAll }) {
  const truncate = (text, max = 90) =>
    text && text.length > max ? text.slice(0, max) + '…' : text;

  const formatDate = (val) => {
    if (!val) return '';
    const d = val.toDate ? val.toDate() : new Date(val);
    const diff = Math.floor((Date.now() - d) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const habitLabel = {
    hansei: 'Hansei (Self-Reflection)',
    humility: 'Humility (Stepping Back)',
    integrity: 'Integrity (Keeping Commitments)',
    respect: 'Respect (Seeing People)',
  };

  if (habitInsights.length === 0) return null;

  return (
    <div className="gi-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-light text-gi-white">Recent Habit Insights</h3>
        {habitInsights.length > 3 && (
          <button
            onClick={onViewAll}
            className="text-xs text-gi-gold hover:opacity-80 transition-opacity"
          >
            View All →
          </button>
        )}
      </div>
      <div className="space-y-3">
        {habitInsights.slice(0, 4).map((insight, i) => {
          const firstAnswer = insight.promptAnswers?.find(a => a.answer)?.answer;
          const color = habitColors[insight.habitId] || '#4AB3A0';
          return (
            <div
              key={i}
              className="p-3 rounded-gi"
              style={{
                background: 'rgba(37,53,69,0.6)',
                borderLeft: `3px solid ${color}`,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium" style={{ color }}>
                  {habitLabel[insight.habitId] || insight.habitName}
                </p>
                <p className="text-gi-mist text-xs">{formatDate(insight.createdAt)}</p>
              </div>
              {firstAnswer && (
                <p className="text-gi-horizon text-xs italic leading-relaxed">
                  "{truncate(firstAnswer)}"
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProgressTab({ habitAverages, timeRange, setTimeRange, habitInsights, onViewAllInsights }) {
  const getScoreColor = (average) => {
    if (average >= 4) return 'text-green-400';
    if (average >= 3) return 'text-yellow-400';
    return 'text-orange-400';
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

  if (Object.keys(habitAverages).length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📊</div>
        <p className="text-gi-white font-medium mb-2">No progress data yet</p>
        <p className="text-gi-horizon text-sm leading-relaxed">
          Complete daily habit check-ins to see your growth patterns
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Toggle */}
      <div className="flex space-x-2">
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

      {/* Radar Chart */}
      <div className="gi-card p-6">
        <h3 className="text-xl font-light text-gi-white mb-4">Habit Radar</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={prepareRadarData()}>
            <PolarGrid gridType="polygon" stroke="#4A6478" radialLines={true} />
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
      </div>

      {/* Habit Performance */}
      <div className="gi-card p-6">
        <h3 className="text-xl font-light text-gi-white mb-4">Habit Performance</h3>
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
                  <span className={`text-xs px-2 py-1 rounded-full ${getScoreColor(habit.average)}`}>
                    {habit.average >= 4 ? 'Strong' : habit.average >= 3 ? 'Growing' : 'Developing'}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Recent Habit Insights */}
      <HabitInsightsSection habitInsights={habitInsights || []} onViewAll={onViewAllInsights} />
    </div>
  );
}

function JournalTab({ entries, activeFilter, setActiveFilter, canAccessCompass }) {
  // Filter entries based on active filter
  const filteredEntries = activeFilter === 'all' 
    ? entries 
    : entries.filter(e => e.type === activeFilter);

  const ALL_FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'genba-moment', label: 'Moments' },
    { key: 'habit-insight', label: 'Habit Insights' },
    { key: 'daily-practice', label: 'Practices' },
    { key: 'stop-and-think', label: 'Reflections' },
    { key: 'case-study-reflection', label: 'Case Study' },
    { key: 'habit', label: 'Habits' },
    { key: 'intention', label: 'Intentions' },
    { key: 'bus', label: 'Bus', premium: true },
    { key: 'ikigai', label: 'Ikigai', premium: true },
  ];

  const getEntryIcon = (type) => {
    switch (type) {
      case 'habit': return '✓';
      case 'bus': return '🚌';
      case 'ikigai': return '🧭';
      case 'intention': return '🎯';
      case 'case-study-reflection': return '📖';
      case 'genba-moment': return '⬤';
      case 'stop-and-think': return '◈';
      case 'baseline': return '◎';
      case 'habit-insight': return '💡';
      case 'daily-practice': return '🪞';
      default: return '📔';
    }
  };

  const getEntryAccent = (type) => {
    switch (type) {
      case 'genba-moment': return '#FFD559';
      case 'stop-and-think': return '#4AB3A0';
      case 'baseline': return '#A78BFA';
      case 'case-study-reflection': return '#60A5FA';
      case 'habit-insight': return '#4AB3A0';
      case 'daily-practice': return '#8BA0B2';
      default: return null;
    }
  };

  const truncate = (text, max = 110) => {
    if (!text) return null;
    return text.length > max ? text.slice(0, max) + '…' : text;
  };

  const formatDate = (val) => {
    if (!val) return '';
    let d;
    if (val && val.toDate) d = val.toDate();
    else if (typeof val === 'string') d = new Date(val);
    else d = new Date(val);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: d.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  const EntryCard = ({ entry }) => {
    const accent = getEntryAccent(entry.type);
    const dateVal = entry.date || entry.createdAt || entry._sortKey;
    const text = entry.freeEntry || entry.reflection || entry.intention || entry.response || null;

    return (
      <div
        className="rounded-gi p-4 mb-3"
        style={{
          background: '#253545',
          border: `1px solid ${accent ? `${accent}22` : 'rgba(46,65,86,0.6)'}`,
          borderLeft: accent ? `3px solid ${accent}` : undefined,
        }}
      >
        <div className="flex items-start gap-3">
          <span
            className="text-base flex-shrink-0 mt-0.5"
            style={{ color: accent || '#8BA0B2' }}
          >
            {getEntryIcon(entry.type)}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <p className="text-gi-white text-sm font-medium leading-snug truncate">
                {entry.title || entry.displayName || entry.label || 'Journal Entry'}
              </p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-gi-mist text-xs">{formatDate(dateVal)}</p>
            </div>
            {text && (
              <p className="text-gi-horizon text-sm leading-relaxed italic">
                "{truncate(text)}"
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const visibleFilters = ALL_FILTERS.filter(f => !f.premium || canAccessCompass);

  return (
    <div className="space-y-6">
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {visibleFilters.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-all font-medium"
            style={{
              background: activeFilter === f.key ? '#FFD559' : 'rgba(37,53,69,0.8)',
              color: activeFilter === f.key ? '#0e1c28' : '#8BA0B2',
              border: activeFilter === f.key
                ? '1px solid transparent'
                : '1px solid rgba(74,100,120,0.4)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Entry list */}
      {filteredEntries.length > 0 ? (
        <div className="space-y-0">
          {filteredEntries.map((entry, i) => (
            <EntryCard key={`${entry.type}-${entry.id || i}`} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center py-12 px-4">
          <div className="text-4xl mb-4">📔</div>
          <p className="text-gi-white font-medium mb-2">No entries yet</p>
          <p className="text-gi-horizon text-sm leading-relaxed">
            Start capturing your leadership moments and reflections
          </p>
        </div>
      )}
    </div>
  );
}

function InsightsTab({ habitAverages, entries, progress }) {
  const getInsights = () => {
    const insights = [];
    
    // Habit insights
    const strongHabits = Object.values(habitAverages).filter(h => h.average >= 4);
    const developingHabits = Object.values(habitAverages).filter(h => h.average < 3);
    
    if (strongHabits.length > 0) {
      insights.push({
        type: 'strength',
        icon: '💪',
        title: 'Leadership Strengths',
        message: `You're excelling in ${strongHabits.length} habit${strongHabits.length > 1 ? 's' : ''}`,
        habits: strongHabits.map(h => h.habitName)
      });
    }
    
    if (developingHabits.length > 0) {
      insights.push({
        type: 'focus',
        icon: '🎯',
        title: 'Growth Opportunities',
        message: `Focus on ${developingHabits.length} habit${developingHabits.length > 1 ? 's' : ''} for development`,
        habits: developingHabits.map(h => h.habitName)
      });
    }
    
    // Journal insights
    const recentReflections = entries.filter(e => 
      e.type === 'genba-moment' || e.type === 'case-study-reflection'
    ).slice(0, 5);
    
    if (recentReflections.length > 0) {
      insights.push({
        type: 'reflection',
        icon: '📝',
        title: 'Recent Reflections',
        message: `${recentReflections.length} meaningful reflections captured`,
        count: recentReflections.length
      });
    }
    
    // Course progress insights
    const completedModules = Object.keys(progress).filter(key => progress[key]?.completed).length;
    if (completedModules > 0) {
      insights.push({
        type: 'progress',
        icon: '🎓',
        title: 'Learning Journey',
        message: `${completedModules} module${completedModules > 1 ? 's' : ''} completed`,
        completed: completedModules
      });
    }
    
    return insights;
  };

  const insights = getInsights();

  return (
    <div className="space-y-6">
      <div className="gi-card p-6">
        <h3 className="text-xl font-light text-gi-white mb-6">Learning Insights</h3>
        
        {insights.length > 0 ? (
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gi-slate/30 rounded-lg">
                <span className="text-2xl">{insight.icon}</span>
                <div className="flex-1">
                  <h4 className="text-gi-white font-medium mb-1">{insight.title}</h4>
                  <p className="text-gi-horizon text-sm mb-2">{insight.message}</p>
                  
                  {insight.habits && (
                    <div className="flex flex-wrap gap-1">
                      {insight.habits.map((habit, j) => (
                        <span key={j} className="text-xs px-2 py-1 rounded-full bg-gi-gold/20 text-gi-gold">
                          {habit}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gi-mist">Complete more activities to see personalized insights</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="gi-card p-6">
        <h3 className="text-xl font-light text-gi-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-3">
          <button className="w-full text-left p-3 bg-gi-slate/50 rounded-lg hover:bg-gi-slate/70 transition-colors">
            <span className="text-gi-gold">📖</span>
            <span className="text-gi-white ml-2">Review Case Study Reflections</span>
          </button>
          <button className="w-full text-left p-3 bg-gi-slate/50 rounded-lg hover:bg-gi-slate/70 transition-colors">
            <span className="text-gi-gold">✓</span>
            <span className="text-gi-white ml-2">Complete Daily Check-in</span>
          </button>
          <button className="w-full text-left p-3 bg-gi-slate/50 rounded-lg hover:bg-gi-slate/70 transition-colors">
            <span className="text-gi-gold">⬤</span>
            <span className="text-gi-white ml-2">Record Genba Moment</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────────

export default function LearningDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { canAccessCompass } = useUserTier();

  const [activeTab, setActiveTab] = useState('progress');
  const [timeRange, setTimeRange] = useState(30);
  const [habitAverages, setHabitAverages] = useState({});
  const [entries, setEntries] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [practiceLog, setPracticeLog] = useState([]);
  const [practiceSummary, setPracticeSummary] = useState({});
  const [habitInsights, setHabitInsights] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;

      try {
        const [averages, allEntries, courseProgress, log, summary, insights] = await Promise.all([
          calculateHabitAverages(currentUser.uid, timeRange),
          getJournalEntries(currentUser.uid),
          getCourseProgress(currentUser.uid),
          getDailyPracticeLog(currentUser.uid, 30),
          getPracticeSummary(currentUser.uid),
          getHabitInsights(currentUser.uid),
        ]);

        setHabitAverages(averages);
        setEntries(allEntries);
        setProgress(courseProgress);
        setPracticeLog(log);
        setPracticeSummary(summary);
        setHabitInsights(insights);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentUser, timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gi-deep pt-16 pb-6 flex items-center justify-center">
        <div className="text-gi-white">Loading your learning dashboard…</div>
      </div>
    );
  }

  const tabs = [
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'practice', label: 'Practice', icon: '🪞' },
    { id: 'journal',  label: 'Journal',  icon: '📝' },
    { id: 'insights', label: 'Insights', icon: '💡' },
  ];

  return (
    <div className="min-h-screen bg-gi-deep pt-16 pb-6">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-light text-gi-white mb-2 tracking-wide">
            Learning Dashboard
          </h1>
          <p className="text-gi-horizon">
            Track your growth and capture your leadership journey
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-0 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-3 text-sm font-medium transition-all relative flex-shrink-0"
              style={{
                color: activeTab === tab.id ? '#FFD559' : '#8BA0B2',
                borderBottom: activeTab === tab.id
                  ? '2px solid #FFD559'
                  : '2px solid rgba(74,100,120,0.3)',
                minWidth: '70px',
              }}
            >
              <span className="mr-1 text-base">{tab.icon}</span>
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'progress' && (
            <ProgressTab
              habitAverages={habitAverages}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              habitInsights={habitInsights}
              onViewAllInsights={() => setActiveTab('journal')}
            />
          )}

          {activeTab === 'practice' && (
            <PracticeTab
              practiceLog={practiceLog}
              practiceSummary={practiceSummary}
            />
          )}

          {activeTab === 'journal' && (
            <JournalTab
              entries={entries}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              canAccessCompass={canAccessCompass}
            />
          )}

          {activeTab === 'insights' && (
            <InsightsTab
              habitAverages={habitAverages}
              entries={entries}
              progress={progress}
            />
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
}
