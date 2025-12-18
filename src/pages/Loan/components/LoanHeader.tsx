import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

interface LoanHeaderProps {
  title: string;
}

export default function Header({ title }: LoanHeaderProps) {
  const navigate = useNavigate();
  const goToBack = () => {navigate(-1);}
  return (
    <div className="relative pt-[30px] w-full h-[60px] flex items-center justify-center">
      <IoIosArrowBack onClick={goToBack} className="absolute left-[273px] text-2xl cursor-pointer" />
      <h1 className="text-[22px] font-bold text-black">{title}</h1>
    </div>
  );
}
