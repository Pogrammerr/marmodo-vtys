export interface Homework {
  id: string;
  name: string;
  deadline: string;
  filePath: string;
  details: string;
  completedUsers: User[];
}

export interface Post {
  id: string;
  author: User
  details: string;
  createdAt: string; // ISO format
  homework?: Homework;
}

export interface Class {
  id: string;
  name: string;
  creator: User;
  students: User[];
  posts: Post[]
}

export interface User {
  id: string;
  email: string;
  jwtToken: string;
  firstName: string;
  lastName: string;
  profileImgPath: string;
  posts: Post[];
  classes: Class[];
  classAmount: string;
  isLoggedIn: boolean;
}

export interface State {
  user: User
}