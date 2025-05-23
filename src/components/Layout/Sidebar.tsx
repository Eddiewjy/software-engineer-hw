import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  AppstoreOutlined, 
  CheckCircleOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';
import { BookText, UserCircle } from 'lucide-react';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userState, setUserRole } = useAppContext();

  const studentItems = [
    {
      key: '/',
      icon: <AppstoreOutlined />,
      label: '主页面',
    },
    {
      key: '/courses',
      icon: <BookOutlined />,
      label: '选择课题',
    },
    {
      key: '/confirm',
      icon: <CheckCircleOutlined />,
      label: '确认信息',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: '个人信息',
    },
  ];

  const teacherItems = [
    {
      key: '/teacher',
      icon: <AppstoreOutlined />,
      label: '主页面',
    },
    {
      key: '/teacher/courses',
      icon: <BookOutlined />,
      label: '课题管理',
    },
    {
      key: '/teacher/students',
      icon: <TeamOutlined />,
      label: '学生管理',
    },
    {
      key: '/teacher/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const switchRole = () => {
    setUserRole(userState.role === 'student' ? 'teacher' : 'student');
    navigate(userState.role === 'student' ? '/teacher' : '/');
  };

  return (
    <Sider
      width={200}
      className="bg-white shadow-md"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="p-4 flex items-center justify-center border-b border-gray-200">
        <BookText className="text-blue-500 mr-2" size={24} />
        <span className="text-lg font-bold">Arco Pro</span>
      </div>
      
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={userState.role === 'student' ? studentItems : teacherItems}
        onSelect={({ key }) => navigate(key)}
      />
      
      <div 
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 flex items-center cursor-pointer hover:bg-gray-50"
        onClick={switchRole}
      >
        <UserCircle size={18} className="mr-2 text-blue-500" />
        <span className="text-sm">切换到{userState.role === 'student' ? '教师端' : '学生端'}</span>
      </div>
    </Sider>
  );
};

export default Sidebar;