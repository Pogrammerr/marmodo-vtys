export interface Homework {
  id: number;
  label: string;
  deadline: string;
  url: string;
}

export interface Post {
  id: number;
  creator: User
  header: string;
  homework: Homework;
}

export interface Class {
  id: number;
  name: string;
  creator: User;
  students: User[];
  posts: Post[]
}

export interface User {
  id: number;
  email: string;
  jwtToken: string;
  firstName: string;
  lastName: string;
  posts: Post[];
  classes: Class[];
  isLoggedIn: boolean;
}

export interface State {
  user: User
}