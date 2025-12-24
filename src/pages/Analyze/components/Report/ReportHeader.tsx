import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function ReportHeader() {
  const navigate = useNavigate();
  const goToBack = () => {navigate(-1);};
  return (
    <div className="relative pt-[80px] w-full h-[60px] flex items-center justify-center">
      <IoIosArrowBack
        onClick={goToBack}
        className="absolute left-0 text-3xl cursor-pointer"
      />
      <h1 className="text-[28px] font-semibold text-black">AI 매물 분석 리포트</h1>
    </div>
  );
}
