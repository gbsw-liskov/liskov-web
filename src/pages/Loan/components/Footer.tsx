interface FooterProps {
  title: string;
  onClick: () => void;
  warningBox?: boolean;
  tipTitle: string;
}
export default function Footer({ title, onClick, warningBox=false, tipTitle }: FooterProps) {
  return (
    <div className="w-full">
      {warningBox && (
        <div className="flex items-center w-full h-[63px] mt-[26px] mb-2 bg-[#FFF4CD]">
          <p className="pl-[20px] text-[#856504] text-[13px] leading-5">
            <span className="text-[#757575]">⚠️</span> 연체 기록이 있는 경우 대출 승인이 어려울 수 있습니다
          </p>
        </div>
      )}
      <div className="flex pl-[20px] items-center w-full h-[63px] mt-[26px] bg-[#f6f6f6]">
        <p className="text-[#757575] text-[12px] leading-5">       
          {tipTitle}
        </p>
      </div>
      <button
        onClick={onClick}
        className="w-full h-[55px] bg-[#58CCFF] flex border-none rounded-[10px] mt-[40px] items-center justify-center text-white text-[18px] font-bold hover:bg-[#45b8eb] transition-all"
      >
        {title}
      </button>
    </div>
  );
}