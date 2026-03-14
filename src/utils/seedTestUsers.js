import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const testUsers = [
  {
    email: 'admin@genbatest.com',
    password: 'Admin@1234',
    displayName: 'Admin User',
    tier: 'admin',
    status: 'active',
    authMethod: 'email'
  },
  {
    email: 'basic@genbatest.com',
    password: 'Basic@1234',
    displayName: 'Basic User',
    tier: 'basic',
    status: 'active',
    authMethod: 'email'
  },
  {
    email: 'premium@genbatest.com',
    password: 'Premium@1234',
    displayName: 'Premium User',
    tier: 'premium',
    status: 'active',
    authMethod: 'email'
  }
];

export const seedTestUsers = async () => {
  try {
    const metaDoc = await getDoc(doc(db, 'meta', 'seeded'));
    if (metaDoc.exists()) {
      console.log('Test users already seeded');
      return;
    }

    for (const user of testUsers) {
      await setDoc(doc(db, 'users', user.email), {
        displayName: user.displayName,
        email: user.email,
        authMethod: user.authMethod,
        tier: user.tier,
        status: user.status,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        onboardingComplete: false,
        notificationMessage: null
      });
    }

    await setDoc(doc(db, 'meta', 'seeded'), {
      value: true,
      seededAt: new Date().toISOString()
    });

    console.log('Test users seeded successfully');
  } catch (error) {
    console.error('Error seeding test users:', error);
  }
};

export default seedTestUsers;
