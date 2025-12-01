import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import * as C from './components';
import * as Image from '@/assets';
import { IoPerson } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";

type myInfoItem = { icon: number; title: string; info: string };

const myInfoItems: myInfoItem[] = [
  { icon: 1, title: "이름", info: "김은찬" },
  { icon: 2, title: "아이디", info: "kec" },
  { icon: 3, title: "전화번호", info: "010-1234-1234" },
  { icon: 4, title: "이메일", info: "rladmscks@gmail.com" },
];
  
type profileMenuItem = { imageNum: number; title: string };

const profileMenuItems: profileMenuItem[] = [
  { imageNum: 1, title: "관심 매물"},  
  { imageNum: 2, title: "매물 분석"},  
  { imageNum: 3, title: "체크리스트"},  
]

export default function Profile(){
  const navigate = useNavigate();

  const goHome = () => {
    localStorage.clear();
    navigate('/');
    toast.success("로그아웃 되었습니다.");
  }

  return (
    <div className="min-h-screen w-[836px] pt-20 mx-auto bg-[#F8FAFB] pb-[49px]">
      <div className="w-[515px] mx-auto pt-10">
        <div className="w-full h-[65px] flex justify-between items-center">
          <div className="flex w-[254px] items-center">
            <div className="rounded-full mr-5 w-[64px] h-[64px] bg-[#58CCFF] flex justify-center items-center">
              <IoPerson color="#ffffff" size={30} />
            </div>
            <div className="flex flex-col justify-between w-auto h-full">
              <p className="text-black text-[20px] font-semibold">
                {myInfoItems[0].info}
              </p>
              <p className="text-[#BEBEBE] text-[14px] font-medium">
                {myInfoItems[3].info}
              </p>
            </div>
          </div>
          <div className="w-[30px] h-[30px] cursor-pointer">
            <MdOutlineSettings size={30} />
          </div>
        </div>
        <div className="w-full h-[268px]">
          <div className="flex justify-between w-full mt-10">
            {profileMenuItems.map((item) => (
              <C.ProfileMenu imageNum={item.imageNum} title={item.title} />
            ))}
          </div>
          <div className="flex justify-between w-full h-[118px] bg-white mt-6 cursor-pointer rounded-[5px]">
            <div className="w-[240px] h-[74px] pt-[27px] pl-[13px]">
              <p className="text-black text-[16px] font-bold mb-[8px]">
                나에게 딱 맞는 방 찾기
              </p>
              <p className="text-[#757575] text-[12px] font-medium">
                지도를 통해 내 주변 나에게 딱 맞는 방을<br />찾아보세요!
              </p>
            </div>
            <div className="w-[132px] h-full">
              <img className="w-full h-full" src={Image.PadMap} alt="아이패드 지도 아이콘" />
            </div>
          </div>
        </div>
        <div className="w-full h-[281px] bg-white px-[24px] pt-[18px] mt-[24px] rounded-[5px]">
          <p className="text-black text-[14px] font-semibold">내 정보</p>
          <div className="flex w-full h-[182px] flex-col justify-between mt-5">
            {myInfoItems.map((item) => (
              <C.MyInfo
                key={item.icon}
                icon={item.icon}
                title={item.title}
                info={item.info}
              />
            ))}
          </div>
        </div>
        <div className="mt-[50px] flex justify-center items-center">
          <button onClick={goHome} type="button" className="border-none bg-none cursor-pointer text-[#ED5E5E] text-[18px] font-semibold">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}