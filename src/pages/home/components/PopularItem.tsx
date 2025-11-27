interface PopularProps{
  image: string;
  price: string;
  houseType: string;
  floor: string;
  address: string;
  description: string;
  onclick: () => void;
}

export default function popularItem({image, price, houseType, floor, address, description, onclick}: PopularProps){
  return (
    <div onClick={onclick} className="w-[260px] h-[310px] cursor-pointer">
      <img
        className="w-full h-[197px] rounded-[5px]"
        src={image}
        alt="매물 사진"
      />
      <h1 className="mt-4 text-black font-bold text-[18px]">{price}</h1>
      <p className="mt-[11px] text-[#757575] font-medium text-[12px]">
        {houseType}  {floor}
      </p>
      <p className="mt-2 text-[#757575] font-medium text-[14px]">
        {address}
      </p>
      <p className="mt-[11px] text-[#A0A0A0] font-medium text-[12px]">
        {description}
      </p>
    </div>
  );
}