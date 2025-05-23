import React from 'react';
import { Typography, Alert } from 'antd';
import { useAppContext } from '../../context/AppContext';
import ResultPage from '../../components/shared/ResultPage';

const { Paragraph } = Typography;

const FailurePage: React.FC = () => {
  const { userState } = useAppContext();
  
  const errorReasons = [
    '该课题已被其他学生选择，名额已满',
    '您的专业与课题要求不符',
    '系统处理请求时出现错误',
    '教师暂时关闭了该课题的选择功能'
  ];
  
  const randomReason = errorReasons[Math.floor(Math.random() * errorReasons.length)];
  
  const details = (
    <>
      <Alert
        message="错误原因"
        description={randomReason}
        type="error"
        showIcon
        className="mb-6"
      />
      
      {userState.selectedCourse && (
        <Paragraph>
          您尝试选择的课题：<strong>{userState.selectedCourse.name}</strong>
        </Paragraph>
      )}
    </>
  );

  return (
    <ResultPage
      type="failure"
      title="课题选择失败"
      subTitle="很抱歉，您的课题选择请求未能成功处理。"
      details={details}
      mainActionText="重新选择"
    />
  );
};

export default FailurePage;