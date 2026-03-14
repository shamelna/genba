import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserTier } from '../contexts/UserTierContext';
import Navigation from '../components/Navigation';
import { saveBusCheckin, saveIkigaiMap, saveWeeklyIntention, getBusCheckins, getIkigaiMap, getWeeklyIntentions } from '../services/firestoreService';
import { busReflectionPrompts } from '../data/habitsData';
import compassBg from '../../assets/ikigai-compass-background.jpg';
import redBusCard from '../../assets/red-bus-card.jpg';
import amberBusCard from '../../assets/amber-bus-card.jpg';
import greenBusCard from '../../assets/green-bus-card.jpg';
import ikigaiMapBg from '../../assets/ikigai-map-illustration.jpg';

export default function Compass() {
  const { currentUser } = useAuth();
  const { canAccessCompass } = useUserTier();
  const [activeTab, setActiveTab] = useState('bus');
  const [selectedBus, setSelectedBus] = useState('');
  const [busReflection, setBusReflection] = useState('');
  const [ikigaiData, setIkigaiData] = useState({
    sectionA: '',
    sectionB: '',
    sectionC: '',
    sectionD: ''
  });
  const [weeklyIntention, setWeeklyIntention] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Show locked state for basic users
  if (!canAccessCompass) {
    return (
      <div className="min-h-screen bg-gi-deep flex items-center justify-center px-4">
        <div className="gi-card p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🧭</div>
          <h2 className="text-2xl font-light text-gi-white mb-4">
            My Ikigai Compass
          </h2>
          <p className="text-gi-horizon mb-6 leading-relaxed">
            My Ikigai Compass is available to Premium members. 
            Contact your course provider to unlock this feature.
          </p>
          <button
            onClick={() => window.history.back()}
            className="gi-button-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleBusCheckin = async () => {
    if (!selectedBus) return;

    setLoading(true);
    try {
      await saveBusCheckin(currentUser.uid, {
        busColour: selectedBus,
        reflectionPrompt: busReflectionPrompts[selectedBus],
        response: busReflection
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setBusReflection('');
      setSelectedBus('');
    } catch (error) {
      console.error('Error saving bus checkin:', error);
      alert('Error saving check-in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleIkigaiSave = async () => {
    setLoading(true);
    try {
      await saveIkigaiMap(currentUser.uid, ikigaiData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving ikigai map:', error);
      alert('Error saving map. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWeeklyIntention = async () => {
    if (!weeklyIntention.trim()) return;

    setLoading(true);
    try {
      await saveWeeklyIntention(currentUser.uid, {
        intention: weeklyIntention,
        lived: null
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setWeeklyIntention('');
    } catch (error) {
      console.error('Error saving weekly intention:', error);
      alert('Error saving intention. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exportIkigaiSummary = () => {
    const summary = `
My Ikigai Compass Summary
========================

What I Love (at work):
${ikigaiData.sectionA}

What I'm Good At:
${ikigaiData.sectionB}

What the World Needs (from me at work):
${ikigaiData.sectionC}

What I'm Valued For:
${ikigaiData.sectionD}

Generated: ${new Date().toLocaleDateString()}
    `.trim();

    navigator.clipboard.writeText(summary);
    alert('Summary copied to clipboard!');
  };

  const busCards = [
    {
      color: 'red',
      title: 'Red Bus',
      description: 'Struggling - Need support and intervention',
      image: redBusCard,
      borderColor: 'border-gi-ember'
    },
    {
      color: 'amber',
      title: 'Amber Bus', 
      description: 'In transition - Moving toward improvement',
      image: amberBusCard,
      borderColor: 'border-yellow-600'
    },
    {
      color: 'green',
      title: 'Green Bus',
      description: 'Optimal - Performing well and helping others',
      image: greenBusCard,
      borderColor: 'border-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gi-deep pb-20">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url(${compassBg})` }}
      />
      <div className="fixed inset-0 bg-gi-deep/95" />
      
      <div className="relative z-10 px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-light text-gi-white mb-2 tracking-wide">
            My Ikigai Compass
          </h1>
          <p className="text-gi-horizon">
            Discover your purpose and align your daily work
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="gi-card p-4 mb-6 border-l-4 border-gi-gold">
            <p className="text-gi-white">✓ Saved successfully!</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          {['bus', 'ikigai', 'intention'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-gi-gold text-gi-deep'
                  : 'bg-gi-slate text-gi-horizon hover:text-gi-white'
              }`}
            >
              {tab === 'bus' ? 'Bus Check-in' : tab === 'ikigai' ? 'Ikigai Map' : 'Weekly Intention'}
            </button>
          ))}
        </div>

        {/* Bus Check-in Tab */}
        {activeTab === 'bus' && (
          <div>
            <div className="gi-card p-6 mb-6">
              <h2 className="text-xl font-light text-gi-white mb-4">How are you today?</h2>
              <p className="text-gi-horizon text-sm mb-6">
                Select the bus that represents your current state
              </p>
              
              <div className="space-y-4">
                {busCards.map((bus) => (
                  <button
                    key={bus.color}
                    onClick={() => setSelectedBus(bus.color)}
                    className={`w-full gi-card p-4 border-l-4 transition-all ${
                      selectedBus === bus.color ? bus.borderColor : 'border-transparent'
                    } hover:border-opacity-50`}
                    style={{
                      backgroundImage: `url(${bus.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundBlendMode: 'overlay'
                    }}
                  >
                    <div className="relative z-10 text-left">
                      <h3 className="text-lg font-light text-gi-white mb-1">{bus.title}</h3>
                      <p className="text-gi-horizon text-sm">{bus.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedBus && (
              <div className="gi-card p-6 mb-6">
                <h3 className="text-lg font-light text-gi-white mb-3">Reflection</h3>
                <p className="text-gi-horizon italic mb-4">
                  {busReflectionPrompts[selectedBus]}
                </p>
                <textarea
                  value={busReflection}
                  onChange={(e) => setBusReflection(e.target.value.slice(0, 200))}
                  placeholder="Share your thoughts (max 200 characters)..."
                  className="w-full px-4 py-3 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold resize-none"
                  rows={3}
                />
                <p className="text-gi-mist text-xs mt-2 text-right">
                  {busReflection.length}/200
                </p>
                <button
                  onClick={handleBusCheckin}
                  disabled={loading || !busReflection.trim()}
                  className="w-full gi-button-primary mt-4 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Check-in'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Ikigai Map Tab */}
        {activeTab === 'ikigai' && (
          <div>
            <div 
              className="gi-card p-6 mb-6 relative overflow-hidden"
              style={{
                backgroundImage: `url(${ikigaiMapBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay'
              }}
            >
              <div className="relative z-10">
                <h2 className="text-xl font-light text-gi-white mb-4">Your Ikigai Map</h2>
                <p className="text-gi-horizon text-sm mb-6">
                  Find your intersection of passion, mission, vocation, and profession
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="gi-card p-4">
                    <h3 className="text-gi-gold font-medium mb-2">What I Love</h3>
                    <textarea
                      value={ikigaiData.sectionA}
                      onChange={(e) => setIkigaiData({...ikigaiData, sectionA: e.target.value})}
                      placeholder="At work..."
                      className="w-full px-3 py-2 bg-gi-water/10 border border-gi-horizon/30 rounded text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold resize-none text-sm"
                      rows={3}
                    />
                  </div>

                  <div className="gi-card p-4">
                    <h3 className="text-gi-gold font-medium mb-2">What I'm Good At</h3>
                    <textarea
                      value={ikigaiData.sectionB}
                      onChange={(e) => setIkigaiData({...ikigaiData, sectionB: e.target.value})}
                      placeholder="My strengths..."
                      className="w-full px-3 py-2 bg-gi-water/10 border border-gi-horizon/30 rounded text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold resize-none text-sm"
                      rows={3}
                    />
                  </div>

                  <div className="gi-card p-4">
                    <h3 className="text-gi-gold font-medium mb-2">What the World Needs</h3>
                    <textarea
                      value={ikigaiData.sectionC}
                      onChange={(e) => setIkigaiData({...ikigaiData, sectionC: e.target.value})}
                      placeholder="From me at work..."
                      className="w-full px-3 py-2 bg-gi-water/10 border border-gi-horizon/30 rounded text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold resize-none text-sm"
                      rows={3}
                    />
                  </div>

                  <div className="gi-card p-4">
                    <h3 className="text-gi-gold font-medium mb-2">What I'm Valued For</h3>
                    <textarea
                      value={ikigaiData.sectionD}
                      onChange={(e) => setIkigaiData({...ikigaiData, sectionD: e.target.value})}
                      placeholder="Recognition I receive..."
                      className="w-full px-3 py-2 bg-gi-water/10 border border-gi-horizon/30 rounded text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold resize-none text-sm"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gi-slate/50 rounded-lg text-center">
                  <p className="text-gi-gold font-medium mb-2">Your Ikigai</p>
                  <p className="text-gi-white text-sm">
                    The intersection where all four areas meet
                  </p>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleIkigaiSave}
                    disabled={loading}
                    className="flex-1 gi-button-primary disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Map'}
                  </button>
                  <button
                    onClick={exportIkigaiSummary}
                    className="gi-button-secondary"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Intention Tab */}
        {activeTab === 'intention' && (
          <div className="gi-card p-6">
            <h2 className="text-xl font-light text-gi-white mb-4">Weekly Intention</h2>
            <p className="text-gi-horizon text-sm mb-6">
              "This week, I will serve my team by..."
            </p>

            <textarea
              value={weeklyIntention}
              onChange={(e) => setWeeklyIntention(e.target.value.slice(0, 150))}
              placeholder="Set your intention for this week (max 150 characters)..."
              className="w-full px-4 py-3 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold resize-none"
              rows={3}
            />
            <p className="text-gi-mist text-xs mt-2 text-right">
              {weeklyIntention.length}/150
            </p>

            <button
              onClick={handleWeeklyIntention}
              disabled={loading || !weeklyIntention.trim()}
              className="w-full gi-button-primary mt-4 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Set Intention'}
            </button>

            {/* Past Intentions */}
            <div className="mt-8">
              <h3 className="text-lg font-light text-gi-white mb-4">Past Intentions</h3>
              <p className="text-gi-mist text-sm">
                Your weekly intentions history will appear here
              </p>
            </div>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
