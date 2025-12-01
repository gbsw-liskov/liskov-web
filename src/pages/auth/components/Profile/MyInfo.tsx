import { IoPerson } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdMail } from "react-icons/md";

interface InfoProps{
  icon: number;
  title: string;
  info: string;
}
export default function MyInfo( { icon, title, info } : InfoProps) {
  
  return (
    <div className="flex justify-between w-[467px] h-auto">
      <div className="flex items-center w-auto h-auto">
        {
          icon == 1 ? <IoPerson size={25} />
          : icon == 2 ? <FaAddressCard size={25} />
          : icon == 3 ? <IoIosCall size={25} />
          : <MdMail size={25} />
        }
        <p className=" pl-[10px] text-[16px] text-black font-medium">
          {title}
        </p>
      </div>
      <div className="w-auto">
        <p className="text-[16px] text-[#757575] font-medium">
          {info}
        </p>
      </div>
    </div>
  );
}
