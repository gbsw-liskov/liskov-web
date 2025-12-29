import { useState, useEffect, createElement } from "react";
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
        navigate("/signin");
        return;
      }

      const res = await getProfileAPI(token);
      setUserData(res.data.data);
    } catch (e: any) {
      console.error("프로필 조회 실패:", e);

      if (e.response?.status === 401 || e.response?.status === 403) {
        toast.error("인증이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.clear();
        navigate("/signin");
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
        localStorage.clear();
        navigate("/signin");
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
        navigate("/signin");
      }
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("로그아웃 되었습니다.");
  };

  const confirmLogout = () => {
    toast(
      (t) =>
        createElement(
          "div",
          { className: "flex items-center gap-3" },
          createElement("span", null, "정말 로그아웃 하시겠습니까?"),
          createElement(
            "button",
            {
              onClick: () => {
                toast.dismiss(t.id);
                logout();
              },
              className:
                "px-3 py-1 rounded bg-[#58CCFF] text-white text-sm font-semibold",
            },
            "예",
          ),
          createElement(
            "button",
            {
              onClick: () => toast.dismiss(t.id),
              className:
                "px-3 py-1 rounded border border-[#E5E7EB] text-sm font-semibold",
            },
            "아니오",
          ),
        ),
      { duration: 5000 },
    );
  };

  useEffect(() => {
    getProfile();
  }, []);

  return { userData, logout, confirmLogout, getName, updateUserName, updatePassword, deleteUser };
}
