// 신용 및 금융 정보
import LoanInput from "../components/LoanInput";

interface CreditInfoProps {
  formData: {
    creditRating: string;
    loanType: string;
    overdueRecord: string;
  };
  onFormChange: (name: string, value: string) => void;
}

export default function CreditInfo({ formData, onFormChange }: CreditInfoProps) {
  return (
    <div className="w-[992px] mx-auto">
      <LoanInput
        label="신용 등급"
        name="creditRating"
        type="button"
        options={["1", "2", "3", "4", "5", "6"]}
        buttonSize="third"
        value={formData.creditRating}
        onChange={onFormChange}
        gridCols={3}
      />

      <LoanInput
        label="대출 종류"
        name="loanType"
        type="button"
        options={["CREDIT", "JEONSE", "MORTGAGE", "OTHER"]}
        displayLabels={["신용대출", "전세대출", "주택담보대출", "기타"]}
        value={formData.loanType}
        onChange={onFormChange}
        buttonSize="full"
        gridCols={1}
      />

      <LoanInput
        label="연체 기록 여부"
        name="overdueRecord"
        type="button"
        options={["false", "true"]}
        displayLabels={["없음", "있음"]}
        value={formData.overdueRecord}
        onChange={onFormChange}
        buttonSize="half"
        gridCols={2}
      />
    </div>
  );
}
