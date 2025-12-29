import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PassivityAddButton() {
  const navigate = useNavigate();
  const passivityAdd = () => {
    navigate("/checklist/add");
  };
  return (
    <button onClick={passivityAdd} className="fixed bottom-[31px] block ml-auto mr-[30px] w-[70px] h-[70px] rounded-full bg-[#58CCFF] border-0 flex items-center justify-center">
      <FaPlus className="text-white text-2xl" />
    </button>
  );
}