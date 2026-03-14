# Genba Ikigai Companion App

A companion web app for "Genba Ikigai – Leading to Serve" by Mark Forkun. Built with React, Firebase, and Tailwind CSS.

## Features

### Core Modules
- **16 Habits Daily Coach**: Daily check-ins for the 16 fundamental habits of lean leadership
- **My Ikigai Compass**: Premium feature for discovering purpose through Bus Check-in and Ikigai Map
- **Progress Tracking**: Visual radar charts and habit performance analytics
- **Journal**: Chronological feed of all user activities with filtering

### User Management
- Email/Password and Google authentication
- Tier-based access control (Basic/Premium/Admin)
- Admin panel for user management
- Test user seeding for development

## Tech Stack

- **Frontend**: React (Vite), React Router v6
- **Styling**: Tailwind CSS with custom Genba Ikigai design system
- **Backend**: Firebase Authentication, Firestore Database, Firebase Hosting
- **Charts**: Recharts for data visualization
- **Icons**: Emoji icons for lightweight implementation

## Design System

The app uses a contemplative, misty design inspired by the book cover:
- **Primary**: Deep blue-grey gradients (#1C2B3A)
- **Accent**: Kaizen Academy yellow (#FFD559) used sparingly
- **Typography**: Light weight, generous letter-spacing
- **Components**: Custom CSS classes for consistent styling

## Getting Started

### Prerequisites
- Node.js 18+
- Firebase project with Authentication and Firestore enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd genba-ikigai-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Firebase config
```

4. Start development server:
```bash
npm run dev
```

### Firebase Setup

1. Create a Firebase project at console.firebase.google.com
2. Enable Authentication (Email/Password + Google)
3. Enable Firestore Database
4. Copy Firebase config to `.env` file
5. Deploy Firestore security rules:
```bash
firebase deploy --only firestore:rules
```

## Test Users

The app includes seeded test users:

- **Admin**: admin@genbatest.com / Admin@1234
- **Basic**: basic@genbatest.com / Basic@1234  
- **Premium**: premium@genbatest.com / Premium@1234

See `docs/TEST_USERS.md` for complete testing instructions.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, UserTier, Notif)
├── data/              # Static data (habits, prompts)
├── pages/             # Page components
├── services/          # Firebase service functions
├── utils/             # Utility functions
├── assets/            # Images and static assets
└── App.js             # Main app component with routing
```

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
firebase deploy
```

## Email Notifications

The app uses Firebase Trigger Email Extension for:
- New user signup notifications
- Admin messages to users
- Tier change notifications

See `docs/TEST_USERS.md` for email setup instructions.

## Security

- Firestore security rules enforce user data isolation
- Admin-only access to sensitive operations
- Tier-based feature gating
- Input validation and sanitization

## Contributing

1. Follow the existing code style and patterns
2. Test all changes with the seeded test users
3. Ensure mobile responsiveness (390px minimum width)
4. Use only book-derived content for habits and coaching

## License

Certified by Kaizen Academy Australia
