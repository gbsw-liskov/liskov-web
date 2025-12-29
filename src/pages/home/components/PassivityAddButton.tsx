import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PassivityAddButton() {
  const navigate = useNavigate();
  const passivityAdd = () => {
    navigate("/checklist/add");
  };
  return (
    <button
      onClick={passivityAdd}
      className="fixed bottom-[24px] right-[24px] z-[2000] w-[70px] h-[70px] rounded-full bg-[#58CCFF] border-0 flex items-center justify-center shadow-lg hover:bg-[#45b8eb] transition-colors"
    >
      <FaPlus className="text-white text-2xl" />
    </button>
  );
}