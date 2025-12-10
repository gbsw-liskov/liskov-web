import { IoPerson } from "react-icons/io5";
import { MdMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

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
          : icon == 2 ? <MdMail size={25} />
          : <RiLockPasswordFill size={25}/>
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
