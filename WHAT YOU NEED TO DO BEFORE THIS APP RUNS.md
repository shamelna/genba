# WHAT YOU NEED TO DO BEFORE THIS APP RUNS

## 1. FIREBASE PROJECT SETUP
- Create Firebase project at console.firebase.google.com
- Enable Authentication: Email/Password + Google
- Enable Firestore Database (start in test mode)
- Copy config values into .env file
- Enable Firebase Hosting

## 2. FIREBASE TRIGGER EMAIL EXTENSION
- Install from Firebase Extensions Hub
- Connect to SendGrid or another SMTP provider
- Set Firestore collection to "emailQueue"
- Provide SMTP credentials
- Verify email templates are in /emailTemplates/

## 3. GOOGLE AUTH CONFIGURATION
- Add your domain to Authorised Domains in Firebase Console
- For localhost testing: add localhost to Authorised Domains

## 4. ADMIN EMAIL SETUP
- Add your real admin email to VITE_ADMIN_EMAILS in .env
- This controls access to the /admin route

## 5. ASSET VERIFICATION
- Confirm all 14 images exist in /assets/ folder
- Check filenames match exactly (case-sensitive):
  - hero-book-floating-water.jpg ✓
  - book-3d-mockup-editorial.jpg ✓
  - book-open-desk.jpg ✓
  - book-spine-detail.jpg ✓
  - author-mark-forkun-portrait.jpg ✓
  - author-mark-forkun-genba.jpg ✓
  - author-mark-forkun-coaching.jpg ✓
  - ikigai-compass-background.jpg ✓
  - single-stone-card.jpg ✓
  - red-bus-card.jpg ✓
  - amber-bus-card.jpg ✓
  - green-bus-card.jpg ✓
  - habit-checkin-desk-bg.jpg ✓
  - ikigai-map-illustration.jpg ✓
- List any missing images that still need to be generated: None

## 6. BOOK CONTENT REVIEW
- All habit descriptions, prompts, and quotes have been included from the book
- Hansei reflection prompts are derived from book principles
- Coaching tips follow book methodology
- No generic lean or coaching language used
- All content sourced from "Genba Ikigai – Leading to Serve"

## 7. FIRESTORE SECURITY RULES
- Switch Firestore from test mode to production rules
- Deploy rules: firebase deploy --only firestore:rules
- Rules file created: firestore.rules

## 8. DEPLOYMENT
- Run: npm run build (currently has Tailwind build issues)
- Run: firebase deploy
- Test all three test user logins on live URL

## 9. OPTIONAL BUT RECOMMENDED
- Set up Firebase Emulator Suite for local development
- Enable Firebase App Check for production security
- Set up custom domain in Firebase Hosting

## 10. CURRENT BUILD ISSUES TO RESOLVE
- Tailwind CSS build configuration needs fixing
- Custom color utilities not being recognized in build
- Consider using standard Tailwind colors instead of custom utilities
- PostCSS configuration may need adjustment

## 11. TESTING CHECKLIST
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
- [ ] Mobile responsive design works (390px minimum)
- [ ] All 14 assets load correctly
- [ ] Navigation works between all screens
- [ ] Habit check-ins save and display properly
- [ ] Progress tracking shows data
- [ ] Journal entries appear correctly
- [ ] Settings page updates user profile
- [ ] Admin panel functions work

## NEXT STEPS
1. Fix Tailwind CSS build configuration
2. Set up Firebase project with real credentials
3. Test with actual Firebase backend
4. Deploy to staging environment
5. Complete user acceptance testing
