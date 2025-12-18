import { HiCalculator } from "react-icons/hi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GrDocumentVerified } from "react-icons/gr";

interface CheckInfoMenuProps{
  icon: number;
  title: string;
  info: string;
}

export default function CheckInfoMenu({icon, title, info}: CheckInfoMenuProps){
  return (
    <div className="flex justify-center items-center w-full min-h-[81px]">
      <div className="flex w-[380px] min-h-[48px]">
        <div className="flex justify-center items-center w-11 h-11 bg-[#58CCFF]/10 rounded-[10px]">
          {icon == 1 ? (
            <HiCalculator color="#58CCFF" size={25} />
          ) : icon == 2 ? (
            <FaArrowTrendUp color="#58CCFF" size={20} />
          ) : (
            <GrDocumentVerified color="#58CCFF" size={20} />
          )}
        </div>
        <div className="flex flex-col min-w-[265px] h-full pl-[16px]">
          <h1 className="text-[15px] text-black">{title}</h1>
          <p className="text-[12px] text-[#757575]">{info}</p>
        </div>
      </div>
    </div>
  );
}