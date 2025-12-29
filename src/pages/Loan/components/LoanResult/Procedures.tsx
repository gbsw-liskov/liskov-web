import { IoDocumentTextOutline } from "react-icons/io5";

interface Procedure {
  title: string;
  content: string;
}

interface ProceduresProps {
  procedures: Procedure[];
}

export default function Procedures({ procedures }: ProceduresProps) {
  return (
    <div className="w-full min-h-[415px] p-[25px] mb-[4px]">
      <div className="w-full mb-[22px]">
        <p className="text-black text-[18px] font-semibold flex">
          <IoDocumentTextOutline
            color="#58CCFF"
            size={25}
            className="mr-[6px]"
          />
          신청 절차 및 방법
        </p>
      </div>
      {procedures.map((procedure, index) => (
        <div key={index} className="flex min-h-[43px] w-full mt-[22px]">
          <div className="w-[28px] h-[28px] flex justify-center items-center bg-[#58CCFF] rounded-full text-[13px] text-white font-semibold mr-[12px]">
            {index + 1}
          </div>
          <div className="min-w-[208px] min-h-full">
            <p className="text-[15px] text-black mb-[4px]">{procedure.title}</p>
            <p className="text-[13px] text-[#757575] whitespace-pre-line">
              {procedure.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
