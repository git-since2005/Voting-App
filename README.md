# VoteApp - Secure Voting Mobile Application

## Overview

VoteApp is a React Native mobile application designed to streamline the voting process. It provides secure authentication, QR code-based verification, and voting history tracking.

## Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: View your voting history and status
- **QR Code Scanning**: Verify your identity at voting centers
- **Double QR Code Generation**: Generate secure voting verification codes
- **Analytics**: View voting statistics (under development)

## Installation

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI

### Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd VoteApp
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Run on a device or emulator:
   - For Android: `npm run android` or `yarn android`
   - For iOS: `npm run ios` or `yarn ios`
   - For web: `npm run web` or `yarn web`

## Usage

### Authentication

- Register with your name, email, and password
- Login with your credentials

### Voting Process

1. Navigate to your assigned voting center
2. Click the floating QR code button in the app
3. Scan the voting center's QR code
4. After verification, show your generated QR code to the voting official
5. The official will scan your code to record your vote
6. Your voting history will be updated in the dashboard

## Project Structure

```
VoteApp/
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React Context providers
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # App screens
│   ├── services/         # API and backend services
│   └── utils/            # Utility functions
├── assets/               # Images and static assets
├── App.js                # Main application component
└── package.json          # Dependencies and scripts
```

## Backend Integration

The app is currently using a mock backend service for demonstration purposes. In a production environment, you would need to:

1. Set up a real backend server (Node.js, Django, etc.)
2. Implement proper authentication with JWT or similar
3. Create secure API endpoints for voting verification
4. Set up a database for user and voting records

## Security Considerations

- The QR codes should contain cryptographically secure tokens
- All API communications should use HTTPS
- User data should be encrypted at rest
- Implement rate limiting to prevent brute force attacks
- Add two-factor authentication for additional security

## License

This project is licensed under the MIT License - see the LICENSE file for details.