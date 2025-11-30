import { FaCheck } from 'react-icons/fa';

interface CheckListAddMenuProps {
  image: string;
  roomType: string;
  region: string;
  info: string;
  intro: string;
  price: string;
  selected: boolean;
  onClick: () => void;
}

export default function CheckListAddMenu({image, roomType, region, info, intro, price, selected, onClick}: CheckListAddMenuProps) {
  return (
    <div
      onClick={onClick}
      className="relative flex w-[790px] h-[150px] justify-between cursor-pointer border-b border-[#D9D9D9]"
    >
      {selected && (
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{
            top: '10px',
            right: '10px',
            width: '36px',
            height: '36px',
            backgroundColor: '#58CCFF',
          }}
        >
          <FaCheck className="text-white" />
        </div>
      )}

      <div className="h-[129px] w-[140px]">
        <img className="w-full h-full rounded-lg" src={image} alt="집 사진" />
      </div>

      <div className="flex flex-col justify-between w-[612px] h-[132px] p-3">
        <p className="font-medium text-[14px] text-[#757575]">{roomType}</p>
        <p className="font-semibold text-[18px] text-black">{region}</p>
        <p className="font-medium text-[14px] text-[#757575]">{info}</p>
        <p className="font-medium text-[15px] text-[#757575]">{intro}</p>
        <p className="w-full flex justify-end font-bold text-[18px] text-black">{price}</p>
      </div>
    </div>
  );
}
