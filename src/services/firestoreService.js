import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  updateDoc,
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// User Services
export const getUserDoc = (uid) => doc(db, 'users', uid);

export const updateUserDoc = async (uid, data) => {
  return await updateDoc(getUserDoc(uid), data);
};

export const updateUserProfile = async (uid, data) => {
  return await updateDoc(getUserDoc(uid), data);
};

export const createUserDoc = async (uid, data) => {
  return await setDoc(getUserDoc(uid), data);
};

// Habit Check-in Services
export const saveHabitCheckin = async (uid, checkinData) => {
  const today = new Date().toISOString().split('T')[0];
  const checkinRef = doc(db, 'users', uid, 'checkins', today);
  
  return await setDoc(checkinRef, {
    ...checkinData,
    timestamp: Timestamp.now(),
    date: today
  });
};

export const getHabitCheckins = async (uid, days = 30) => {
  const checkinsRef = collection(db, 'users', uid, 'checkins');
  const q = query(
    checkinsRef,
    orderBy('date', 'desc'),
    limit(days)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getHabitCheckinByDate = async (uid, date) => {
  const checkinRef = doc(db, 'users', uid, 'checkins', date);
  const snapshot = await getDoc(checkinRef);
  
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

// Bus Check-in Services
export const saveBusCheckin = async (uid, busData) => {
  const today = new Date().toISOString().split('T')[0];
  const busRef = doc(db, 'users', uid, 'bus', today);
  
  return await setDoc(busRef, {
    ...busData,
    timestamp: Timestamp.now(),
    date: today
  });
};

export const getBusCheckins = async (uid, limit = 10) => {
  const busRef = collection(db, 'users', uid, 'bus');
  const q = query(
    busRef,
    orderBy('date', 'desc'),
    limit(limit)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Ikigai Services
export const saveIkigaiMap = async (uid, ikigaiData) => {
  const ikigaiRef = doc(db, 'users', uid, 'ikigai', 'map');
  
  return await setDoc(ikigaiRef, {
    ...ikigaiData,
    updatedAt: Timestamp.now()
  });
};

export const getIkigaiMap = async (uid) => {
  const ikigaiRef = doc(db, 'users', uid, 'ikigai', 'map');
  const snapshot = await getDoc(ikigaiRef);
  
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

// Weekly Intentions Services
export const saveWeeklyIntention = async (uid, intentionData) => {
  const weekNumber = getWeekNumber(new Date());
  const year = new Date().getFullYear();
  const weekKey = `${year}-${weekNumber.toString().padStart(2, '0')}`;
  
  const intentionRef = doc(db, 'users', uid, 'intentions', weekKey);
  
  return await setDoc(intentionRef, {
    ...intentionData,
    weekKey,
    year,
    weekNumber,
    createdAt: Timestamp.now()
  });
};

export const getWeeklyIntentions = async (uid, limit = 12) => {
  const intentionsRef = collection(db, 'users', uid, 'intentions');
  const q = query(
    intentionsRef,
    orderBy('weekKey', 'desc'),
    limit(limit)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Admin Services
export const getAllUsers = async () => {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const sendAdminMessage = async (uid, messageData) => {
  const messageId = Date.now().toString();
  const messageRef = doc(db, 'admin', 'sentMessages', messageId);
  
  // Save to admin log
  await setDoc(messageRef, messageData);
  
  // Update user notification
  await updateUserDoc(uid, {
    notificationMessage: {
      text: messageData.message,
      sentAt: Timestamp.now(),
      read: false
    }
  });
  
  return messageId;
};

// Journal Services
export const getJournalEntries = async (uid, limit = 50) => {
  const entries = [];
  
  // Get habit checkins
  const habitCheckins = await getHabitCheckins(uid, limit);
  entries.push(...habitCheckins.map(entry => ({
    ...entry,
    type: 'habit',
    displayName: `Habit: ${entry.habitName || 'Check-in'}`
  })));
  
  // Get bus checkins (if premium)
  const busCheckins = await getBusCheckins(uid, limit);
  entries.push(...busCheckins.map(entry => ({
    ...entry,
    type: 'bus',
    displayName: `Bus Check-in: ${entry.busColour || 'Check-in'}`
  })));
  
  // Get ikigai map (if exists)
  const ikigaiMap = await getIkigaiMap(uid);
  if (ikigaiMap) {
    entries.push({
      ...ikigaiMap,
      type: 'ikigai',
      displayName: 'Ikigai Map Updated',
      date: ikigaiMap.updatedAt?.toDate?.()?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]
    });
  }
  
  // Get weekly intentions
  const intentions = await getWeeklyIntentions(uid, limit);
  entries.push(...intentions.map(entry => ({
    ...entry,
    type: 'intention',
    displayName: `Weekly Intention: ${entry.weekKey}`
  })));
  
  // Sort by date (most recent first)
  return entries.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
};

// Utility Functions
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export const calculateStreak = async (uid) => {
  const checkins = await getHabitCheckins(uid, 365);
  if (checkins.length === 0) return 0;
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (const checkin of checkins) {
    const checkinDate = new Date(checkin.date);
    checkinDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((currentDate - checkinDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === streak) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const calculateHabitAverages = async (uid, days = 30) => {
  const checkins = await getHabitCheckins(uid, days);
  const habitScores = {};
  
  checkins.forEach(checkin => {
    if (!habitScores[checkin.habitIndex]) {
      habitScores[checkin.habitIndex] = {
        habitName: checkin.habitName,
        scores: []
      };
    }
    habitScores[checkin.habitIndex].scores.push(checkin.score);
  });
  
  const averages = {};
  Object.keys(habitScores).forEach(habitIndex => {
    const scores = habitScores[habitIndex].scores;
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    averages[habitIndex] = {
      habitName: habitScores[habitIndex].habitName,
      average: Math.round(average * 10) / 10,
      count: scores.length
    };
  });
  
  return averages;
};
