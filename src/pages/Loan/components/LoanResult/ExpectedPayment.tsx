import { HiCalculator } from "react-icons/hi";

interface ExpectedPaymentProps {
  ownCapital: number;
  monthlyInterest: number;
  managementFee: number;
  totalMonthlyCost: number;
}

export default function ExpectedPayment({
  ownCapital,
  monthlyInterest,
  managementFee,
  totalMonthlyCost,
}: ExpectedPaymentProps) {
  return (
    <div className="w-full min-h-[291px] p-[40px] mb-[4px]">
      <div className="w-full">
        <p className="text-black text-[18px] font-semibold flex">
          <HiCalculator color="#58CCFF" size={25} className="mr-[6px]" />
          예상 지불 금액
        </p>
      </div>
      <div className="flex items-center justify-between w-full mt-[30px]">
        <p className="text-[#757575] text-[16px] font-medium">자기 자금</p>
        <p className="text-[#757575] text-[16px] font-medium">
          {ownCapital.toLocaleString()}만원
        </p>
      </div>
      <div className="flex items-center justify-between w-full mt-[22px]">
        <p className="text-[#757575] text-[16px] font-medium">월 이자(예상)</p>
        <p className="text-[#757575] text-[16px] font-medium">
          {monthlyInterest.toLocaleString()}만원
        </p>
      </div>
      <div className="flex items-center justify-between w-full mt-[22px]">
        <p className="text-[#757575] text-[16px] font-medium">관리비</p>
        <p className="text-[#757575] text-[16px] font-medium">
          {managementFee.toLocaleString()}만원
        </p>
      </div>
      <div className="flex items-center justify-between w-full mt-[27px]">
        <p className="text-black text-[16px] font-medium">월 총 부담 금액</p>
        <p className="text-[#58CCFF] text-[18px] font-semibold">
          약 {totalMonthlyCost.toLocaleString()}만원
        </p>
      </div>
    </div>
  );
}
