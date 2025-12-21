// 소득 정보
import LoanInput from "../components/LoanInput";

interface EarningsInfoProps {
  formData: {
    annualSalary: string;
    monthlySalary: string;
    incomeType: string;
    incomeCategory: string;
  };
  onFormChange: (name: string, value: string) => void;
}

export default function EarningsInfo({
  formData,
  onFormChange,
}: EarningsInfoProps) {
  return (
    <div className="w-[992px] mx-auto">
      <LoanInput
        label="연소득(만원)"
        name="annualSalary"
        type="text"
        placeholder="연소득을 입력해주세요"
        value={formData.annualSalary}
        onChange={onFormChange}
      />

      <LoanInput
        label="월소득(만원)"
        name="monthlySalary"
        type="text"
        placeholder="월소득을 입력해주세요"
        value={formData.monthlySalary}
        onChange={onFormChange}
      />

      <LoanInput
        label="소득 형태"
        name="incomeType"
        type="button"
        options={["EMPLOYEE", "FREELANCER", "SELF_EMPLOYED"]}
        displayLabels={["직장인", "프리랜서", "자영업자"]}
        value={formData.incomeType}
        onChange={onFormChange}
        buttonSize="third"
      />

      <LoanInput
        label="소득 종류"
        name="incomeCategory"
        type="button"
        options={["EARNED_INCOME", "BUSINESS_INCOME", "OTHER_INCOME"]}
        displayLabels={["근로소득", "사업소득", "기타소득"]}
        value={formData.incomeCategory}
        onChange={onFormChange}
        buttonSize="full"
        gridCols={1}
      />
    </div>
  );
}
