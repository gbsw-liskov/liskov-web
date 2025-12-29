import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signupAPI, loginAPI } from "@/api/auth.api";
import type { SignupForm, LoginForm } from "@/types/auth";

const useAuth = () => {
  const navigate = useNavigate();

  const signup = async (form: SignupForm) => {
    try {
      await signupAPI(form);
      toast.success("회원가입에 성공했습니다");
      navigate("/signin");
      return { success: true };
    } catch (e: unknown) {
      console.error(e);
      toast.error("회원가입 실패");
      return { success: false };
    }
  };

  const login = async (form: LoginForm) => {
    try {
      const res = await loginAPI(form);
      const { accessToken, refreshToken } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      toast.success("로그인 성공");
      navigate("/");

      return { success: true };
    } catch (e: unknown) {
      console.error(e);
      toast.error("로그인 실패");
      return { success: false };
    }
  };
  
  return { signup, login };
};

export default useAuth;
