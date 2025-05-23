import React, { useState } from 'react';
import { Typography, Input, Empty, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CourseCard from '../../components/CourseCard';
import { MOCK_COURSES } from '../../constants/mockData';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const CourseSelection: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  
  const navigate = useNavigate();
  const { selectCourse } = useAppContext();
  
  const filteredCourses = MOCK_COURSES.filter(course => 
    course.name.toLowerCase().includes(searchText.toLowerCase()) ||
    course.instructor.name.toLowerCase().includes(searchText.toLowerCase()) ||
    course.field.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const handleSelectCourse = (courseId: string) => {
    const selectedCourse = MOCK_COURSES.find(course => course.id === courseId);
    if (selectedCourse) {
      selectCourse(selectedCourse);
      navigate('/confirm');
    }
  };

  return (
    <div className="animate-fadeIn">
      <Title level={2} className="mb-6">课题选择</Title>
      
      <div className="mb-6">
        <Input
          size="large"
          placeholder="搜索课题、教师或专业方向..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-xl"
        />
      </div>
      
      {paginatedCourses.length > 0 ? (
        <>
          {paginatedCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onSelect={() => handleSelectCourse(course.id)}
            />
          ))}
          
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              total={filteredCourses.length}
              pageSize={pageSize}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <Empty 
          description="没有找到匹配的课题" 
          className="my-12"
        />
      )}
    </div>
  );
};

export default CourseSelection;