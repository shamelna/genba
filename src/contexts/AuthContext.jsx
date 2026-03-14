import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user);
      if (user) {
        console.log('User object properties:', Object.keys(user));
        console.log('User UID:', user.uid);
        console.log('User email:', user.email);
        console.log('User displayName:', user.displayName);
        console.log('User constructor:', user.constructor.name);
        
        console.log('User authenticated, fetching Firestore document for UID:', user.uid);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          console.log('User document found, merging with profile data');
          console.log('Firestore data:', userDoc.data());
          setCurrentUser({ ...user, ...userDoc.data() });
        } else {
          console.log('No user document found, using basic user data');
          setCurrentUser(user);
        }
      } else {
        console.log('User signed out');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, 'users', result.user.uid), {
        displayName,
        email,
        authMethod: 'email',
        tier: 'basic',
        status: 'active',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        onboardingComplete: false,
        notificationMessage: null
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          authMethod: 'google',
          tier: 'basic',
          status: 'active',
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          onboardingComplete: false,
          notificationMessage: null
        });
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    return await signOut(auth);
  };

  const resetPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (uid, data) => {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
    
    if (currentUser && currentUser.uid === uid) {
      setCurrentUser(prev => ({ ...prev, ...data }));
    }
  };

  const value = {
    currentUser,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
