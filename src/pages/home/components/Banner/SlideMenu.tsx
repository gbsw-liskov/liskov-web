import * as Image from "@/assets";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function SlideMenu() {
  return (
    <div className="w-[551px] h-[343px] rounded-[5px] cursor-pointer">
      <div
        className="w-[551px] h-[343px] bg-cover bg-center z-50 rounded-[5px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 100%), url(${Image.SlideBar1})`,
        }}
      >
        <div className="flex flex-col justify-between w-full h-full pl-[22px] pt-4 pb-[26px]">
          <div>
            <h1 className="text-white text-[16px] font-bold">부동산 이슈</h1>
            <h1 className="text-white text-[10px] font-medium mt-[5px]">
              실시간 부동산 제공합니다
            </h1>
          </div>
          <div className="flex items-center justify-between pr-5">
            <h1 className="text-white font-bold text-[17px]">
              NH투자증권, 패밀리오피스 세미나 개최…부동산 이슈 점검
            </h1>
            <MdKeyboardArrowRight size={30} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
