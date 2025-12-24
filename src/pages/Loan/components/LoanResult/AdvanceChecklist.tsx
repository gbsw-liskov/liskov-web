import { CiCircleCheck } from "react-icons/ci";

interface Advance {
  title: string;
  content: string;
}

interface AdvanceChecklistProps {
  advance: Advance[];
}

export default function AdvanceChecklist({ advance }: AdvanceChecklistProps) {
  return (
    <div className="w-full min-h-[252px] p-[25px] mt-[20px]">
      <div className="w-full">
        <p className="text-black text-[16px] font-semibold flex">
          선행 조건 체크리스트
        </p>
      </div>
      <div className="min-h-[215px] w-full mt-[13px]">
        {advance.map((item, index) => (
          <div
            key={index}
            className="box-content min-w-full h-[39px] p-[12px] flex mb-[13px]"
          >
            <div className="w-[22px] h-[22px] mr-[12px]">
              <div className="w-[22px] h-[22px] flex justify-center items-center bg-[#58CCFF] rounded-full">
                <CiCircleCheck color="white" size={15} />
              </div>
            </div>
            <div className="min-w-[136px] h-[39px]">
              <p className="text-[13px] text-black">{item.title}</p>
              <p className="text-[11px] text-[#757575]">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}