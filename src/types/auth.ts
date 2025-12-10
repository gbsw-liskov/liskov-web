export interface SignupForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserNameForm {
  firstName: string;
  lastName: string;
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
}