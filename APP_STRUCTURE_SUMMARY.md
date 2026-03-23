# Genba Ikigai App - Structure and Content Summary

## Overview
The Genba Ikigai Companion App is a React-based web application designed to complement the book "Genba Ikigai – Leading to Serve" by Mark Forkun. It serves as a daily coaching platform for implementing the 16 fundamental habits of lean leadership.

## Technology Stack

### Frontend
- **Framework**: React 18.3.1 with Vite 4.5.14
- **Routing**: React Router DOM v6.30.3
- **Styling**: Tailwind CSS 3.4.19 with custom design system
- **Charts**: Recharts 3.8.0 for data visualization
- **Icons**: Emoji-based icons for lightweight implementation

### Backend & Services
- **Authentication**: Firebase Authentication (Email/Password + Google)
- **Database**: Firestore Database
- **Hosting**: Firebase Hosting
- **Email**: Firebase Trigger Email Extension with SendGrid/SMTP

## Application Architecture

### Core Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navigation.jsx     # Main navigation component
│   └── ProtectedRoute.jsx # Route protection wrapper
├── contexts/           # React Context providers
│   ├── AuthContext.jsx     # Authentication state management
│   ├── UserTierContext.jsx # User tier (Basic/Premium/Admin) management
│   └── NotifContext.jsx    # Notification system
├── data/              # Static application data
│   └── habitsData.js     # 16 habits with prompts and coaching content
├── pages/             # Page components (9 pages)
├── services/          # Firebase service functions
│   └── firestoreService.js # Database operations
├── utils/             # Utility functions
├── assets/            # Images and static assets
├── App.jsx            # Main app with routing
├── main.jsx           # App entry point
└── firebase.js        # Firebase configuration
```

## User Management & Access Control

### User Tiers
1. **Basic User**: Access to daily habits check-in, progress tracking, journal
2. **Premium User**: All basic features + Ikigai Compass (Bus Check-in, Ikigai Map)
3. **Admin User**: All features + user management panel

### Authentication
- Email/Password authentication
- Google Sign-In integration
- Test user seeding for development

## Core Features & Pages

### 1. Login (`/login`)
- User authentication interface
- Support for both email/password and Google auth
- Password reset functionality

### 2. Onboarding (`/onboarding`)
- First-time user experience
- Introduction to the 16 habits
- Profile setup and weekly intention setting

### 3. Home Dashboard (`/home`)
- Personalized greeting based on time of day
- Daily featured habit (rotates through 16 habits)
- Streak tracking and progress overview
- Daily reflection prompts
- Quick access to main features

### 4. Daily Check-In (`/checkin`)
- Daily evaluation of the 16 fundamental habits
- Rating system (1-5) for each habit
- Hansei (self-reflection) prompts for each habit
- Coaching tips and inspirational quotes
- Weekly intention setting and tracking

### 5. Progress Tracking (`/progress`)
- Visual radar charts showing habit performance
- Streak analytics and trends
- Historical progress visualization
- Performance insights

### 6. Ikigai Compass (`/compass`) - *Premium Feature*
- **Bus Check-in**: Life balance assessment across different areas
- **Ikigai Map**: Purpose discovery tool
- Premium-only access control

### 7. Journal (`/journal`)
- Chronological feed of all user activities
- Filterable by date and activity type
- Reflection entries and habit check-ins
- Search functionality

### 8. Settings (`/settings`)
- Profile management
- User tier information
- Email preferences
- Account settings

### 9. Admin Panel (`/admin`) - *Admin Only*
- User management (view, edit, delete users)
- Tier modification capabilities
- User analytics and insights
- Bulk user operations

## The 16 Habits System

The app is built around 16 fundamental habits of lean leadership, each with:

1. **Humility** - Leading with service and putting others before self
2. **Servant Leadership (Inverted Pyramid)** - Leading from the bottom up
3. **Genchi Genbutsu (Go and See)** - Going to the actual place where work happens
4. **Hansei (Self-Reflection)** - Continuous self-improvement through honest reflection
5. **Kaizen (Continuous Improvement)** - Small, incremental improvements
6. **Respect for People** - Valuing every team member's contribution
7. **Gemba (Real Place)** - Focus on where value is created
8. **Muda (Waste Elimination)** - Identifying and eliminating waste
9. **Mura (Unevenness)** - Creating smooth, consistent workflows
10. **Muri (Overburden)** - Avoiding excessive strain on people or systems
11. **Just-in-Time** - Delivering what's needed, when it's needed
12. **Jidoka (Automation with Human Touch)** - Building quality into processes
13. **Andon (Visual Control)** - Making problems visible immediately
14. **5S (Workplace Organization)** - Sort, Set in Order, Shine, Standardize, Sustain
15. **Standardized Work** - Documenting best practices
16. **Daily Management** - Consistent, disciplined leadership practices

Each habit includes:
- **Essence**: Core principle explanation
- **Hansei Prompts**: 3 reflective questions for self-assessment
- **Coaching Tip**: Practical guidance for implementation
- **Quote**: Inspirational quote related to the habit

## Data Management

### Firestore Collections
- **users**: User profiles and authentication data
- **checkins**: Daily habit check-in records
- **journal**: User journal entries and activities
- **busCheckins**: Ikigai Compass bus check-in data
- **ikigaiMaps**: User ikigai map responses
- **emailQueue**: Email notification queue

### Real-time Features
- Live authentication state updates
- Real-time progress tracking
- Instant notification system

## Design System

### Visual Identity
- **Primary Colors**: Deep blue-grey gradients (#1C2B3A)
- **Accent Color**: Kaizen Academy yellow (#FFD559)
- **Typography**: Light weight fonts with generous letter-spacing
- **Aesthetic**: Contemplative, misty design inspired by book cover

### Responsive Design
- Mobile-first approach
- Minimum width: 390px
- Tailwind CSS utility classes
- Custom CSS components for consistency

## Security & Privacy

### Authentication Security
- Firebase Authentication with secure token handling
- Session management and automatic logout
- Password encryption and secure storage

### Data Security
- Firestore security rules for data isolation
- User data privacy protection
- Admin-only access to sensitive operations
- Input validation and sanitization

## Development & Deployment

### Development Environment
- Vite development server
- Hot module replacement
- ESLint for code quality
- Firebase Emulator Suite support

### Build Process
- `npm run build` for production build
- `npm run preview` for production preview
- Firebase deployment integration
- Environment variable configuration

### Testing Strategy
- Seeded test users for development
- Multi-tier testing (Basic/Premium/Admin)
- Mobile responsiveness testing
- End-to-end user flow validation

## Content Management

### Book-Derived Content
All content is sourced from "Genba Ikigai – Leading to Serve":
- Habit descriptions and essences
- Hansei reflection prompts
- Coaching tips and methodologies
- Inspirational quotes
- No generic lean or coaching language

### Asset Management
- 14 custom images for visual elements
- Book cover and author imagery
- Custom card designs for habits
- Consistent visual branding

## Future Enhancements

### Planned Features
- Advanced analytics and insights
- Team collaboration features
- Mobile app development
- Integration with calendar systems
- Advanced coaching AI

### Technical Improvements
- Progressive Web App (PWA) capabilities
- Offline functionality
- Enhanced performance optimization
- Advanced security features

## Conclusion

The Genba Ikigai Companion App represents a comprehensive digital platform for implementing lean leadership principles in daily practice. It combines modern web technologies with time-tested leadership methodologies to create an engaging, effective coaching experience that supports personal and professional growth through the 16 habits system.
