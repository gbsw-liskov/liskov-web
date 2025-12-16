import { Ai } from "@/assets";

interface AILoadingProps{
  title: string;
}

export default function AILoading( {title}:AILoadingProps ) {
  return (
    <div className="fixed inset-0 flex flex-col z-[1000] items-center justify-center min-w-full min-h-screen bg-white">
      <img
        className="w-[186px] h-[186px] animate-spin-slow"
        src={Ai}
        alt="로딩 아이콘"
      />
      <h1 className="text-4xl font-bold text-black pt-[98px] leading-normal text-center">
        AI가 최적의 {title}를
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
