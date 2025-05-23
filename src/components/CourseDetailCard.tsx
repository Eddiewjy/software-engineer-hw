import React from 'react';
import { Card, Typography, Descriptions, Divider } from 'antd';
import { Course } from '../types';

const { Title, Text } = Typography;

interface CourseDetailCardProps {
  course: Course;
}

const CourseDetailCard: React.FC<CourseDetailCardProps> = ({ course }) => {
  return (
    <Card className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="m-0">当前课题: {course.name}</Title>
        <Text>剩余可接受学生数量: {course.remainingSlots}</Text>
      </div>
      
      <Divider />
      
      <Title level={4} className="text-center mb-6">课题信息</Title>
      
      <Descriptions bordered column={2} size="middle" className="mb-6">
        <Descriptions.Item label="指导老师姓名" span={1}>
          {course.instructor.name}
        </Descriptions.Item>
        <Descriptions.Item label="指导老师工号" span={1}>
          {course.instructor.id}
        </Descriptions.Item>
        <Descriptions.Item label="指导老师职称" span={1}>
          {course.instructor.title}
        </Descriptions.Item>
        <Descriptions.Item label="指导老师所在系" span={1}>
          {course.instructor.department}
        </Descriptions.Item>
        <Descriptions.Item label="指导老师邮箱" span={1}>
          {course.instructor.email}
        </Descriptions.Item>
      </Descriptions>
      
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="课题面向专业">
          {course.field}
        </Descriptions.Item>
        <Descriptions.Item label="题目类型">
          {course.type}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CourseDetailCard;