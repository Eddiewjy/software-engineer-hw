import React from 'react';
import { Typography, Card, Statistic, Row, Col, List, Tag, Button } from 'antd';
import { 
  BookOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  TeamOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { userState } = useAppContext();
  
  // Student dashboard
  const studentDashboard = (
    <>
      <Title level={2} className="mb-6">学生选课系统主页</Title>
      
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="可选课题总数" 
              value={28} 
              prefix={<BookOutlined />} 
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="已选课题" 
              value={0} 
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="选课截止日期" 
              value="15天" 
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="已选人数比例" 
              value="45%" 
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card title="通知公告" className="mb-8">
        <List
          itemLayout="horizontal"
          dataSource={[
            {
              title: '关于2025届毕业设计选题工作的通知',
              date: '2024-11-15',
              tag: '重要'
            },
            {
              title: '毕业设计指导教师答疑时间安排',
              date: '2024-11-10',
              tag: '课程'
            },
            {
              title: '关于毕业设计选题系统使用指南',
              date: '2024-11-05',
              tag: '指南'
            }
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div className="flex items-center">
                    <a href="#">{item.title}</a>
                    <Tag color={item.tag === '重要' ? 'red' : 'blue'} className="ml-2">
                      {item.tag}
                    </Tag>
                  </div>
                }
                description={item.date}
              />
            </List.Item>
          )}
        />
      </Card>
      
      <Card title="快速入口">
        <div className="flex flex-wrap gap-4">
          <Button type="primary" size="large" onClick={() => navigate('/courses')}>
            开始选择课题
          </Button>
          <Button size="large">
            查看选课指南
          </Button>
          <Button size="large">
            联系管理员
          </Button>
        </div>
      </Card>
    </>
  );
  
  // Teacher dashboard (placeholder for future implementation)
  const teacherDashboard = (
    <>
      <Title level={2} className="mb-6">教师管理系统主页</Title>
      
      <Paragraph className="text-gray-500 mb-8">
        教师端功能正在开发中，将支持课题管理、学生选课审核等功能。
      </Paragraph>
      
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="已发布课题" 
              value={3} 
              prefix={<BookOutlined />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="学生申请" 
              value={5} 
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="待审核" 
              value={2} 
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="已确认学生" 
              value={3} 
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card className="mb-6">
        <div className="text-center py-8">
          <Title level={4} className="mb-4">教师端功能待实现</Title>
          <Paragraph className="text-gray-500">
            此部分将包含课题管理、学生申请审核、进度跟踪等功能
          </Paragraph>
        </div>
      </Card>
    </>
  );
  
  return (
    <div className="animate-fadeIn">
      {userState.role === 'student' ? studentDashboard : teacherDashboard}
    </div>
  );
};

export default HomePage;