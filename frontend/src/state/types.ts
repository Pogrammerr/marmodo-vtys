export interface Homework {
  id: number;
  label: string;
  deadline: string;
  url: string;
}

export interface User {
  id: number;
  email: string;
  jwtToken: string;
}

export interface State {
  user: User
}