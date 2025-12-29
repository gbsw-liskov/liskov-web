import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as Image from "@/assets";
import * as C from "./components";
import * as P from "./Question";
import SectionHeader from "./components/SectionHeader";
import toast from "react-hot-toast";

const TOTAL_STEPS:number = 5;

interface LoanFormData {
  // 사용자 정보
  age: string;
  isHouseholder: string; // boolean
  familyType: string; // "SINGLE" | "HONEYMOON" | "COUPLE" | "YOUTH"

  // 소득 정보
  annualSalary: string; // number
  monthlySalary: string; // number
  incomeType: string; // "EMPLOYEE" | "FREELANCER" | "SELF_EMPLOYED"
  incomeCategory: string; // "EARNED_INCOME" | "BUSINESS_INCOME" | "OTHER_INCOME"

  // 주거 정보
  rentalArea: string;
  houseType: string; // "APARTMENT" | "OFFICETEL" | "VILLA"
  rentalType: string; // "MONTHLY_RENT" | "JEONSE"
  deposit: string; // number
  managementFee: string; // number
  availableLoan: string; // boolean

  // 신용 및 금융 정보
  creditRating: string; // number
  loanType: string; // "CREDIT" | "JEONSE" | "MORTGAGE" | "OTHER"
  overdueRecord: string; // boolean

  // 계약 정보
  hasLeaseAgreement: string; // boolean
  confirmed: string; // "RECEIVED" | "SCHEDULED" | "UNKNOWN"
}

interface StepConfigItem {
  title: string;
  subtitle: string;
  description: string;
  footerTitle: string;
  tipTitle: string;
  warningBox: boolean;
}

const STEP_CONFIG: Record<number, StepConfigItem> = {
  1: {
    title: "사용자 정보",
    subtitle: "기본 정보를 입력해주세요",
    description: "정확한 대출 가이드를 위해 필요한 정보입니다",
    footerTitle: "다음",
    tipTitle: "💡 청년 특례 대출은 만 19세~34세 이하 무주택자가 대상입니다",
    warningBox: false,
  },
  2: {
    title: "소득 정보",
    subtitle: "소득 정보를 입력해주세요",
    description: "대출 한도 신청을 위한 정보입니다",
    footerTitle: "다음",
    tipTitle:
      "💡 소득 증빙 서류: 재직증명서, 급여명세서, 소득금액증명원 등이 필요합니다",
    warningBox: false,
  },
  3: {
    title: "주거 정보",
    subtitle: "주거 정보를 입력해주세요",
    description: "임차할 주택의 정보입니다",
    footerTitle: "다음",
    tipTitle:
      "💡 소득 증빙 서류: 재직증명서, 급여명세서, 소득금액증명원 등이 필요합니다",
    warningBox: false,
  },
  4: {
    title: "신용 및 금융 정보",
    subtitle: "신용 및 금융 정보를 입력해주세요",
    description: "대출 승인 및 금리 산정을 위한 정보입니다",
    footerTitle: "다음",
    tipTitle:
      "💡 소득 증빙 서류: 재직증명서, 급여명세서, 소득금액증명원 등이 필요합니다",
    warningBox: true,
  },
  5: {
    title: "계약 정보",
    subtitle: "계약 정보를 입력해주세요",
    description: "선택 사항이지만 입력하시면 더 정확한 안내가 가능합니다",
    footerTitle: "결과 확인하기",
    tipTitle: "💡 확정일자는 전세대출 실행에 필수적인 절차입니다",
    warningBox: false,
  },
};

