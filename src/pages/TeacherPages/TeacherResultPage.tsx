import React from 'react';
import { Typography } from 'antd';
import ResultPage from '../../components/shared/ResultPage';

const { Text } = Typography;

interface TeacherResultPageProps {
  type: 'success' | 'failure';
  action: string;
  details?: {
    studentName?: string;
    courseName?: string;
    operation?: string;
    timestamp?: string;
  };
}

const TeacherResultPage: React.FC<TeacherResultPageProps> = ({
  type,
  action,
  details
}) => {
  const resultDetails = details && (
    <>
      {details.studentName && (
        <div className="mb-3">
          <Text strong>学生姓名：</Text>
          <Text>{details.studentName}</Text>
        </div>
      )}
      
      {details.courseName && (
        <div className="mb-3">
          <Text strong>课题名称：</Text>
          <Text>{details.courseName}</Text>
        </div>
      )}
      
      {details.operation && (
        <div className="mb-3">
          <Text strong>操作类型：</Text>
          <Text>{details.operation}</Text>
        </div>
      )}
      
      {details.timestamp && (
        <div className="text-gray-500">
          操作时间：{details.timestamp}
        </div>
      )}
    </>
  );

  return (
    <ResultPage
      type={type}
      title={type === 'success' ? `${action}成功` : `${action}失败`}
      subTitle={type === 'success' ? '操作已完成' : '操作未能完成，请重试'}
      details={resultDetails}
      mainActionText={type === 'success' ? '返回列表' : '重试'}
      backPath="/teacher"
      mainActionPath="/teacher"
    />
  );
};

export default TeacherResultPage;