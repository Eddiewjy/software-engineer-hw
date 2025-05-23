import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import ResultPage from '../../components/shared/ResultPage';

const { Text } = Typography;

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { userState, unselectCourse } = useAppContext();
  
  useEffect(() => {
    if (!userState.selectedCourse) {
      navigate('/courses');
    }
  }, [userState.selectedCourse, navigate]);
  
  if (!userState.selectedCourse) {
    return null;
  }

  const details = (
    <>
      <div className="mb-4">
        <Text strong>选择的课题：</Text>
        <div className="mt-1">{userState.selectedCourse.name}</div>
      </div>
      
      <div className="mb-4">
        <Text strong>指导教师：</Text>
        <div className="mt-1">
          {userState.selectedCourse.instructor.name} ({userState.selectedCourse.instructor.title})
        </div>
      </div>
      
      <div>
        <Text strong>您的提交内容：</Text>
        <div className="mt-1 p-3 bg-white rounded">
          {userState.submission.content}
        </div>
      </div>
      
      <div className="mt-4 text-gray-500">
        提交时间：{new Date().toLocaleString('zh-CN')}
      </div>
    </>
  );

  return (
    <ResultPage
      type="success"
      title="课题选择成功！"
      subTitle="您已成功选择了毕业设计课题，请等待教师确认。"
      details={details}
    />
  );
};

export default SuccessPage;