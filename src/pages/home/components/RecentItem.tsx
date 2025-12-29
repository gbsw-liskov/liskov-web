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
      className="w-[542px] h-[744px] flex flex-col justify-end bg-cover bg-center rounded-[5px] z-[1] relative cursor-pointer"
      style={{ backgroundImage: `url("${encodeURI(image)}")` }}
      onClick={onDetailClick}
    >
      <div className="w-[542px] h-[744px] absolute z-[2] inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_40%,rgba(0,0,0,0.4)_100%)]" />

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
