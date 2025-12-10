import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteUserAPI, getProfileAPI, updatePasswordAPI, updateUsernameAPI } from "@/api/auth.api";
import type { PasswordForm, User, UserNameForm } from "@/types/auth";

export default function useProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const res = await getProfileAPI(token);
      setUserData(res.data.data);
    } catch (e: any) {
      console.error("프로필 조회 실패:", e);

      if (e.response?.status === 401 || e.response?.status === 403) {
        toast.error("인증이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getName = async () => {
    const saved = localStorage.getItem("username");
    if (saved) return saved;

    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    const res = await getProfileAPI(token);
    const user = res.data.data;

    const fullName = `${user.firstName} ${user.lastName}`;
    localStorage.setItem("username", fullName);

    return fullName;
  };

  const updateUserName = async (form: UserNameForm) => {
    try {
      const token = localStorage.getItem("accessToken");

      await updateUsernameAPI(form, token!);

      localStorage.removeItem("username");

      const res = await getProfileAPI(token!);
      const user = res.data.data;

      const fullName = `${user.firstName} ${user.lastName}`;

      localStorage.setItem("username", fullName);

      window.dispatchEvent(new Event("storage"));

      toast.success("이름이 변경되었습니다.");

      navigate("/profile");
    } catch (e: any) {
      console.error("이름 변경 실패:", e);

      if (e.response?.status === 401 || e.response?.status === 403) {
        toast.error("인증이 만료되었습니다. 다시 로그인해주세요.");
      }
    }
  };

  const updatePassword = async (form: PasswordForm) => {
    try {
      const token = localStorage.getItem("accessToken");

      await updatePasswordAPI(form, token!);
      navigate("/profile");
      toast.success("비밀번호가 변경되었습니다.");
    } catch (e: any) {
      console.error("비밀번호 변경 실패:", e);

      if (e.response?.status === 401 || e.response?.status === 403) {
        toast.error("인증이 만료되었습니다. 다시 로그인해주세요.");
        // localStorage.clear();
        // navigate("/login");
      }
    }
  };

  const deleteUser = async () => {
    try{
      const token = localStorage.getItem("accessToken");
      
      await deleteUserAPI(token!);
      localStorage.clear();
      navigate("/");
      toast.success("회원 탈퇴를 완료했습니다.");
    } catch(e: any){
      console.error("회원 탈퇴 실패 : ", e);

      if (e.response?.status === 401 || e.response?.status === 403) {
        toast.error("인증이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("로그아웃 되었습니다.");
  };

  useEffect(() => {
    getProfile();
  }, []);

  return { userData, logout, getName, updateUserName, updatePassword, deleteUser };
}
