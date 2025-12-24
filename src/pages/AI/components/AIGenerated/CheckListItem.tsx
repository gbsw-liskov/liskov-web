import { FaCheck } from "react-icons/fa";

interface CheckListItemProps {
  check: boolean;
  item: string;
  onClick?: () => void;
}

export default function CheckListItem({ check, item, onClick }: CheckListItemProps) {
  return (
    <div className="flex items-center w-full gap-3 cursor-pointer h-15" onClick={onClick}>
      {check ? (
        <div className="min-w-6 min-h-6 bg-[#58CCFF] flex justify-center items-center rounded-lg">
          <FaCheck size={15} color="white" />
        </div>
      ) : (
        <div className="border-[1px] border-[#757575] min-w-6 min-h-6 bg-white rounded-lg" />
      )}
      <h1 className="font-medium text-[16px]">{item}</h1>
    </div>
  );
}