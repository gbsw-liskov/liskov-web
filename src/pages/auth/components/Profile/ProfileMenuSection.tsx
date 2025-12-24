import ProfileMenu from "./ProfileMenu";
import * as Image from "@/assets";
import { useNavigate } from 'react-router-dom';

interface ProfileMenuItem {
  imageNum: number;
  title: string;
  onClick: () => void;
}

interface ProfileMenuSectionProps {
  menuItems: ProfileMenuItem[];
}

export default function ProfileMenuSection({
  menuItems,
}: ProfileMenuSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[268px]">
      <div className="flex justify-between w-full mt-10">
        {menuItems.map((item) => (
          <ProfileMenu
            key={item.imageNum}
            imageNum={item.imageNum}
            title={item.title}
            onClick={item.onClick}
          />
        ))}
      </div>
      <div onClick={() => navigate('/loan')} className="flex justify-between w-full h-[118px] bg-white mt-6 cursor-pointer rounded-[5px]">
        <div className="w-[240px] h-[74px] pt-[27px] pl-[13px]">
          <p className="text-black text-[16px] font-bold mb-[8px]">
            대출 가이드
          </p>
          <p className="text-[#757575] text-[12px] font-medium">
            나에게 딱 맞는 대출 가이드
            <br />
            확인해보기
          </p>
        </div>
        <div className="flex items-center w-[132px] h-full">
          <img
            className="w-[124px] h-[70px]"
            src={Image.House3}
            alt="아이패드 지도 아이콘"
          />
        </div>
      </div>
    </div>
  );
}
