// This is a mock service for authentication
// In a real app, this would make actual API calls to a backend server

import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock database of users
const MOCK_USERS = [
  {
    id: '1',
    email: 'user1@example.com',
    password: 'password123',
    name: 'John Doe',
    votingHistory: [],
    votingCenter: 'Center A'
  },
  {
    id: '2',
    email: 'user2@example.com',
    password: 'password123',
    name: 'Jane Smith',
    votingHistory: [],
    votingCenter: 'Center B'
  }
];

// Mock voting centers
const MOCK_VOTING_CENTERS = [
  {
    id: '1',
    centerCode: 'CENTER-A',
    centerName: 'Center A',
    location: 'Downtown',
    electionName: 'General Election 2023'
  },
  {
    id: '2',
    centerCode: 'CENTER-B',
    centerName: 'Center B',
    location: 'Uptown',
    electionName: 'General Election 2023'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const AuthService = {
  // Login user
  login: async (email, password) => {
    try {
      // Simulate API call delay
      await delay(1000);
      
      // Find user in mock database
      const user = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (user) {
        // Remove password before storing or returning
        const { password, ...userWithoutPassword } = user;
        
        // Store user in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  },
  
  // Register user
  register: async (name, email, password) => {
    try {
      // Simulate API call delay
      await delay(1000);
      
      // Check if user already exists
      const existingUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (existingUser) {
        return { success: false, error: 'Email already in use' };
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
        votingHistory: [],
        votingCenter: 'Center A' // Assign a default voting center
      };
      
      // In a real app, we would send this to the backend
      // For demo, we'll just simulate success
      
      // Remove password before storing or returning
      const { password: pwd, ...userWithoutPassword } = newUser;
      
      // Store user in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An error occurred during registration' };
    }
  },
  
  // Logout user
  logout: async () => {
    try {
      await AsyncStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'An error occurred during logout' };
    }
  },
  
  // Verify voting center
  verifyVotingCenter: async (centerCode, userId) => {
    try {
      // Simulate API call delay
      await delay(800);
      
      // Find the voting center
      const center = MOCK_VOTING_CENTERS.find(
        c => c.centerCode.toLowerCase() === centerCode.toLowerCase()
      );
      
      if (!center) {
        return { success: false, error: 'Invalid voting center code' };
      }
      
      // Find the user
      const user = MOCK_USERS.find(u => u.id === userId);
      
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      
      // Check if user is assigned to this center
      const isUserInCenter = user.votingCenter.toLowerCase().includes(center.centerName.toLowerCase());
      
      if (!isUserInCenter) {
        return { 
          success: false, 
          error: 'You are not registered at this voting center'
        };
      }
      
      return { 
        success: true, 
        centerInfo: center
      };
    } catch (error) {
      console.error('Verification error:', error);
      return { success: false, error: 'An error occurred during verification' };
    }
  },
  
  // Update voting history
  updateVotingHistory: async (userId, votingData) => {
    try {
      // Simulate API call delay
      await delay(1000);
      
      // In a real app, we would send this to the backend
      // For demo, we'll just simulate success
      
      return { success: true };
    } catch (error) {
      console.error('Update voting history error:', error);
      return { success: false, error: 'Failed to update voting history' };
    }
  }
};