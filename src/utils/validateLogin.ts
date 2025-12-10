import type { LoginForm } from "@/types/auth";

export const validateLogin = (form: LoginForm): string | null => {
  if (!form.email.trim()) return "이메일을 입력해주세요.";
  if (!form.password.trim()) return "비밀번호를 입력해주세요.";
  return null;
};
