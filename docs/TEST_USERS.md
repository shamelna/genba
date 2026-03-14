# Test Users - Genba Ikigai Companion App

## Test User Credentials

### Admin User
- **Email**: admin@genbatest.com
- **Password**: Admin@1234
- **Tier**: Admin
- **Access**: Full admin panel access

### Basic User (Tier 1)
- **Email**: basic@genbatest.com
- **Password**: Basic@1234
- **Tier**: Basic
- **Access**: 16 Habits Daily Coach only
- **Compass**: Locked (upgrade prompt shown)

### Premium User (Tier 2)
- **Email**: premium@genbatest.com
- **Password**: Premium@1234
- **Tier**: Premium
- **Access**: 16 Habits Daily Coach + My Ikigai Compass

## Tier Switching Instructions

### For Admin Testing:
1. Login as admin@genbatest.com
2. Navigate to /admin
3. Use User Management table to upgrade/downgrade users
4. Changes take effect immediately on next login

### Data Reset Guide

### Firebase Emulator Setup (Recommended for Local Development)

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase in project**:
   ```bash
   firebase init emulators
   ```
   - Select Firestore and Authentication
   - Use default ports (Firestore: 8080, Auth: 9099)

3. **Start emulators**:
   ```bash
   firebase emulators:start
   ```

4. **Update .env for emulator**:
   ```
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=localhost:9099
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_USE_EMULATOR=true
   ```

5. **Connect to emulators in firebase.js**:
   ```javascript
   if (import.meta.env.VITE_USE_EMULATOR === 'true') {
     connectAuthEmulator(auth, 'http://localhost:9099');
     connectFirestoreEmulator(db, 'localhost', 8080);
   }
   ```

## Manual Testing Checklist

- [ ] All three users can sign in successfully
- [ ] Basic user sees Compass as locked
- [ ] Premium user can access all features
- [ ] Admin can manage users via admin panel
- [ ] Email/password authentication works
- [ ] Password reset functionality works
- [ ] Google Sign-In works (if configured)
- [ ] User data persists across sessions
- [ ] Onboarding flow triggers on first login
- [ ] Tier-based access control works correctly
