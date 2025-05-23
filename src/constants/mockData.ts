import { Course, Student, CourseApplication } from '../types';

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    name: '数据结构与算法分析',
    remainingSlots: 2,
    instructor: {
      name: '张教授',
      id: '1111111',
      title: '教授',
      department: '计算机科学系',
      email: 'zhang@university.edu'
    },
    field: '计算机科学',
    type: '理论研究',
    description: '研究高效的数据结构和算法设计，解决计算复杂性问题。'
  },
  {
    id: '2',
    name: '人工智能基础',
    remainingSlots: 1,
    instructor: {
      name: '李教授',
      id: '2222222',
      title: '副教授',
      department: '人工智能研究所',
      email: 'li@university.edu'
    },
    field: '人工智能',
    type: '应用研究',
    description: '探索机器学习和深度学习在实际应用中的创新方法。'
  },
  {
    id: '3',
    name: '软件工程实践',
    remainingSlots: 3,
    instructor: {
      name: '王教授',
      id: '3333333',
      title: '教授',
      department: '软件工程系',
      email: 'wang@university.edu'
    },
    field: '软件工程',
    type: '项目实践',
    description: '通过实际项目开发，掌握软件工程的核心原则和最佳实践。'
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: '张三',
    studentId: '1111111',
    grade: '2024',
    department: '计算机科学系',
    major: '计算机科学与技术',
    gpa: 5.0,
    email: 'aaa@hdu.edu.cn',
    phone: '88888888888',
    status: 'pending'
  },
  {
    id: '2',
    name: '李四',
    studentId: '2222222',
    grade: '2024',
    department: '软件工程系',
    major: '软件工程',
    gpa: 4.8,
    email: 'bbb@hdu.edu.cn',
    phone: '99999999999',
    status: 'approved'
  },
  {
    id: '3',
    name: '王五',
    studentId: '3333333',
    grade: '2024',
    department: '人工智能学院',
    major: '人工智能',
    gpa: 4.5,
    email: 'ccc@hdu.edu.cn',
    phone: '77777777777',
    status: 'rejected'
  }
];

export const MOCK_APPLICATIONS: CourseApplication[] = [
  {
    id: '1',
    courseId: '1',
    studentId: '1',
    status: 'pending',
    submittedAt: '2024-03-15T10:00:00Z',
    academicYear: '2024-2025'
  },
  {
    id: '2',
    courseId: '2',
    studentId: '2',
    status: 'approved',
    submittedAt: '2024-03-14T09:30:00Z',
    academicYear: '2024-2025'
  },
  {
    id: '3',
    courseId: '3',
    studentId: '3',
    status: 'rejected',
    submittedAt: '2024-03-13T14:20:00Z',
    academicYear: '2024-2025'
  }
];