import { useState } from "react";
import * as Image from "@/assets";
import * as C from "./components";
import * as P from "./Question";

const TOTAL_STEPS = 5;

export default function LoanGuide() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="min-w-full min-h-screen pb-[60px]">
            <C.Header title="대출 가이드" />
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
              <C.Button title="시작하기" mt="10px" onClick={handleStart} />
            </div>
          </div>
        );

      case 1:
        return <P.User onNext={handleNext} />;
      case 2:
        return <P.Earnings onNext={handleNext} />;
      case 3:
        return <P.House onNext={handleNext} />;
      case 4:
        return <P.Credit onNext={handleNext} />;
      case 5:
        return <P.Contract onNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <>
      {currentStep === 0 ? (
        renderContent()
      ) : (
        <div className="min-w-full min-h-screen pb-[60px]">
          <C.Header title="대출 가이드" />
          <div className="w-[992px] mx-auto mt-[41px]">
            <C.ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            <div className="mt-[41px]">{renderContent()}</div>
          </div>
        </div>
      )}
    </>
  );
}
