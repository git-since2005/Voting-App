import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const loadStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from storage', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredUser();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await AuthService.login(email, password);
      if (result.success) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Login error', error);
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const result = await AuthService.register(name, email, password);
      if (result.success) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Registration error', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const updateVotingHistory = async (votingData) => {
    try {
      if (!user) return { success: false, error: 'User not logged in' };
      
      // Call the service to update voting history on the backend
      const result = await AuthService.updateVotingHistory(user.id, votingData);
      
      if (result.success) {
        // Update local user state
        const updatedUser = {
          ...user,
          votingHistory: [...user.votingHistory, {
            date: new Date().toISOString(),
            ...votingData
          }]
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      
      return result;
    } catch (error) {
      console.error('Update voting history error', error);
      return { success: false, error: 'Failed to update voting history' };
    }
  };

  const verifyVotingCenter = async (centerCode) => {
    try {
      if (!user) return { success: false, error: 'User not logged in' };
      
      // Call the service to verify the voting center
      return await AuthService.verifyVotingCenter(centerCode, user.id);
    } catch (error) {
      console.error('Verification error', error);
      return { success: false, error: 'Verification failed' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateVotingHistory,
        verifyVotingCenter
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};