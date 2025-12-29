import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BannerItem from "./BannerItem";
import SlideMenu from './SlideMenu';
import toast from "react-hot-toast";

export default function Banner() {
  const navigate = useNavigate();
  const [roomSearch, setRoomSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomSearch(e.target.value);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`?${roomSearch}`);
    setRoomSearch("");
  };

  const bannerItems = [
    {
      title: "원룸/투룸",
      subTitle: "나에게 딱 맞는 원룸 찾기",
      data: "주변 모든 원룸을 더 쉽게<br />찾아보세요!",
      shape: 1,
      imgNumber: 1,
      onclick: () => navigate("/map?type=원룸투룸"),
    },
    {
      title: "아파트",
      subTitle: "나에게 딱 맞는 아파트 찾기",
      data: "회원님에게 딱 맞는 아파트<br />매물을 찾아보세요!",
      shape: 1,
      imgNumber: 2,
      onclick: () => navigate("/map?type=아파트"),
    },
    {
      title: "대출 가이드",
      subTitle: "나에게 딱 맞는 대출 가이드<br />짧은 설문만으로 최적의 대출 정보를 찾아보세요!",
      longshape: true,
      imgNumber: 3,
      onclick: () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("로그인이 필요합니다.");
          navigate("/signin");
          return;
        }
        navigate("/loan");
      },
    },
  ];

  return (
    <div className="h-[545px] w-full mt-20 bg-[#ECFAFF] px52">
      <div className="w-[798px] pt-10 h-18 mx-auto">
        <form
          onSubmit={handleSearch}
          className="rounded-[15px] w-[789px] h-[73px] flex justify-between items-center px-[27px] bg-white"
        >
          <input
            className="border-0 outline-none bg-none flex w-[700px] h-full font-medium text-[18px] text-black placeholder-[#A0A0A0]"
            placeholder="찾으시는 방을 검색해보세요"
            type="text"
            value={roomSearch}
            onChange={handleChange}
          />
          <button
            className="flex items-center justify-center w-5 h-5 border-0 cursor-pointer"
            type="submit"
          >
            <CiSearch size={19} />
          </button>
        </form>
      </div>
      <div className="w-[1122px] h-[344px] flex justify-between mt-[34px] mx-auto">
        <div className="w-[552px] h-full grid grid-cols-2 gap-4">
          {bannerItems.map((item, idx) => (
            <BannerItem
              key={idx}
              title={item.title}
              subTitle={item.subTitle}
              data={item.data}
              longshape={item.longshape}
              imgNumber={item.imgNumber}
              onclick={item.onclick}
            />
          ))}
        </div>
        <SlideMenu />
      </div>
    </div>
  );
}
