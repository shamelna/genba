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

export const getBusCheckins = async (uid, limitCount = 10) => {
  const busRef = collection(db, 'users', uid, 'bus');
  const q = query(
    busRef,
    orderBy('date', 'desc'),
    limit(limitCount)
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

export const getWeeklyIntentions = async (uid, limitCount = 12) => {
  const intentionsRef = collection(db, 'users', uid, 'intentions');
  const q = query(
    intentionsRef,
    orderBy('weekKey', 'desc'),
    limit(limitCount)
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
export const getJournalEntries = async (uid, limitCount = 50) => {
  const entries = [];

  // Get habit checkins
  const habitCheckins = await getHabitCheckins(uid, limitCount);
  entries.push(...habitCheckins.map(entry => ({
    ...entry,
    type: 'habit',
    displayName: `Habit: ${entry.habitName || 'Check-in'}`,
    _sortKey: entry.date || (entry.timestamp && entry.timestamp.toDate ? entry.timestamp.toDate().toISOString() : ''),
  })));

  // Get bus checkins
  const busCheckins = await getBusCheckins(uid, limitCount);
  entries.push(...busCheckins.map(entry => ({
    ...entry,
    type: 'bus',
    displayName: `Bus Check-in: ${entry.busColour || 'Check-in'}`,
    _sortKey: entry.date || (entry.timestamp && entry.timestamp.toDate ? entry.timestamp.toDate().toISOString() : ''),
  })));

  // Get ikigai map (if exists)
  const ikigaiMap = await getIkigaiMap(uid);
  if (ikigaiMap) {
    const dateStr = (ikigaiMap.updatedAt && ikigaiMap.updatedAt.toDate) ? ikigaiMap.updatedAt.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    entries.push({
      ...ikigaiMap,
      type: 'ikigai',
      displayName: 'Ikigai Map Updated',
      date: dateStr,
      _sortKey: dateStr,
    });
  }

  // Get weekly intentions
  const intentions = await getWeeklyIntentions(uid, limitCount);
  entries.push(...intentions.map(entry => ({
    ...entry,
    type: 'intention',
    displayName: `Weekly Intention: ${entry.weekKey}`,
    _sortKey: (entry.createdAt && entry.createdAt.toDate) ? entry.createdAt.toDate().toISOString() : entry.weekKey || '',
  })));

  // Get journalEntries subcollection (case study reflections, genba moments,
  // stop-and-think reflections, baseline entries)
  const journalEntriesRef = collection(db, 'users', uid, 'journalEntries');
  const jq = query(journalEntriesRef, orderBy('createdAt', 'desc'), limit(limitCount));
  const jSnapshot = await getDocs(jq);
  jSnapshot.docs.forEach(d => {
    const data = d.data();
    entries.push({
      id: d.id,
      ...data,
      _sortKey: (data.createdAt && data.createdAt.toDate) ? data.createdAt.toDate().toISOString() : '',
    });
  });

  // Sort by _sortKey descending (most recent first)
  return entries.sort((a, b) => {
    const aKey = a._sortKey || '';
    const bKey = b._sortKey || '';
    return bKey.localeCompare(aKey);
  });
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

// ─── Course Companion Services ────────────────────────────────────────────────

// Save onboarding baseline data and mark onboarding complete
export const saveOnboardingBaseline = async (uid, baselineData) => {
  const userRef = doc(db, 'users', uid);
  return await setDoc(userRef, {
    onboarding: {
      completed: true,
      completedAt: Timestamp.now(),
      baseline: baselineData,
      currentModule: 'introduction',
    },
    onboardingComplete: true,
  }, { merge: true });
};

// Get course progress for a user
export const getCourseProgress = async (uid) => {
  const progressRef = doc(db, 'users', uid, 'course', 'progress');
  const snapshot = await getDoc(progressRef);
  return snapshot.exists() ? snapshot.data() : {};
};

// Mark a module as started
export const markModuleStarted = async (uid, moduleId) => {
  const progressRef = doc(db, 'users', uid, 'course', 'progress');
  return await setDoc(progressRef, {
    [moduleId]: {
      started: true,
      startedAt: Timestamp.now(),
    },
  }, { merge: true });
};

// Mark a module as completed
export const markModuleCompleted = async (uid, moduleId) => {
  const progressRef = doc(db, 'users', uid, 'course', 'progress');
  return await setDoc(progressRef, {
    [moduleId]: {
      started: true,
      completed: true,
      completedAt: Timestamp.now(),
    },
  }, { merge: true });
};

// Save the reflection answers from end of a case study chapter
export const saveCaseStudyReflection = async (uid, moduleId, reflectionAnswers) => {
  const reflectionId = `${moduleId}-${Date.now()}`;
  const reflectionRef = doc(db, 'users', uid, 'reflections', reflectionId);
  return await setDoc(reflectionRef, {
    moduleId,
    reflectionAnswers,
    createdAt: Timestamp.now(),
  });
};

// Save a full journal entry with case study reflection data
export const saveJournalEntryWithReflection = async (uid, moduleId, entryData) => {
  const entryId = `cs-${moduleId}-${Date.now()}`;
  const entryRef = doc(db, 'users', uid, 'journalEntries', entryId);
  return await setDoc(entryRef, {
    type: 'case-study-reflection',
    moduleId,
    userId: uid,
    createdAt: Timestamp.now(),
    ...entryData,
  });
};

// Get case study journal entries for a user
export const getCaseStudyJournalEntries = async (uid) => {
  const entriesRef = collection(db, 'users', uid, 'journalEntries');
  const q = query(entriesRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// Save a Genba Ikigai Moment journal entry
export const saveGenbaMoment = async (uid, data) => {
  const entryId = `genba-moment-${Date.now()}`;
  const entryRef = doc(db, 'users', uid, 'journalEntries', entryId);
  return await setDoc(entryRef, {
    type: 'genba-moment',
    userId: uid,
    createdAt: Timestamp.now(),
    ...data,
  });
};

// Save a Stop and Think reflection entry
export const saveStopAndThinkReflection = async (uid, data) => {
  const entryId = `stop-and-think-${Date.now()}`;
  const entryRef = doc(db, 'users', uid, 'journalEntries', entryId);
  return await setDoc(entryRef, {
    type: 'stop-and-think',
    userId: uid,
    createdAt: Timestamp.now(),
    ...data,
  });
};

// Save a Baseline assessment entry
export const saveBaselineEntry = async (uid, data) => {
  const entryId = `baseline-${Date.now()}`;
  const entryRef = doc(db, 'users', uid, 'journalEntries', entryId);
  return await setDoc(entryRef, {
    type: 'baseline',
    userId: uid,
    createdAt: Timestamp.now(),
    ...data,
  });
};

// Get baseline history: onboarding baseline + all baseline journal entries, sorted oldest first
export const getBaselineHistory = async (uid) => {
  const results = [];

  // Fetch onboarding baseline from the user doc
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data();
    if (userData?.onboarding?.baseline) {
      results.push({
        id: 'onboarding',
        type: 'baseline',
        label: 'Onboarding Baseline',
        isOnboarding: true,
        createdAt: userData.onboarding.completedAt || null,
        ...userData.onboarding.baseline,
      });
    }
  }

  // Fetch all baseline journal entries
  const entriesRef = collection(db, 'users', uid, 'journalEntries');
  const q = query(entriesRef, orderBy('createdAt', 'asc'));
  const snapshot = await getDocs(q);
  snapshot.docs.forEach(d => {
    const data = d.data();
    if (data.type === 'baseline') {
      results.push({ id: d.id, ...data });
    }
  });

  return results;
};

// ─────────────────────────────────────────────────────────────────────────────

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
