import { Ai } from "@/assets";
import { useNavigate } from "react-router-dom";

export default function AiReportButton() {
  const navigate = useNavigate();

  const ButtonClicked = () => {
    navigate("");
  };

  return (
    <div
      onClick={ButtonClicked}
      className="fixed bottom-[70px] right-[70px] flex w-[85px] h-[85px] cursor-pointer justify-center items-center rounded-full bg-white [box-shadow:2px_4px_4px_0_rgba(0,0,0,0.25)] z-50"
    >
      <img className="w-[45px] h-[45px]" src={Ai} alt="AI 로고" />
    </div>
  );
}
