import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotifContext = createContext();

export const useNotif = () => {
  const context = useContext(NotifContext);
  if (!context) {
    throw new Error('useNotif must be used within a NotifProvider');
  }
  return context;
};

export const NotifProvider = ({ children }) => {
  const { currentUser, updateUserProfile } = useAuth();
  const [unreadNotification, setUnreadNotification] = useState(null);

  useEffect(() => {
    if (currentUser?.notificationMessage && !currentUser.notificationMessage.read) {
      setUnreadNotification(currentUser.notificationMessage);
    } else {
      setUnreadNotification(null);
    }
  }, [currentUser]);

  const markNotificationAsRead = async () => {
    if (currentUser?.notificationMessage && !currentUser.notificationMessage.read) {
      await updateUserProfile(currentUser.uid, {
        notificationMessage: {
          ...currentUser.notificationMessage,
          read: true
        }
      });
      setUnreadNotification(null);
    }
  };

  const value = {
    unreadNotification,
    markNotificationAsRead
  };

  return (
    <NotifContext.Provider value={value}>
      {children}
    </NotifContext.Provider>
  );
};
