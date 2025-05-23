import React, { useState } from 'react';
import { Typography, Button, Input, Form, Space, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import CourseDetailCard from '../../components/CourseDetailCard';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CourseConfirm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { userState, unselectCourse, updateSubmission } = useAppContext();
  const [submitting, setSubmitting] = useState(false);
  
  // Redirect to course selection if no course is selected
  React.useEffect(() => {
    if (!userState.selectedCourse) {
      navigate('/courses');
    }
  }, [userState.selectedCourse, navigate]);

  if (!userState.selectedCourse) {
    return null;
  }

  const handleSubmit = async (values: { content: string }) => {
    setSubmitting(true);
    updateSubmission(values.content);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      // Randomly determine success or failure for demo purposes
      const isSuccess = Math.random() > 0.3;
      navigate(isSuccess ? '/success' : '/failure');
    }, 1500);
  };

  const handleCancel = () => {
    Modal.confirm({
      title: '确认取消',
      content: '确定要取消选择此课题吗？所有已填写的信息将丢失。',
      onOk: () => {
        unselectCourse();
        navigate('/courses');
      }
    });
  };

  return (
    <div className="animate-fadeIn">
      <Title level={2} className="mb-6">确认选择</Title>
      
      {userState.selectedCourse && (
        <CourseDetailCard course={userState.selectedCourse} />
      )}
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ content: userState.submission.content }}
      >
        <Form.Item
          name="content"
          label={
            <Text strong>毕业设计（论文）要求解决的问题及重点等：</Text>
          }
          rules={[
            { required: true, message: '请输入内容' },
            { min: 50, message: '内容至少50个字符' }
          ]}
        >
          <TextArea 
            rows={6} 
            placeholder="请输入..."
            className="resize-none"
            onChange={(e) => updateSubmission(e.target.value)}
          />
        </Form.Item>
        
        <div className="flex justify-end mt-8">
          <Space>
            <Button onClick={handleCancel}>退选课题</Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={submitting}
            >
              选择课题
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default CourseConfirm;