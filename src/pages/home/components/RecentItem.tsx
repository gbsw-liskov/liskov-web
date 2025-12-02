import { useState, useEffect } from "react";

interface RecentItemProps {
  id: number;
  image: string;
  houseType: string;
  floor: string;
  address: string;
  price: string;
  onDetailClick: () => void;
}

export default function RecentItem({
  id,
  image,
  houseType,
  floor,
  address,
  price,
  onDetailClick,
}: RecentItemProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const liked = localStorage.getItem(`recentItem_${id}_liked`);
    if (liked === "true") {
      setIsLiked(true);
    }
  }, [id]);

  const handleLikeToggle = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    localStorage.setItem(`recentItem_${id}_liked`, String(newLikedState));
  };

  return (
    <div
      className="w-[542px] h-[744px] flex flex-col justify-between bg-cover bg-center rounded-[5px] z-[1] relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-[542px] h-[744px] absolute z-[2] inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_40%,rgba(0,0,0,0.4)_100%)]" />

      <div className="flex justify-end p-[35px] z-[3]">
        <button onClick={handleLikeToggle} className="text-3xl">
          {isLiked ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="pl-[66px] pb-[45px] z-[3]">
        <p className="text-[#f2f2f2] text-[22px] font-medium">
          {houseType} {floor}
        </p>
        <p className="mt-2 text-white text-[26px] font-semibold">{address}</p>
        <p className="mt-[15px] text-white text-[36px] font-bold">{price}</p>
        <button
          onClick={onDetailClick}
          className="w-[410px] h-[73px] mt-[50px] flex justify-center items-center bg-transparent border-[3px] border-white rounded-[5px] text-white font-semibold text-[22px]"
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
}
