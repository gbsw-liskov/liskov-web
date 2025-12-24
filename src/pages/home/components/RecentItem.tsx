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
  image,
  houseType,
  floor,
  address,
  price,
  onDetailClick,
}: RecentItemProps) {
  return (
    <div
      className="w-[542px] h-[744px] flex flex-col justify-end rounded-[5px] relative cursor-pointer overflow-hidden"
      onClick={onDetailClick}
    >
      {/* 배경 이미지 */}
      <img 
        src={image} 
        alt="매물 이미지"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60 z-[1]" />

      {/* 컨텐츠 */}
      <div className="pl-[66px] pb-[45px] relative z-[2]">
        <p className="text-[#f2f2f2] text-[22px] font-medium">
          {houseType} {floor}
        </p>
        <p className="mt-2 text-white text-[26px] font-semibold">{address}</p>
        <p className="mt-[15px] text-white text-[36px] font-bold">{price}</p>
        <button
          onClick={onDetailClick}
          className="w-[410px] h-[73px] mt-[50px] flex justify-center items-center bg-transparent border-[3px] border-white rounded-[5px] text-white font-semibold text-[22px] hover:bg-white/10 transition-colors"
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
}
