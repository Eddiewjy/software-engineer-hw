import React, { useState } from 'react';
import { Typography, Card, Tabs, Table, Tag, Button, Input, Select, Space, Modal, Form, Upload, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { MOCK_COURSES, MOCK_STUDENTS, MOCK_APPLICATIONS } from '../../constants/mockData';
import type { Course, Student, CourseApplication } from '../../types';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;

const TeacherDashboard: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Course Management
  const courseColumns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '课题名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '状态',
      key: 'status',
      width: 120,
      render: () => (
        <Tag color="green">已审核</Tag>
      ),
    },
    {
      title: '创建时间',
      key: 'createdAt',
      width: 180,
      render: () => '2024-03-15 10:00:00',
    },
    {
      title: '学期',
      dataIndex: 'academicYear',
      key: 'academicYear',
      width: 120,
      render: () => '2024-2025',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: Course) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // Student Management
  const studentColumns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '学生姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: '专业',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          pending: 'gold',
          approved: 'green',
          rejected: 'red',
        };
        const texts = {
          pending: '待审核',
          approved: '已确认',
          rejected: '已拒绝',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{texts[status as keyof typeof texts]}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Student) => (
        <Space size="middle">
          <Button type="primary" size="small">
            接受
          </Button>
          <Button danger size="small">
            拒绝
          </Button>
          <Button type="link" size="small">
            查看详情
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddCourse = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      setIsModalVisible(false);
      form.resetFields();
      message.success('课题添加成功');
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="animate-fadeIn">
      <Title level={2} className="mb-6">教师管理系统</Title>
      
      <Tabs defaultActiveKey="1" className="mb-6">
        <TabPane tab="课题管理" key="1">
          <div className="mb-4 flex justify-between items-center">
            <Space>
              <Select
                defaultValue={selectedYear}
                style={{ width: 120 }}
                onChange={setSelectedYear}
              >
                <Option value="2024-2025">2024-2025</Option>
                <Option value="2023-2024">2023-2024</Option>
              </Select>
              <Input
                placeholder="搜索课题..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 200 }}
              />
            </Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCourse}>
              添加课题
            </Button>
          </div>
          
          <Table
            columns={courseColumns}
            dataSource={MOCK_COURSES}
            rowKey="id"
            pagination={{
              total: MOCK_COURSES.length,
              pageSize: 10,
              showSizeChanger: false,
            }}
          />
        </TabPane>
        
        <TabPane tab="学生管理" key="2">
          <div className="mb-4">
            <Input
              placeholder="搜索学生..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
          </div>
          
          <Table
            columns={studentColumns}
            dataSource={MOCK_STUDENTS}
            rowKey="id"
            pagination={{
              total: MOCK_STUDENTS.length,
              pageSize: 10,
              showSizeChanger: false,
            }}
          />
        </TabPane>
      </Tabs>

      <Modal
        title="添加课题"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            academicYear: '2024-2025',
            type: '1',
          }}
        >
          <Form.Item
            name="field"
            label="课题面向专业"
            rules={[{ required: true, message: '请选择课题面向专业' }]}
          >
            <Select>
              <Option value="计算机科学与技术">计算机科学与技术</Option>
              <Option value="软件工程">软件工程</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="课题名称"
            rules={[{ required: true, message: '请输入课题名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="课题类型"
            rules={[{ required: true, message: '请选择课题类型' }]}
          >
            <Select>
              <Option value="1">类型1</Option>
              <Option value="2">类型2</Option>
              <Option value="3">类型3</Option>
              <Option value="4">类型4</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="毕业设计（论文）要求解决的问题及重点等"
            rules={[{ required: true, message: '请输入课题描述' }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>

          <Form.Item
            name="attachment"
            label="附件上传"
          >
            <Upload>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherDashboard;