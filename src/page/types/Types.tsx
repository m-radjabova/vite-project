export interface Announcement {
    id: string;
    theme: string;
    subjectName: string;
    teacherName: string;
    groupNumber: string;
    groupName: string;
    scheduleDate: string;
    para: string;
    address: string;
    announcementText: string;
    teacherId: string;
    completed: boolean;
    createdAt: string;
}

export interface OpenClassApplication {
    id: string;
    theme: string;
    subjectName: string;
    teacherName: string;
    groupNumber: string;
    groupName: string;
    scheduleDate: string;
    scheduleTime: string;
    para: string;
    address: string;
    applicationText: string;
    teacherId: string;
    completed: boolean;
    createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  link: string;
  file: string;
  text: string;
  teacherId: string;
  createdAt: string;
}

export interface Teacher {
    id: string;
    username: string;
    email: string;
    roles: string[];
}