export default function LoanGuide() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<LoanFormData>({
    // 사용자 정보
    age: "",
    isHouseholder: "",
    familyType: "",
    // 소득 정보
    annualSalary: "",
    monthlySalary: "",
    incomeType: "",
    incomeCategory: "",
    // 주거 정보
    rentalArea: "",
    houseType: "",
    rentalType: "",
    deposit: "",
    managementFee: "",
    availableLoan: "",
    // 신용 및 금융 정보
    creditRating: "",
    loanType: "",
    overdueRecord: "",
    // 계약 정보
    hasLeaseAgreement: "",
    confirmed: "",
  });

  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        age: Number(formData.age),
        isHouseholder: formData.isHouseholder === "예",
        familyType: formData.familyType,
        annualSalary: Number(formData.annualSalary),
        monthlySalary: Number(formData.monthlySalary),
        incomeType: formData.incomeType,
        incomeCategory: formData.incomeCategory,
        rentalArea: formData.rentalArea,
        houseType: formData.houseType,
        rentalType: formData.rentalType,
        deposit: Number(formData.deposit),
        managementFee: Number(formData.managementFee),
        availableLoan: formData.availableLoan === "예",
        creditRating: Number(formData.creditRating),
        loanType: formData.loanType,
        overdueRecord: formData.overdueRecord === "예",
        hasLeaseAgreement: formData.hasLeaseAgreement === "예",
        confirmed: formData.confirmed,
      };

      navigate("/loan/result", {
        state: requestData,
      });
    } catch (error) {
      console.error("대출 계산 실패:", error);
      toast.error("대출 계산에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate(-1);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (currentStep > 0) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [currentStep]);


  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="w-[992px] min-h-[587px] mt-[41px] mx-auto">
            <div className="flex w-full h-[148px] bg-[#EEFAFF] justify-center items-center">
              <div className="flex justify-between w-[356px] min-h-[87px]">
                <div>
                  <h1 className="text-[18px] font-bold text-black mb-[10px]">
                    대출 가이드
                  </h1>
                  <p className="text-[#757575] font-medium text-[15px]">
                    나에게 딱 맞춤 대출 가이드
                    <br />
                    확인해보기!
                  </p>
                </div>
                <img
                  className="my-auto w-[122px] h-[70px]"
                  src={Image.House3}
                  alt="아이콘"
                />
              </div>
            </div>
            <div className="flex flex-col items-center mt-[28px] w-full min-h-[411px]">
              <h1 className="text-[14px] font-semibold text-black">
                이런 정보를 확인할 수 있어요
              </h1>
              <div className="w-full min-h-[269px] pt-[26px] flex flex-col justify-between">
                <C.Menu
                  icon={1}
                  title="예상 대출 금액 계산"
                  info="내 조건으로 받을 수 있는 대출 한도와 금리를 확인해요"
                />
                <C.Menu
                  icon={2}
                  title="맞춤형 상품 추천"
                  info="청년, 신혼부부 등 나에게 유리한 대출 상품을 추천해요"
                />
                <C.Menu
                  icon={3}
                  title="신청 절차 안내"
                  info="필요 서류부터 대출 실행까지 단계별로 알려드려요"
                />
              </div>
              <div className="flex justify-center items-center w-full h-[63px] mt-[26px] bg-[#f6f6f6]">
                <p className="text-[#757575] text-[12px] leading-5">
                  💡 간단한 정보만 입력하면 5분 안에 결과를 확인할 수 있어요.
                  <br />
                  <span className="pl-[21px]" />
                  수집된 정보는 저장되지 않으니 안심하세요.
                </p>
              </div>
            </div>
            <button
              onClick={handleStart}
              style={{ marginTop: "10px" }}
              className="w-full h-[55px] bg-[#58CCFF] flex border-none rounded-[10px] items-center justify-center text-white text-[18px] font-bold hover:bg-[#45b8eb] transition-all"
            >
              시작하기
            </button>
          </div>
        );

      case 1:
        return (
          <>
            <SectionHeader
              subtitle={STEP_CONFIG[1].subtitle}
              description={STEP_CONFIG[1].description}
            />
            <P.User formData={formData} onFormChange={handleFormChange} />
            <C.Footer
              title={STEP_CONFIG[1].footerTitle}
              onClick={handleNext}
              tipTitle={STEP_CONFIG[1].tipTitle}
              warningBox={STEP_CONFIG[1].warningBox}
            />
          </>
        );
      case 2:
        return (
          <>
            <SectionHeader
              subtitle={STEP_CONFIG[2].subtitle}
              description={STEP_CONFIG[2].description}
            />
            <P.Earnings formData={formData} onFormChange={handleFormChange} />
            <C.Footer
              title={STEP_CONFIG[2].footerTitle}
              onClick={handleNext}
              tipTitle={STEP_CONFIG[2].tipTitle}
              warningBox={STEP_CONFIG[2].warningBox}
            />
          </>
        );
      case 3:
        return (
          <>
            <SectionHeader
              subtitle={STEP_CONFIG[3].subtitle}
              description={STEP_CONFIG[3].description}
            />
            <P.House formData={formData} onFormChange={handleFormChange} />
            <C.Footer
              title={STEP_CONFIG[3].footerTitle}
              onClick={handleNext}
              tipTitle={STEP_CONFIG[3].tipTitle}
              warningBox={STEP_CONFIG[3].warningBox}
            />
          </>
        );
      case 4:
        return (
          <>
            <SectionHeader
              subtitle={STEP_CONFIG[4].subtitle}
              description={STEP_CONFIG[4].description}
            />
            <P.Credit formData={formData} onFormChange={handleFormChange} />
            <C.Footer
              title={STEP_CONFIG[4].footerTitle}
              onClick={handleNext}
              tipTitle={STEP_CONFIG[4].tipTitle}
              warningBox={STEP_CONFIG[4].warningBox}
            />
          </>
        );
      case 5:
        return (
          <>
            <SectionHeader
              subtitle={STEP_CONFIG[5].subtitle}
              description={STEP_CONFIG[5].description}
            />
            <P.Contract formData={formData} onFormChange={handleFormChange} />
            <C.Footer
              title={STEP_CONFIG[5].footerTitle}
              onClick={handleNext}
              tipTitle={STEP_CONFIG[5].tipTitle}
              warningBox={STEP_CONFIG[5].warningBox}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-w-full min-h-screen pb-[60px]">
      <C.Header
        title={
          currentStep === 0 ? "대출 가이드" : STEP_CONFIG[currentStep]?.title
        }
        onClick={handleBack}
      />

      {currentStep > 0 && (
        <div className="w-[992px] mx-auto mt-[60px]">
          <C.ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>
      )}

      <div className={currentStep > 0 ? "w-[992px] mx-auto mt-[41px]" : ""}>
        {renderContent()}
      </div>
    </div>
  );
}
