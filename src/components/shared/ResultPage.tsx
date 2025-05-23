import React from 'react';
import { Result, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ResultPageProps {
  type: 'success' | 'failure';
  title?: string;
  subTitle?: string;
  details?: React.ReactNode;
  backPath?: string;
  mainActionPath?: string;
  mainActionText?: string;
}

const ResultPage: React.FC<ResultPageProps> = ({
  type,
  title,
  subTitle,
  details,
  backPath,
  mainActionPath,
  mainActionText
}) => {
  const navigate = useNavigate();
  const { userState } = useAppContext();
  
  const defaultConfig = {
    success: {
      icon: <CheckCircleFilled className="text-green-500 text-7xl" />,
      title: userState.role === 'student' ? '提交成功' : '操作成功',
      subTitle: userState.role === 'student' ? '您的选题申请已成功提交' : '操作已成功完成',
      mainActionText: '返回列表',
      mainActionPath: userState.role === 'student' ? '/courses' : '/teacher',
      backPath: userState.role === 'student' ? '/' : '/teacher'
    },
    failure: {
      icon: <CloseCircleFilled className="text-red-500 text-7xl" />,
      title: userState.role === 'student' ? '提交失败' : '操作失败',
      subTitle: userState.role === 'student' ? '您的选题申请提交失败' : '操作未能完成',
      mainActionText: '重试',
      mainActionPath: userState.role === 'student' ? '/courses' : '/teacher',
      backPath: userState.role === 'student' ? '/' : '/teacher'
    }
  };

  const config = defaultConfig[type];

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <Result
        icon={config.icon}
        title={<Title level={2} className={type === 'success' ? 'text-green-500' : 'text-red-500'}>
          {title || config.title}
        </Title>}
        subTitle={subTitle || config.subTitle}
        extra={[
          <Button 
            type="primary"
            key="main"
            size="large"
            onClick={() => navigate(mainActionPath || config.mainActionPath)}
          >
            {mainActionText || config.mainActionText}
          </Button>,
          <Button
            key="back"
            size="large"
            onClick={() => navigate(backPath || config.backPath)}
          >
            返回首页
          </Button>
        ]}
      >
        {details && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            {details}
          </div>
        )}
        
        {type === 'failure' && (
          <div className="mt-6">
            <Text type="secondary">
              如果问题持续存在，请联系系统管理员获取帮助。
            </Text>
          </div>
        )}
      </Result>
    </div>
  );
};

export default ResultPage;