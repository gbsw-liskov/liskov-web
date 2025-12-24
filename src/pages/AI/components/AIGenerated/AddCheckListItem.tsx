import { FaPlus } from "react-icons/fa";

interface AddCheckListItemProps {
  onClick: () => void;
}

export default function AddCheckListItem({ onClick }: AddCheckListItemProps) {
  return (
    <div 
      className="flex items-center w-full h-full gap-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-center min-w-6 min-h-6">
        <FaPlus size={15} color="#757575" />
      </div>
      <p className="text-[18px] font-medium text-[#757575]">
        추가로 작성하실 체크리스트를 입력해주세요
      </p>
    </div>
  );
}