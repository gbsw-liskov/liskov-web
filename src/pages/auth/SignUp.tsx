import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { validateSignup } from "@/utils/validateSignup";
import { SIGNUP_FIELDS } from "@/constants/auth";
import * as C from "./components";
import type { SignupForm } from "@/types/auth";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState<SignupForm>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [passwordCheck, setPasswordCheck] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "passwordCheck") {
      setPasswordCheck(value);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateSignup(form, passwordCheck);
    if (error) {
      toast.error(error);
      return;
    }

    await signup(form);
  };

  const formData = { ...form, passwordCheck };

  return (
    <C.AuthLayout title="회원가입" height="h-[810px]">
      <C.AuthForm
        fields={SIGNUP_FIELDS}
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        submitText="회원가입"
        footerText="계정이 있으신가요?"
        footerLinkText="로그인"
        onFooterLinkClick={() => navigate("/signin")}
        height="h-[696px]"
      />
    </C.AuthLayout>
  );
}
