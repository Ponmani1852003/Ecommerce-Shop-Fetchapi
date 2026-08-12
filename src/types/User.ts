export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
}

export interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
}