import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';

const UserTierContext = createContext();

export const useUserTier = () => {
  const context = useContext(UserTierContext);
  if (!context) {
    throw new Error('useUserTier must be used within a UserTierProvider');
  }
  return context;
};

export const UserTierProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const userTier = useMemo(() => {
    if (!currentUser) {
      return {
        tier: null,
        isAdmin: false,
        isBasic: false,
        isPremium: false,
        canAccessCompass: false
      };
    }

    const tier = currentUser.tier || 'basic';
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];
    
    console.log('UserTierContext Debug:');
    console.log('- currentUser.email:', currentUser.email);
    console.log('- currentUser.tier:', tier);
    console.log('- adminEmails:', adminEmails);
    console.log('- adminEmails.includes(currentUser.email):', adminEmails.includes(currentUser.email));
    console.log('- tier === admin:', tier === 'admin');
    
    const isAdmin = adminEmails.includes(currentUser.email) || tier === 'admin';
    const canAccessCompass = tier === 'premium' || tier === 'admin' || isAdmin;
    
    console.log('- isAdmin:', isAdmin);
    console.log('- canAccessCompass:', canAccessCompass);
    
    return {
      tier,
      isAdmin,
      isBasic: tier === 'basic',
      isPremium: tier === 'premium',
      canAccessCompass
    };
  }, [currentUser]);

  const value = {
    ...userTier,
    currentUser
  };

  return (
    <UserTierContext.Provider value={value}>
      {children}
    </UserTierContext.Provider>
  );
};
