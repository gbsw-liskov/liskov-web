import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ai } from "@/assets";

interface AILoadingProps {
  onComplete?: () => void;
}

export default function AILoading({ onComplete }: AILoadingProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      } else {
        navigate("/ai/createlist");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col z-[1000] items-center justify-center min-w-full min-h-screen bg-white">
      <img
        className="w-[186px] h-[186px] animate-spin-slow"
        src={Ai}
        alt="로딩 아이콘"
      />
      <h1 className="text-4xl font-bold text-black pt-[98px] leading-normal text-center">
        AI가 최적의 체크리스트를
        <br />
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
