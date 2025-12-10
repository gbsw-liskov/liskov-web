import type { SignupForm } from "@/types/auth";

export const validateSignup = (
  form: SignupForm,
  passwordCheck: string
): string | null => {
  if (!form.email.trim()) return "이메일을 입력해주세요.";
  if (!form.firstName.trim()) return "성을 입력해주세요.";
  if (!form.lastName.trim()) return "이름을 입력해주세요.";
  if (!form.password.trim()) return "비밀번호를 입력해주세요.";
  if (!passwordCheck.trim()) return "비밀번호 확인을 입력해주세요.";
  if (form.password !== passwordCheck) return "비밀번호가 일치하지 않습니다.";

  return null;
};
