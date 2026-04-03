import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { getAllUsers, sendAdminMessage, updateUserProfile } from '../services/firestoreService';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageModal, setMessageModal] = useState(false);
  const [tierModal, setTierModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [statsModal, setStatsModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageLoading, setMessageLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const userList = await getAllUsers();
      setUsers(userList);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || 
      (filter === 'basic' && user.tier === 'basic') ||
      (filter === 'premium' && user.tier === 'premium') ||
      (filter === 'admin' && user.tier === 'admin') ||
      (filter === 'suspended' && user.status === 'suspended') ||
      (filter === 'active' && user.status === 'active');
    
    const matchesSearch = search === '' || 
      user.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleSendMessage = async () => {
    if (!selectedUser || !messageText.trim()) return;
    
    setMessageLoading(true);
    try {
      await sendAdminMessage(selectedUser.uid, {
        toUid: selectedUser.uid,
        toEmail: selectedUser.email,
        toName: selectedUser.displayName,
        message: messageText,
        adminEmail: 'admin@genbatest.com' // In real app, get from current user
      });
      
      setMessageModal(false);
      setMessageText('');
      setSelectedUser(null);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setMessageLoading(false);
    }
  };

  const handleTierChange = async () => {
    console.log('handleTierChange called');
    console.log('selectedUser:', selectedUser);
    console.log('selectedTier:', selectedTier);
    
    if (!selectedUser || !selectedTier) {
      console.error('No user or tier selected for update');
      return;
    }
    
    // Preserve user data for operation
    const userToUpdate = selectedUser;
    const newTier = selectedTier;
    
    // Use correct UID property - user object has 'id' not 'uid'
    const userUid = userToUpdate.uid || userToUpdate.id;
    
    console.log('Updating tier for user:', userUid, 'to tier:', newTier);
    
    try {
      await updateUserProfile(userUid, { tier: newTier });
      setTierModal(false);
      setSelectedUser(null);
      setSelectedTier('');
      alert(`User tier updated to ${newTier}`);
      loadUsers();
    } catch (error) {
      console.error('Error updating tier:', error);
      alert('Error updating tier. Please try again.');
    }
  };

  const handleStatusChange = async () => {
    if (!selectedUser || !selectedStatus) {
      console.error('No user or status selected for update');
      return;
    }
    
    // Preserve user data for operation
    const userToUpdate = selectedUser;
    const newStatus = selectedStatus;
    
    // Use correct UID property - user object has 'id' not 'uid'
    const userUid = userToUpdate.uid || userToUpdate.id;
    
    console.log('Updating status for user:', userUid, 'to status:', newStatus);
    
    try {
      await updateUserProfile(userUid, { status: newStatus });
      setStatusModal(false);
      setSelectedUser(null);
      setSelectedStatus('');
      alert(`User status updated to ${newStatus}`);
      loadUsers();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status. Please try again.');
    }
  };

  const openTierModal = (user) => {
    setSelectedUser(user);
    setSelectedTier(user.tier || 'basic');
    setTierModal(true);
  };

  const openStatusModal = (user) => {
    setSelectedUser(user);
    setSelectedStatus(user.status || 'active');
    setStatusModal(true);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Auth Method', 'Tier', 'Status', 'Created', 'Last Active'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        user.displayName || '',
        user.email || '',
        user.authMethod || '',
        user.tier || '',
        user.status || '',
        user.createdAt || '',
        user.lastActive || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStats = () => {
    const total = users.length;
    const active = users.filter(u => u.status === 'active').length;
    const basic = users.filter(u => u.tier === 'basic').length;
    const premium = users.filter(u => u.tier === 'premium').length;
    const suspended = users.filter(u => u.status === 'suspended').length;
    const recentActive = users.filter(u => {
      const lastActive = new Date(u.lastActive);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return lastActive > weekAgo;
    }).length;

    return { total, active, basic, premium, suspended, recentActive };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gi-deep flex items-center justify-center">
        <div className="text-gi-white">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gi-deep pt-16 pb-6">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-light text-gi-white mb-2 tracking-wide">
            Admin Panel
          </h1>
          <p className="text-gi-horizon">
            Manage users and monitor platform activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="gi-card p-4 text-center">
            <p className="text-2xl font-light text-gi-gold">{stats.total}</p>
            <p className="text-gi-mist text-sm">Total Users</p>
          </div>
          <div className="gi-card p-4 text-center">
            <p className="text-2xl font-light text-gi-gold">{stats.recentActive}</p>
            <p className="text-gi-mist text-sm">Active (7d)</p>
          </div>
          <div className="gi-card p-4 text-center">
            <p className="text-2xl font-light text-gi-gold">{stats.basic}</p>
            <p className="text-gi-mist text-sm">Basic</p>
          </div>
          <div className="gi-card p-4 text-center">
            <p className="text-2xl font-light text-gi-gold">{stats.premium}</p>
            <p className="text-gi-mist text-sm">Premium</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="gi-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'basic', 'premium', 'active', 'suspended'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    filter === filterOption
                      ? 'bg-gi-gold text-gi-deep'
                      : 'bg-gi-slate text-gi-horizon hover:text-gi-white'
                  }`}
                >
                  {filterOption}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="mb-6">
          <button
            onClick={exportCSV}
            className="gi-button-secondary"
          >
            Export CSV
          </button>
        </div>

        {/* Users Table */}
        <div className="gi-card p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gi-horizon/30">
                <th className="text-left py-3 px-2 text-gi-white">Name</th>
                <th className="text-left py-3 px-2 text-gi-white">Email</th>
                <th className="text-left py-3 px-2 text-gi-white">Auth</th>
                <th className="text-left py-3 px-2 text-gi-white">Tier</th>
                <th className="text-left py-3 px-2 text-gi-white">Status</th>
                <th className="text-left py-3 px-2 text-gi-white">Last Active</th>
                <th className="text-left py-3 px-2 text-gi-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={`${user.uid}-${index}`} className="border-b border-gi-horizon/20 hover:bg-gi-slate/50">
                  <td className="py-3 px-2 text-gi-white">{user.displayName || 'N/A'}</td>
                  <td className="py-3 px-2 text-gi-horizon">{user.email}</td>
                  <td className="py-3 px-2 text-gi-mist">{user.authMethod}</td>
                  <td className="py-3 px-2">
                    <span className={`gi-score-pill ${
                      user.tier === 'premium' ? 'gi-score-high' :
                      user.tier === 'admin' ? 'gi-score-high' :
                      'gi-score-medium'
                    }`}>
                      {user.tier?.toUpperCase() || 'BASIC'}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`gi-score-pill ${
                      user.status === 'active' ? 'gi-score-high' : 'gi-score-low'
                    }`}>
                      {user.status?.toUpperCase() || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gi-mist">
                    {user.lastActive 
                      ? new Date(user.lastActive).toLocaleDateString()
                      : 'Never'
                    }
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex space-x-1">
                      <button
                        key={`message-${user.uid}`}
                        onClick={() => {
                          setSelectedUser(user);
                          setMessageModal(true);
                        }}
                        className="text-gi-horizon hover:text-gi-white text-xs"
                      >
                        Message
                      </button>
                      <button
                        key={`tier-${user.uid}`}
                        onClick={() => openTierModal(user)}
                        className="text-gi-horizon hover:text-gi-white text-xs"
                      >
                        Tier
                      </button>
                      <button
                        key={`status-${user.uid}`}
                        onClick={() => openStatusModal(user)}
                        className="text-gi-horizon hover:text-gi-white text-xs"
                      >
                        Status
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Message Modal */}
        {messageModal && selectedUser && (
          <div className="fixed inset-0 bg-gi-deep/90 flex items-center justify-center p-4 z-50">
            <div className="gi-card p-6 w-full max-w-md">
              <h3 className="text-xl font-light text-gi-white mb-4">
                Send Message to {selectedUser.displayName}
              </h3>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value.slice(0, 500))}
                placeholder="Enter your message (max 500 characters)..."
                className="w-full px-4 py-3 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold resize-none"
                rows={4}
              />
              <p className="text-gi-mist text-xs mt-2 text-right">
                {messageText.length}/500
              </p>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => {
                    setMessageModal(false);
                    setMessageText('');
                    setSelectedUser(null);
                  }}
                  className="flex-1 gi-button-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={messageLoading || !messageText.trim()}
                  className="flex-1 gi-button-primary disabled:opacity-50"
                >
                  {messageLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tier Selection Modal */}
        {tierModal && selectedUser && (
          <div className="fixed inset-0 bg-gi-deep/90 flex items-center justify-center p-4 z-50">
            <div className="gi-card p-6 w-full max-w-md">
              <h3 className="text-xl font-light text-gi-white mb-4">
                Change Tier for {selectedUser.displayName}
              </h3>
              <div className="space-y-3">
                {['basic', 'premium', 'admin'].map((tier) => (
                  <label key={tier} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="tier"
                      value={tier}
                      checked={selectedTier === tier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-4 h-4 text-gi-gold bg-gi-slate border-gi-horizon focus:ring-gi-gold"
                    />
                    <span className="text-gi-white capitalize">{tier}</span>
                  </label>
                ))}
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setTierModal(false);
                    setSelectedUser(null);
                    setSelectedTier('');
                  }}
                  className="flex-1 gi-button-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTierChange}
                  className="flex-1 gi-button-primary"
                >
                  Update Tier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Selection Modal */}
        {statusModal && selectedUser && (
          <div className="fixed inset-0 bg-gi-deep/90 flex items-center justify-center p-4 z-50">
            <div className="gi-card p-6 w-full max-w-md">
              <h3 className="text-xl font-light text-gi-white mb-4">
                Change Status for {selectedUser.displayName}
              </h3>
              <div className="space-y-3">
                {['active', 'suspended'].map((status) => (
                  <label key={status} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-4 h-4 text-gi-gold bg-gi-slate border-gi-horizon focus:ring-gi-gold"
                    />
                    <span className="text-gi-white capitalize">{status}</span>
                  </label>
                ))}
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setStatusModal(false);
                    setSelectedUser(null);
                    setSelectedStatus('');
                  }}
                  className="flex-1 gi-button-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusChange}
                  className="flex-1 gi-button-primary"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
