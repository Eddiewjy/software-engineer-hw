import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import { useAppContext } from '../../context/AppContext';

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { userState } = useAppContext();
  
  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout className="bg-gray-100">
        <Content className="m-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold">
              {userState.role === 'student' ? '学生端' : '教师端'}
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('zh-CN')}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;