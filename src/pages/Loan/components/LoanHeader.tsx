import { IoIosArrowBack } from "react-icons/io";

interface LoanHeaderProps {
  title: string;
  onClick: () => void;
}

export default function Header({ title, onClick }: LoanHeaderProps) {
  return (
    <div className="relative pt-[30px] w-full h-[60px] flex items-center justify-center">
      <IoIosArrowBack onClick={onClick} className="absolute left-[273px] text-2xl cursor-pointer" />
      <h1 className="text-[22px] font-bold text-black">{title}</h1>
    </div>
  );
}
