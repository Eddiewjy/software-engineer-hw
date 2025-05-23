import React from 'react';
import { Card, Button, Typography, Tag, Space } from 'antd';
import { Course } from '../types';

const { Title, Text } = Typography;

interface CourseCardProps {
  course: Course;
  onSelect: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  return (
    <Card 
      hoverable
      className="mb-4 border border-gray-200"
      title={
        <div className="flex justify-between items-center">
          <Title level={4} className="m-0">{course.name}</Title>
          <Tag color={course.remainingSlots > 0 ? 'green' : 'red'}>
            剩余可选人数: {course.remainingSlots}
          </Tag>
        </div>
      }
    >
      <Space direction="vertical" size="middle" className="w-full">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Text type="secondary">指导老师姓名:</Text>
            <Text strong className="ml-2">{course.instructor.name}</Text>
          </div>
          <div>
            <Text type="secondary">指导老师工号:</Text>
            <Text strong className="ml-2">{course.instructor.id}</Text>
          </div>
          <div>
            <Text type="secondary">指导老师职称:</Text>
            <Text strong className="ml-2">{course.instructor.title}</Text>
          </div>
          <div>
            <Text type="secondary">指导老师所在系:</Text>
            <Text strong className="ml-2">{course.instructor.department}</Text>
          </div>
          <div>
            <Text type="secondary">指导老师邮箱:</Text>
            <Text strong className="ml-2">{course.instructor.email}</Text>
          </div>
        </div>
        
        <div>
          <Text type="secondary">课题面向专业:</Text>
          <Text strong className="ml-2">{course.field}</Text>
        </div>
        
        <div>
          <Text type="secondary">题目类型:</Text>
          <Text strong className="ml-2">{course.type}</Text>
        </div>
        
        <div>
          <Text type="secondary">课题描述:</Text>
          <div className="mt-1 p-2 bg-gray-50 rounded">
            <Text>{course.description}</Text>
          </div>
        </div>
        
        <Button 
          type="primary" 
          block 
          onClick={onSelect}
          disabled={course.remainingSlots <= 0}
        >
          选择课题
        </Button>
      </Space>
    </Card>
  );
};

export default CourseCard;