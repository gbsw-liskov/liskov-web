// 계약 정보
import LoanInput from "../components/LoanInput";

interface ContractInfoProps {
  formData: {
    hasLeaseAgreement: string;
    confirmed: string;
  };
  onFormChange: (name: string, value: string) => void;
}

export default function ContractInfo({ formData, onFormChange }: ContractInfoProps) {
  return (
    <div className="w-[992px] mx-auto">
      <LoanInput
        label="임대차계약서 유무"
        name="hasLeaseAgreement"
        type="button"
        options={["true", "false"]}
        displayLabels={["있음", "없음(예정)"]}
        buttonSize="half"
        value={formData.hasLeaseAgreement}
        onChange={onFormChange}
        gridCols={2}
      />

      <LoanInput
        label="확정일자 여부"
        name="confirmed"
        type="button"
        options={["RECEIVED", "SCHEDULED", "UNKNOWN"]}
        displayLabels={["받음", "예정", "모름"]}
        value={formData.confirmed}
        onChange={onFormChange}
        buttonSize="third"
      />
      <div className="w-full min-h-[217px] bg-[#E7F3FF] rounded-[15px] mt-[32px]">
        <div className="w-full pl-[24px] min-h-[170px] py-[24px]">
          <h1 className="text-black text-[18px] font-semibold mb-[14px]">
            계약 관련 체크리스트
          </h1>

          <ul className="list-disc list-outside pl-[20px] marker:text-[#757575]">
            <li className="mb-[14px]">
              <p className="text-[#757575] text-[16px] font-medium">
                예상 대출 가능 금액
              </p>
            </li>
            <li className="mb-[14px]">
              <p className="text-[#757575] text-[16px] font-medium">
                등기부등본 확인 (선순위 권리)
              </p>
            </li>
            <li className="mb-[14px]">
              <p className="text-[#757575] text-[16px] font-medium">
                확정일자 받기 (주민센터 또는 인터넷)
              </p>
            </li>
            <li>
              <p className="text-[#757575] text-[16px] font-medium">
                전입신고 하기 (계약 체결 후)
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
