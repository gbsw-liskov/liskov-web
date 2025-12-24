export default function WarningNotice() {
  return (
    <div className="w-full min-h-[180px] bg-[#FFF4CD] rounded-[15px] mt-[15px]">
      <div className="w-full pl-[24px] min-h-[170px] py-[24px]">
        <h1 className="text-[#856404] text-[18px] font-semibold mb-[14px]">
          ⚠️ 유의사항
        </h1>
        <ul className="list-disc list-outside pl-[20px] marker:text-[#757575]">
          <li className="mb-[14px]">
            <p className="text-[#856404] text-[16px] font-medium">
              본 결과는 예상 수치로 실제 대출 조건과 다를 수 있습니다
            </p>
          </li>
          <li className="mb-[14px]">
            <p className="text-[#856404] text-[16px] font-medium">
              대출 승인 여부는 금융기관의 심사 결과에 따라 결정됩니다
            </p>
          </li>
          <li className="mb-[14px]">
            <p className="text-[#856404] text-[16px] font-medium">
              과도한 대출은 개인 신용등급 하락의 원인이 될 수 있습니다
            </p>
          </li>
          <li>
            <p className="text-[#856404] text-[16px] font-medium">
              대출 조건은 2025년 12월 기준이며 변동될 수 있습니다
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}