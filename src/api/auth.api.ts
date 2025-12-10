import API from "./axios";
import type { SignupForm, LoginForm, UserNameForm, PasswordForm } from "@/types/auth";

export const signupAPI = (form: SignupForm) => {
  return API.post("/api/auth/signup", form);
};

export const loginAPI = (form: LoginForm) => {
  return API.post("/api/auth/login", form);
};

export const getProfileAPI = (token: string) => {
  return API.get("/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUsernameAPI = (form: UserNameForm, token: string) => {
  return API.put("/api/user/me", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePasswordAPI = (form: PasswordForm, token: string) => {
  return API.put("/api/user/me/password", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUserAPI = (token: string) => {
  return API.delete("/api/user/me",{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
}