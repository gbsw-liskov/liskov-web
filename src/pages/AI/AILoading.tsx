import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiLoading } from "@/assets";

export default function AILoading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/ai/createlist");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-w-full min-h-screen">
      <img
        className="w-[186px] h-[186px] animate-spin-slow"
        src={AiLoading}
        alt="로딩 아이콘"
      />
      <h1 className="text-4xl font-bold text-black pt-[98px] leading-normal text-center">
        AI가 최적의 체크리스트를<br />
        생성하는 중입니다...
      </h1>

      <style>
        {`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 2s linear infinite;
          }
        `}
      </style>
    </div>
  );
}