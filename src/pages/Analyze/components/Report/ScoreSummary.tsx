interface ScoreSummaryProps {
  score: number;
  status: string;
  description: string;
  normalCount?: number;
  warningCount?: number;
  dangerCount?: number;
}

export default function ScoreSummary({
  score,
  status,
  description,
  normalCount,
  warningCount,
  dangerCount,
}: ScoreSummaryProps) {
  const getScoreColor = () => {
    if (score >= 80) return "text-[#58CCFF]";
    if (score >= 60) return "text-[#FEB53C]";
    return "text-[#ED5E5E]";
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[326px] mt-12">
      <p className="text-[20px] font-medium text-[#757575] mb-[18px]">
        총 점수
      </p>

      <p className={`text-[60px] font-bold ${getScoreColor()} mb-[40px]`}>
        {score}점
      </p>

      <p className="text-[24px] font-bold text-black mb-[26px]">{status}</p>

      {/* 🔽 여기만 변경 */}
      <p className="text-[20px] font-medium text-[#757575] text-center mb-[34px]">
        {description.split("<br />").map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </p>

      {typeof normalCount === "number" &&
        typeof warningCount === "number" &&
        typeof dangerCount === "number" && (
          <div className="w-full min-h-[130px] flex justify-between items-center px-[275px] py-[30px]">
            <div className="w-[40px] h-[70px] flex flex-col justify-between">
              <h1 className="text-[#58CCFF] text-[44px] font-bold">
                {normalCount}
              </h1>
              <p className="text-[#757575] text-[16px] font-medium">양호</p>
            </div>

            <div className="w-[40px] h-[70px] flex flex-col justify-between">
              <h1 className="text-[#FEB53C] text-[44px] font-bold">
                {warningCount}
              </h1>
              <p className="text-[#757575] text-[16px] font-medium">주의</p>
            </div>

            <div className="w-[40px] h-[70px] flex flex-col justify-between">
              <h1 className="text-[#ED5E5E] text-[44px] font-bold">
                {dangerCount}
              </h1>
              <p className="text-[#757575] text-[16px] font-medium">심각</p>
            </div>
          </div>
        )}
    </div>
  );
}
