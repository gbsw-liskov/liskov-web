interface HouseMenuProps {
  image: string;
  title: string;
  date: string;
  onclick: () => void;
}

export default function CheckListMenu({ image, title, date, onclick }: HouseMenuProps) {
  return (
    <div onClick={onclick} className="flex flex-col w-[243px] h-[289px] justify-between cursor-pointer">
      <img className="w-full h-[210px] rounded-lg" src={image} alt="집 사진" />
      <p className="w-full font-bold text-[18px] text-black">{title}</p>
      <p className="w-full font-medium text-[14px] text-[#757575]">{date}</p>
    </div>
  );
}
