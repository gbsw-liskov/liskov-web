import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

export default function Profile(){
  const navigate = useNavigate();

  const goHome = () => {
    localStorage.clear();
    navigate('/');
    toast.success("로그아웃 되었습니다.");
  }

  return(
    <div className="flex flex-col items-center justify-center min-w-full min-h-screen">
      <h1 className="text-4xl">
        This is Profile
      </h1>
      <button onClick={goHome} className="mt-8 w-[100px] h-10 flex justify-center items-center text-xl border-2 border-black bg-white rounded-xl cursor-pointer">
        로그아웃
      </button>
    </div>
  )
}