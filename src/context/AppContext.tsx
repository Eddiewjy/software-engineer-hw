import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, UserState } from '../types';

interface AppContextProps {
  userState: UserState;
  selectCourse: (course: Course) => void;
  unselectCourse: () => void;
  updateSubmission: (content: string) => void;
  setUserRole: (role: 'student' | 'teacher') => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userState, setUserState] = useState<UserState>({
    role: 'student',
    selectedCourse: null,
    submission: {
      content: ''
    }
  });

  const selectCourse = (course: Course) => {
    setUserState(prev => ({
      ...prev,
      selectedCourse: course
    }));
  };

  const unselectCourse = () => {
    setUserState(prev => ({
      ...prev,
      selectedCourse: null,
      submission: { content: '' }
    }));
  };

  const updateSubmission = (content: string) => {
    setUserState(prev => ({
      ...prev,
      submission: { content }
    }));
  };

  const setUserRole = (role: 'student' | 'teacher') => {
    setUserState(prev => ({
      ...prev,
      role
    }));
  };

  return (
    <AppContext.Provider value={{ 
      userState, 
      selectCourse, 
      unselectCourse, 
      updateSubmission,
      setUserRole
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};