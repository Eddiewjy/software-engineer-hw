export interface Course {
  id: string;
  name: string;
  remainingSlots: number;
  instructor: {
    name: string;
    id: string;
    title: string;
    department: string;
    email: string;
  };
  field: string;
  type: string;
  description: string;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  department: string;
  major: string;
  gpa: number;
  email: string;
  phone: string;
  photoUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface UserState {
  role: 'student' | 'teacher';
  selectedCourse: Course | null;
  submission: {
    content: string;
  };
}

export interface CourseApplication {
  id: string;
  courseId: string;
  studentId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  academicYear: string;
}