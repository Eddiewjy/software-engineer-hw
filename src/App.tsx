import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import AppLayout from './components/Layout/AppLayout';
import HomePage from './pages/HomePage';
import CourseSelection from './pages/StudentPages/CourseSelection';
import CourseConfirm from './pages/StudentPages/CourseConfirm';
import SuccessPage from './pages/StudentPages/SuccessPage';
import FailurePage from './pages/StudentPages/FailurePage';
import TeacherDashboard from './pages/TeacherPages/TeacherDashboard';
import { AppProvider, useAppContext } from './context/AppContext';
import './index.css';

// Custom theme for Ant Design
const theme = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 4,
  },
};

// Route guard for student/teacher routes
const RoleRoute: React.FC<{
  children: React.ReactNode;
  requiredRole: 'student' | 'teacher';
}> = ({ children, requiredRole }) => {
  const { userState } = useAppContext();
  
  if (userState.role !== requiredRole) {
    return <Navigate to={requiredRole === 'student' ? '/' : '/teacher'} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={
            <RoleRoute requiredRole="student">
              <HomePage />
            </RoleRoute>
          } />
          <Route path="/courses" element={
            <RoleRoute requiredRole="student">
              <CourseSelection />
            </RoleRoute>
          } />
          <Route path="/confirm" element={
            <RoleRoute requiredRole="student">
              <CourseConfirm />
            </RoleRoute>
          } />
          <Route path="/success" element={
            <RoleRoute requiredRole="student">
              <SuccessPage />
            </RoleRoute>
          } />
          <Route path="/failure" element={
            <RoleRoute requiredRole="student">
              <FailurePage />
            </RoleRoute>
          } />
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={
            <RoleRoute requiredRole="teacher">
              <TeacherDashboard />
            </RoleRoute>
          } />
          <Route path="/teacher/*" element={
            <RoleRoute requiredRole="teacher">
              <TeacherDashboard />
            </RoleRoute>
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ConfigProvider>
  );
}

export default App;