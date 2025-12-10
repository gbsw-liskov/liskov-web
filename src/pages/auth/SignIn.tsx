import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { validateLogin } from "@/utils/validateLogin";
import { LOGIN_FIELDS } from "@/constants/auth";
import * as C from "./components";
import type { LoginForm } from "@/types/auth";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateLogin(form);
    if (error) {
      toast.error(error);
      return;
    }

    await login(form);
  };

  return (
    <C.AuthLayout title="로그인">
      <C.AuthForm
        fields={LOGIN_FIELDS}
        formData={form as unknown as Record<string, string>}
        onChange={onChange}
        onSubmit={onSubmit}
        submitText="로그인"
        footerText="계정이 없으신가요?"
        footerLinkText="회원가입"
        onFooterLinkClick={() => navigate("/signup")}
      />
    </C.AuthLayout>
  );
}
