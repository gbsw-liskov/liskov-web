interface LoanSummaryCardProps {
  loanAmount: number;
  interestRate: number;
}

export default function LoanSummaryCard({
  loanAmount,
  interestRate,
}: LoanSummaryCardProps) {
  return (
    <div className="w-full min-h-[189px] rounded-[15px] p-[25px] flex justify-between bg-gradient-to-br from-[#58CCFF]/80 to-[#38B3E9] items-end">
      <div className="min-w-[180px] min-h-[133px]">
        <p className="text-white text-[20px] font-semibold mb-[24px]">
          맞춤 대출 가이드 결과
        </p>
        <p className="text-white text-[20px] font-semibold mb-[35px]">
          예상 대출 가능 금액
        </p>
        <p className="text-white text-[20px] font-semibold">예상 금리</p>
      </div>
      <div className="min-w-[123px] min-h-[90px] flex flex-col items-end">
        <p className="text-white text-[24px] font-semibold mb-[35px]">
          {loanAmount.toLocaleString()}만원
        </p>
        <p className="text-white text-[20px] font-semibold">
          연 {interestRate}%
        </p>
      </div>
    </div>
  );
}
