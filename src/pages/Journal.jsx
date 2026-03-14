import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { useUserTier } from '../contexts/UserTierContext';
import { getJournalEntries } from '../services/firestoreService';
import bookSpineImage from '../../assets/book-spine-detail.jpg';
import bookDeskImage from '../../assets/book-open-desk.jpg';

export default function Journal() {
  const { canAccessCompass } = useUserTier();
  const [activeFilter, setActiveFilter] = useState('all');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJournalEntries();
  }, [activeFilter]);

  const loadJournalEntries = async () => {
    setLoading(true);
    try {
      // Mock user ID - in real app, get from auth context
      const userId = 'mock-user-id';
      const allEntries = await getJournalEntries(userId);
      
      // Filter entries based on selected filter
      const filteredEntries = activeFilter === 'all' 
        ? allEntries
        : allEntries.filter(entry => entry.type === activeFilter);
      
      setEntries(filteredEntries);
    } catch (error) {
      console.error('Error loading journal entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEntryIcon = (type) => {
    switch (type) {
      case 'habit': return '✓';
      case 'bus': return '🚌';
      case 'ikigai': return '🧭';
      case 'intention': return '🎯';
      default: return '📔';
    }
  };

  const getScoreColor = (score) => {
    if (!score) return 'gi-score-medium';
    if (score >= 4) return 'gi-score-high';
    if (score >= 3) return 'gi-score-medium';
    return 'gi-score-low';
  };

  const formatEntryDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'habit', label: 'Habits' },
    { key: 'bus', label: 'Bus', disabled: !canAccessCompass },
    { key: 'ikigai', label: 'Ikigai', disabled: !canAccessCompass },
    { key: 'intention', label: 'Intentions' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gi-deep flex items-center justify-center">
        <div className="text-gi-white">Loading journal entries...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gi-deep pb-20">
      {/* Header */}
      <div 
        className="relative px-4 py-6 mb-6"
        style={{
          backgroundImage: `url(${bookSpineImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-light text-gi-white mb-2 tracking-wide">
            Journal
          </h1>
          <p className="text-gi-horizon">
            Your journey of continuous improvement
          </p>
        </div>
      </div>

      <div className="px-4">
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => !filter.disabled && setActiveFilter(filter.key)}
              disabled={filter.disabled}
              className={`flex-shrink-0 py-2 px-4 rounded-lg font-medium transition-all ${
                activeFilter === filter.key
                  ? 'bg-gi-gold text-gi-deep'
                  : filter.disabled
                    ? 'bg-gi-slate text-gi-mist/50 cursor-not-allowed'
                    : 'bg-gi-slate text-gi-horizon hover:text-gi-white'
              }`}
            >
              {filter.label}
              {filter.disabled && ' 🔒'}
            </button>
          ))}
        </div>

        {/* Journal Entries */}
        {entries.length > 0 ? (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div key={`${entry.type}-${entry.date}-${index}`} className="gi-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getEntryIcon(entry.type)}</span>
                    <div>
                      <h3 className="text-gi-white font-medium">{entry.displayName}</h3>
                      <p className="text-gi-mist text-sm">{formatEntryDate(entry.date || entry.createdAt)}</p>
                    </div>
                  </div>
                  
                  {/* Score badge for habit entries */}
                  {entry.score && (
                    <span className={`gi-score-pill ${getScoreColor(entry.score)}`}>
                      {entry.score}/5
                    </span>
                  )}
                </div>

                {/* Entry content preview */}
                <div className="text-gi-white text-sm leading-relaxed">
                  {entry.reflection && (
                    <p className="mb-2 italic">"{truncateText(entry.reflection)}"</p>
                  )}
                  
                  {entry.intention && (
                    <p className="mb-2 italic">"{truncateText(entry.intention)}"</p>
                  )}

                  {entry.type === 'bus' && entry.response && (
                    <p className="mb-2 italic">"{truncateText(entry.response)}"</p>
                  )}

                  {entry.type === 'ikigai' && (
                    <p className="text-gi-horizon text-xs">
                      Ikigai map updated
                    </p>
                  )}
                </div>

                {/* Additional metadata */}
                {entry.habitName && (
                  <div className="mt-3 pt-3 border-t border-gi-horizon/20">
                    <p className="text-gi-mist text-xs">
                      Habit: {entry.habitName}
                    </p>
                  </div>
                )}

                {entry.busColour && (
                  <div className="mt-3 pt-3 border-t border-gi-horizon/20">
                    <p className="text-gi-mist text-xs">
                      Bus: {entry.busColour.charAt(0).toUpperCase() + entry.busColour.slice(1)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div 
            className="gi-card p-8 text-center"
            style={{
              backgroundImage: `url(${bookDeskImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
              backgroundOpacity: 0.2
            }}
          >
            <div className="relative z-10">
              <div className="text-6xl mb-4">📔</div>
              <h3 className="text-xl font-light text-gi-white mb-3">
                No entries yet
              </h3>
              <p className="text-gi-horizon mb-6">
                {activeFilter === 'all' 
                  ? 'Start your journey by completing your first check-in'
                  : `No ${activeFilter} entries found. Complete a ${activeFilter} check-in to see it here.`
                }
              </p>
              
              {/* Book quote */}
              <blockquote className="text-gi-mist text-sm italic max-w-md mx-auto">
                "The journey of a thousand miles begins with a single step."
              </blockquote>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        {entries.length > 0 && (
          <div className="gi-card p-6 mt-6">
            <h3 className="text-lg font-light text-gi-white mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-light text-gi-gold">
                  {entries.filter(e => e.type === 'habit').length}
                </p>
                <p className="text-gi-mist text-sm">Habit Check-ins</p>
              </div>
              
              {canAccessCompass && (
                <>
                  <div>
                    <p className="text-2xl font-light text-gi-gold">
                      {entries.filter(e => e.type === 'bus').length}
                    </p>
                    <p className="text-gi-mist text-sm">Bus Check-ins</p>
                  </div>
                  
                  <div>
                    <p className="text-2xl font-light text-gi-gold">
                      {entries.filter(e => e.type === 'ikigai').length}
                    </p>
                    <p className="text-gi-mist text-sm">Ikigai Updates</p>
                  </div>
                </>
              )}
              
              <div>
                <p className="text-2xl font-light text-gi-gold">
                  {entries.filter(e => e.type === 'intention').length}
                </p>
                <p className="text-gi-mist text-sm">Weekly Intentions</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
