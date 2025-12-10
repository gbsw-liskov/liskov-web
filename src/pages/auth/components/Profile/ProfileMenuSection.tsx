import ProfileMenu from "./ProfileMenu";
import * as Image from "@/assets";

interface ProfileMenuItem {
  imageNum: number;
  title: string;
}

interface ProfileMenuSectionProps {
  menuItems: ProfileMenuItem[];
}

export default function ProfileMenuSection({
  menuItems,
}: ProfileMenuSectionProps) {
  return (
    <div className="w-full h-[268px]">
      <div className="flex justify-between w-full mt-10">
        {menuItems.map((item) => (
          <ProfileMenu
            key={item.imageNum}
            imageNum={item.imageNum}
            title={item.title}
          />
        ))}
      </div>
      <div className="flex justify-between w-full h-[118px] bg-white mt-6 cursor-pointer rounded-[5px]">
        <div className="w-[240px] h-[74px] pt-[27px] pl-[13px]">
          <p className="text-black text-[16px] font-bold mb-[8px]">
            나에게 딱 맞는 방 찾기
          </p>
          <p className="text-[#757575] text-[12px] font-medium">
            지도를 통해 내 주변 나에게 딱 맞는 방을
            <br />
            찾아보세요!
          </p>
        </div>
        <div className="w-[132px] h-full">
          <img
            className="w-full h-full"
            src={Image.PadMap}
            alt="아이패드 지도 아이콘"
          />
        </div>
      </div>
    </div>
  );
}
