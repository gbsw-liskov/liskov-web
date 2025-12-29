import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    toast.error("로그인이 필요합니다.");
    return <Navigate to="/signin" replace />;
  }

  return children;
}

