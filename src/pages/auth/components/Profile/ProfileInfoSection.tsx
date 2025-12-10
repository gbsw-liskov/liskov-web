import MyInfo from "./MyInfo";
import type { User } from "@/types/auth";

interface MyInfoItem {
  icon: number;
  title: string;
  info: string;
}

interface ProfileInfoSectionProps {
  userData: User | null;
}

export default function ProfileInfoSection({
  userData,
}: ProfileInfoSectionProps) {
  const myInfoItems: MyInfoItem[] = [
    {
      icon: 1,
      title: "이름",
      info: userData
        ? `${userData.firstName} ${userData.lastName}`
        : "로딩 중...",
    },
    {
      icon: 2,
      title: "이메일",
      info: userData?.email || "로딩 중...",
    },
  ];

  return (
    <div className="w-full h-[189px] bg-white px-[24px] pt-[18px] mt-[24px] rounded-[5px]">
      <p className="text-black text-[14px] font-semibold">내 정보</p>
      <div className="flex w-full h-[73px] flex-col justify-between mt-[31px]">
        {myInfoItems.map((item) => (
          <MyInfo
            key={item.icon}
            icon={item.icon}
            title={item.title}
            info={item.info}
          />
        ))}
      </div>
    </div>
  );
}
