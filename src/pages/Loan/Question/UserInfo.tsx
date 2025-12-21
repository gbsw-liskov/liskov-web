// 사용자 정보
import LoanInput from "../components/LoanInput";

interface UserInfoProps {
  formData: {
    age: string;
    isHouseholder: string;
    familyType: string;
    incomeType: string;
    incomeCategory: string;
  };
  onFormChange: (name: string, value: string) => void;
}

export default function UserInfo({ formData, onFormChange }: UserInfoProps) {
  return (
    <div className="w-[992px] mx-auto">
      <LoanInput
        label="나이"
        name="age"
        type="text"
        placeholder="만 나이를 입력해주세요"
        value={formData.age}
        onChange={onFormChange}
      />

      <LoanInput
        label="세대주 여부"
        name="isHouseholder"
        type="button"
        options={["예", "아니오"]}
        value={formData.isHouseholder}
        onChange={onFormChange}
        buttonSize="half"
      />

      <LoanInput
        label="가족 구성"
        name="familyType"
        type="button"
        displayLabels={["단독세대", "신혼", "부부", "청년"]}
        options={["SINGLE", "HONEYMOON", "COUPLE", "YOUTH"]}
        value={formData.familyType}
        onChange={onFormChange}
        buttonSize="half"
        gridCols={2}
      />
    </div>
  );
}
