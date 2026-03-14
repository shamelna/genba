import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserTier } from '../contexts/UserTierContext';
import { useNotif } from '../contexts/NotifContext';
import Navigation from '../components/Navigation';
import book3dImage from '../../assets/book-3d-mockup-editorial.jpg';
import authorPortrait from '../../assets/author-mark-forkun-portrait.jpg';

export default function Settings() {
  const { currentUser, logout, updateUserProfile } = useAuth();
  const { tier, isAdmin } = useUserTier();
  const { unreadNotification, markNotificationAsRead } = useNotif();
  const [displayName, setDisplayName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.displayName) {
      setDisplayName(currentUser.displayName);
    }
  }, [currentUser]);

  const handleUpdateName = async () => {
    if (!displayName.trim() || loading) return;

    setLoading(true);
    try {
      await updateUserProfile(currentUser.uid, { displayName });
      setEditingName(false);
    } catch (error) {
      console.error('Error updating name:', error);
      alert('Error updating name. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getTierBadgeColor = () => {
    switch (tier) {
      case 'premium': return 'border-gi-gold';
      case 'admin': return 'border-gi-gold';
      default: return 'border-gi-horizon';
    }
  };

  const getTierLabel = () => {
    switch (tier) {
      case 'premium': return 'PREMIUM';
      case 'admin': return 'ADMIN';
      default: return 'BASIC';
    }
  };

  return (
    <div className="min-h-screen bg-gi-deep pb-20">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-light text-gi-white mb-2 tracking-wide">
            Settings
          </h1>
          <p className="text-gi-horizon">
            Manage your profile and preferences
          </p>
        </div>

        {/* Profile Section */}
        <div className="gi-card p-6 mb-6">
          <h2 className="text-xl font-light text-gi-white mb-4">Profile</h2>
          
          {/* Profile Photo */}
          {currentUser?.photoURL && (
            <div className="flex justify-center mb-6">
              <img 
                src={currentUser.photoURL} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-gi-slate"
              />
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gi-white mb-2 text-sm uppercase tracking-wide">
              Display Name
            </label>
            {editingName ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white focus:outline-none focus:border-gi-gold"
                />
                <button
                  onClick={handleUpdateName}
                  disabled={loading}
                  className="gi-button-primary px-4 py-2 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setEditingName(false);
                    setDisplayName(currentUser.displayName || '');
                  }}
                  className="gi-button-secondary px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-gi-white">{displayName || 'Not set'}</p>
                <button
                  onClick={() => setEditingName(true)}
                  className="text-gi-horizon hover:text-gi-white text-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gi-white mb-2 text-sm uppercase tracking-wide">
              Email
            </label>
            <p className="text-gi-horizon">
              {currentUser?.email || 'Not available'}
              {currentUser?.authMethod === 'google' && ' (Google)'}
            </p>
          </div>

          {/* Tier Badge */}
          <div className="mb-4">
            <label className="block text-gi-white mb-2 text-sm uppercase tracking-wide">
              Subscription Tier
            </label>
            <div className={`inline-block px-4 py-2 rounded-lg border-2 ${getTierBadgeColor()}`}>
              <span className={`font-medium ${
                tier === 'premium' || tier === 'admin' ? 'text-gi-gold' : 'text-gi-white'
              }`}>
                {getTierLabel()}
              </span>
            </div>
          </div>

          {/* Member Since */}
          <div>
            <label className="block text-gi-white mb-2 text-sm uppercase tracking-wide">
              Member Since
            </label>
            <p className="text-gi-horizon">
              {currentUser?.createdAt 
                ? new Date(currentUser.createdAt).toLocaleDateString()
                : 'Unknown'
              }
            </p>
          </div>
        </div>

        {/* Notifications */}
        {unreadNotification && (
          <div className="gi-card p-6 mb-6">
            <h2 className="text-xl font-light text-gi-white mb-4">Notifications</h2>
            <div className="p-4 bg-gi-slate/50 rounded-lg border-l-4 border-gi-gold">
              <div className="flex items-start justify-between mb-2">
                <p className="text-gi-gold font-medium">New Message</p>
                <button
                  onClick={markNotificationAsRead}
                  className="text-gi-mist hover:text-gi-white text-sm"
                >
                  Mark as read
                </button>
              </div>
              <p className="text-gi-white text-sm mb-2">{unreadNotification.text}</p>
              <p className="text-gi-mist text-xs">
                {new Date(unreadNotification.sentAt?.toDate?.() || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="gi-card p-6 mb-6">
          <h2 className="text-xl font-light text-gi-white mb-4">About</h2>
          
          <div className="flex items-start space-x-4 mb-4">
            <img 
              src={book3dImage} 
              alt="Genba Ikigai Book" 
              className="w-20 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-gi-white leading-relaxed mb-3">
                A companion app to <span className="text-gi-gold">Genba Ikigai – Leading to Serve</span> by Mark Forkun. 
                Certificates issued by Kaizen Academy Australia.
              </p>
              
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={authorPortrait} 
                  alt="Mark Forkun" 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-gi-white text-sm font-medium">Mark Forkun</p>
                  <p className="text-gi-mist text-xs">Author & Leadership Coach</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <a 
              href="https://a.co/d/aGY7NzC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gi-slate/50 rounded-lg hover:bg-gi-slate transition-colors"
            >
              <span className="text-gi-white text-sm">Get the Book on Amazon</span>
              <span className="text-gi-horizon">→</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/company/theciacademy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gi-slate/50 rounded-lg hover:bg-gi-slate transition-colors"
            >
              <span className="text-gi-white text-sm">LinkedIn</span>
              <span className="text-gi-horizon">→</span>
            </a>
            
            <a 
              href="https://www.youtube.com/@ContinuousImprovementAcademy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gi-slate/50 rounded-lg hover:bg-gi-slate transition-colors"
            >
              <span className="text-gi-white text-sm">YouTube Channel</span>
              <span className="text-gi-horizon">→</span>
            </a>
            
            <a 
              href="https://www.continuousimprovement.education" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gi-slate/50 rounded-lg hover:bg-gi-slate transition-colors"
            >
              <span className="text-gi-white text-sm">Website</span>
              <span className="text-gi-horizon">→</span>
            </a>
          </div>
        </div>

        {/* App Info */}
        <div className="gi-card p-6 mb-6">
          <h2 className="text-xl font-light text-gi-white mb-4">App Information</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gi-mist">Version</span>
              <span className="text-gi-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gi-mist">Build</span>
              <span className="text-gi-white">Kaizen Academy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gi-mist">Platform</span>
              <span className="text-gi-white">Web App</span>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full gi-button-danger"
        >
          Sign Out
        </button>

        {/* Admin Quick Access */}
        {isAdmin && (
          <div className="mt-4 text-center">
            <a 
              href="/admin"
              className="text-gi-gold hover:text-gi-white text-sm underline"
            >
              Access Admin Panel →
            </a>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
