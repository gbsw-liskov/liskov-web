import { IoPerson } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import type { User } from "@/types/auth";

interface ProfileHeaderProps {
  userData: User | null;
  onclick: () => void;
}

export default function ProfileHeader({ userData, onclick }: ProfileHeaderProps) {
  return (
    <div className="w-full h-[65px] flex justify-between items-center">
      <div className="flex w-[254px] items-center">
        <div className="rounded-full mr-5 w-[64px] h-[64px] bg-[#58CCFF] flex justify-center items-center">
          <IoPerson color="#ffffff" size={30} />
        </div>
        <div className="flex flex-col justify-between w-auto h-full">
          <p className="text-black text-[20px] font-semibold">
            {userData
              ? `${userData.firstName} ${userData.lastName}`
              : "로딩 중..."}
          </p>
          <p className="text-[#BEBEBE] text-[14px] font-medium">
            {userData?.email || "로딩 중..."}
          </p>
        </div>
      </div>
      <div onClick={onclick} className="w-[30px] h-[30px] cursor-pointer">
        <MdOutlineSettings size={30} />
      </div>
    </div>
  );
}
