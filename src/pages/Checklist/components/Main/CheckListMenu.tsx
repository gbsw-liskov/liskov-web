interface HouseMenuProps {
  image: string;
  title: string;
  date: string;
  onclick: () => void;
}

export default function CheckListMenu({ image, title, date, onclick }: HouseMenuProps) {
  return (
    <div onClick={onclick} className="flex flex-col w-[243px] h-[280px] justify-between cursor-pointer">
      <img className="w-full h-[210px] rounded-lg object-cover" src={image} alt="집 사진" />
      <p className="w-full font-bold text-[18px] text-black truncate pt-[10px]" title={title}>
        {title}
      </p>
      <p className="w-full font-medium text-[14px] text-[#757575] truncate" title={date}>
        {date}
      </p>
    </div>
  );
}
