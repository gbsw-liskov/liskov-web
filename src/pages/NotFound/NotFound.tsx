import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router';

export default function NotFound(){
  const navigate = useNavigate();

  return(
    <div className="min-w-full h-[99vh]">
      <div className="flex min-w-full pl-20 h-[10%] items-end">
        <div className="flex items-center cursor-pointer w-36 h-9" onClick={() => navigate(-1)}>
          <IoIosArrowBack size={30} />
          <h1 className="flex text-2xl font-bold text-black">
            뒤로가기
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center min-w-full h-[90%]">
        <h1 className="text-5xl font-bold text-black">
          Not Found
        </h1>
      </div>
    </div>
  );
}