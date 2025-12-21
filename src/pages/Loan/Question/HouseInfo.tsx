// 주거 정보
import LoanInput from "../components/LoanInput";

interface HouseInfoProps {
  formData: {
    rentalArea: string;
    houseType: string;
    rentalType: string;
    deposit: string;
    managementFee: string;
    availableLoan: string;
  };
  onFormChange: (name: string, value: string) => void;
}

export default function HouseInfo({ formData, onFormChange }: HouseInfoProps) {
  return (
    <div className="w-[992px] mx-auto">
      <LoanInput
        label="임차 지역"
        name="rentalArea"
        type="text"
        placeholder="예) 서울시 강남구"
        value={formData.rentalArea}
        onChange={onFormChange}
      />

      <LoanInput
        label="집 유형"
        name="houseType"
        type="button"
        options={["APARTMENT", "OFFICETEL", "VILLA"]}
        displayLabels={["아파트", "오피스텔", "빌라"]}
        value={formData.houseType}
        onChange={onFormChange}
        buttonSize="third"
      />

      <LoanInput
        label="전월세 형태"
        name="rentalType"
        type="button"
        options={["JEONSE", "MONTHLY_RENT"]}
        displayLabels={["전세", "월세"]}
        value={formData.rentalType}
        onChange={onFormChange}
        buttonSize="half"
      />

      <LoanInput
        label="보증금(만원)"
        name="deposit"
        type="text"
        placeholder="보증금을 입력해주세요"
        value={formData.deposit}
        onChange={onFormChange}
      />

      <LoanInput
        label="관리비(만원)"
        name="managementFee"
        type="text"
        placeholder="관리비를 입력해주세요"
        value={formData.managementFee}
        onChange={onFormChange}
      />

      <LoanInput
        label="대출 가능 주택 여부"
        name="availableLoan"
        type="button"
        options={["예", "아니오"]}
        value={formData.availableLoan}
        onChange={onFormChange}
        buttonSize="half"
      />
    </div>
  );
}
