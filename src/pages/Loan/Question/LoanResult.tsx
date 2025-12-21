// 대출 가이드 결과
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AILoading } from "@/components";
import API from "@/api/axios";
import { HiCalculator } from "react-icons/hi";
import { MdApartment } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";

interface LoanRequestData {
  age: number;
  isHouseholder: boolean;
  familyType: string;
  annualSalary: number;
  monthlySalary: number;
  incomeType: string;
  incomeCategory: string;
  rentalArea: string;
  houseType: string;
  rentalType: string;
  deposit: number;
  managementFee: number;
  availableLoan: boolean;
  creditRating: number;
  loanType: string;
  overdueRecord: boolean;
  hasLeaseAgreement: boolean;
  confirmed: string;
}

export default function LoanResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);

  const loanRequestData = location.state as LoanRequestData | null;

  // useEffect(() => {
  //   if (!loanRequestData) {
  //     navigate("/loan");
  //     return;
  //   }

  //   const fetchLoanResult = async () => {
  //     const token = localStorage.getItem("accessToken");

  //     try {
  //       const res = await API.post(
  //         "/api/loan",
  //         loanRequestData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       console.log("대출 가이드 결과:", res.data);
  //       setResult(res.data);
  //     } catch (error) {
  //       console.error("대출 가이드 요청 실패:", error);
  //       alert("대출 가이드 조회에 실패했습니다.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLoanResult();
  // }, [loanRequestData, navigate]);

  // if (loading) {
  //   return <AILoading title="대출 가이드" />;
  // }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-[60px] flex justify-center items-center text-black text-[22px] font-semibold mt-[30px] mb-[50px]">
        대출 가이드 결과
      </div>
      <div className="w-[992px] mx-auto">
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
              20,000만원
            </p>
            <p className="text-white text-[20px] font-semibold">연 2.8%</p>
          </div>
        </div>
        <div className="w-full min-h-[291px] p-[40px] mb-[4px]">
          <div className="w-full">
            <p className="text-black text-[18px] font-semibold flex">
              <HiCalculator color="#58CCFF" size={25} className="mr-[6px]" />
              예상 지불 금액
            </p>
          </div>
          <div className="flex items-center justify-between w-full mt-[30px]">
            <p className="text-[#757575] text-[16px] font-medium">자기 자금</p>
            <p className="text-[#757575] text-[16px] font-medium">5,000만원</p>
          </div>
          <div className="flex items-center justify-between w-full mt-[22px]">
            <p className="text-[#757575] text-[16px] font-medium">
              월 이자(예상)
            </p>
            <p className="text-[#757575] text-[16px] font-medium">47만원</p>
          </div>
          <div className="flex items-center justify-between w-full mt-[22px]">
            <p className="text-[#757575] text-[16px] font-medium">관리비</p>
            <p className="text-[#757575] text-[16px] font-medium">12만원</p>
          </div>
          <div className="flex items-center justify-between w-full mt-[27px]">
            <p className="text-black text-[16px] font-medium">
              월 총 부담 금액
            </p>
            <p className="text-[#58CCFF] text-[18px] font-semibold">
              약 59만원
            </p>
          </div>
        </div>
        <div className="w-full min-h-[414px] p-[40px] mb-[4px]">
          <div className="w-full mb-[16px]">
            <p className="text-black text-[18px] font-semibold flex">
              <MdApartment color="#58CCFF" size={25} className="mr-[6px]" />
              추천 대출 상품
            </p>
          </div>
          <div className="w-full p-5 min-h-[195px] bg-[#F6FBFF] rounded-[10px]">
            <div className="flex justify-between w-full">
              <p className="text-black text-[16px] font-semibold">
                청년 전월세보증금 대출
              </p>
              <p className="text-[#757575] text-[16px] font-bold">추천</p>
            </div>
            <div className="flex justify-between w-full mt-[14px] mb-[18px]">
              <p className="text-[#757575] text-[13px] font-medium">
                주택도시기금 • 한도: 최대 1억원 • 금리: 연 1.8~2.4%
              </p>
            </div>
            <ul className="list-disc list-outside pl-[20px] marker:text-[#58CCFF]">
              <li className="mb-[10px]">
                <p className="text-[#757575] text-[13px] font-medium">
                  만 19~34세 무주택자
                </p>
              </li>
              <li className="mb-[10px]">
                <p className="text-[#757575] text-[13px] font-medium">
                  보증금의 80% 이내
                </p>
              </li>
              <li>
                <p className="text-[#757575] text-[13px] font-medium">
                  저금리 혜택
                </p>
              </li>
            </ul>
          </div>
          <div className="min-h-[163px] items-center justify-between w-full p-5">
            <div className="flex w-full">
              <p className="text-black text-[16px] font-semibold">
                일반 전세대출자금
              </p>
            </div>
            <div className="flex w-full mb-[14px] mt-[14px]">
              <p className="text-[#757575] text-[13px] font-medium">
                은행권 • 한도: 보증금의 70~80% • 금리: 연 3.0~4.5%
              </p>
            </div>
            <div className="flex w-full">
              <ul className="list-disc list-outside pl-[20px] marker:text-[#58CCFF]">
                <li className="mb-[12px]">
                  <p className="text-[#757575] text-[13px]">
                    주택기금 대상 외 일반 대출
                  </p>
                </li>
                <li>
                  <p className="text-[#757575] text-[13px]">
                    신용등급에 따라 금리 차등
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full min-h-[415px] p-[25px] mb-[4px]">
          <div className="w-full mb-[22px]">
            <p className="text-black text-[16px] font-semibold flex">
              <IoDocumentTextOutline
                color="#58CCFF"
                size={25}
                className="mr-[6px]"
              />
              신청 절차 및 방법
            </p>
          </div>
          <div className="flex min-h-[43px] w-full mt-[22px]">
            <div className="w-[28px] h-[28px] flex justify-center items-center bg-[#58CCFF] rounded-full text-[12px] text-white font-semibold mr-[12px]">
              1
            </div>
            <div className="min-w-[208px] min-h-full">
              <p className="text-[13px] text-black mb-[4px]">
                대출 상담 및 상품 선택
              </p>
              <p className="text-[11px] text-[#757575]">
                은행 앱 또는 영업점 방문하여 상담
              </p>
            </div>
          </div>
          <div className="flex min-h-[43px] w-full mt-[22px]">
            <div className="w-[28px] h-[28px] flex justify-center items-center bg-[#58CCFF] rounded-full text-[12px] text-white font-semibold mr-[12px]">
              2
            </div>
            <div className="min-w-[208px] min-h-full">
              <p className="text-[13px] text-black mb-[4px]">필요 서류 준비</p>
              <ul className="list-disc list-outside pl-[20px] marker:text-[#757575]">
                <li className="mb-[4px]">
                  <p className="text-[#757575] text-[11px]">
                    신분증, 재직증명서
                  </p>
                </li>
                <li className="mb-[4px]">
                  <p className="text-[#757575] text-[11px]">
                    소득증명 서류 (원천징수영수증 등)
                  </p>
                </li>
                <li className="mb-[4px]">
                  <p className="text-[#757575] text-[11px]">
                    임대차계약서 사본
                  </p>
                </li>
                <li>
                  <p className="text-[#757575] text-[11px]">등기부등본</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex min-h-[43px] w-full mt-[22px]">
            <div className="w-[28px] h-[28px] flex justify-center items-center bg-[#58CCFF] rounded-full text-[12px] text-white font-semibold mr-[12px]">
              3
            </div>
            <div className="min-w-[208px] min-h-full">
              <p className="text-[13px] text-black mb-[4px]">
                대출 심사 및 승인
              </p>
              <p className="text-[11px] text-[#757575]">
                신용평가 및 소득 심사 (2~3 영업일 소요)
              </p>
            </div>
          </div>
          <div className="flex min-h-[43px] w-full mt-[22px]">
            <div className="w-[28px] h-[28px] flex justify-center items-center bg-[#58CCFF] rounded-full text-[12px] text-white font-semibold mr-[12px]">
              4
            </div>
            <div className="min-w-[208px] min-h-full">
              <p className="text-[13px] text-black mb-[4px]">
                계약 체결 및 전입신고
              </p>
              <p className="text-[11px] text-[#757575]">
                임대차계약 체결 후 전입신고 및 확정일자 받기
              </p>
            </div>
          </div>
          <div className="flex min-h-[43px] w-full mt-[22px]">
            <div className="w-[28px] h-[28px] flex justify-center items-center bg-[#58CCFF] rounded-full text-[12px] text-white font-semibold mr-[12px]">
              5
            </div>
            <div className="min-w-[208px] min-h-full">
              <p className="text-[13px] text-black mb-[4px]">대출 실행</p>
              <p className="text-[11px] text-[#757575]">
                임대인 계좌로 대출금 입금
              </p>
            </div>
          </div>
        </div>

        <div className="w-full min-h-[252px] p-[25px] mb-[4px]">
          <div className="w-full">
            <p className="text-black text-[16px] font-semibold flex">
              신청 가능 채널
            </p>
          </div>
          <div className="min-h-[215px] w-full mt-[22px]">
            <div className="min-w-full h-[63px] p-[12px] flex items-center mb-[13px]">
              <div className="w-[22px] h-[22px] mr-[12px]">
                <CiCircleCheck color="#58CCFF" size={25} />
              </div>
              <div className="min-w-[136px] min-h-[39px]">
                <div className="min-w-[208px] min-h-full">
                  <p className="text-[13px] text-black">은행 모바일 앱</p>
                  <p className="text-[11px] text-[#757575]">
                    KB국민, 신한, 우리, 하나 등
                  </p>
                </div>
              </div>
            </div>
            <div className="min-w-full h-[63px] p-[12px] flex items-center mb-[13px]">
              <div className="w-[22px] h-[22px] mr-[12px]">
                <CiCircleCheck color="#58CCFF" size={25} />
              </div>
              <div className="min-w-[136px] min-h-[39px]">
                <div className="min-w-[208px] min-h-full">
                  <p className="text-[13px] text-black">은행 영업점 방문</p>
                  <p className="text-[11px] text-[#757575]">상담 후 신청</p>
                </div>
              </div>
            </div>
            <div className="min-w-full h-[63px] p-[12px] flex items-center">
              <div className="w-[22px] h-[22px] mr-[12px]">
                <CiCircleCheck color="#58CCFF" size={25} />
              </div>
              <div className="min-w-[136px] min-h-[39px]">
                <div className="min-w-[208px] min-h-full">
                  <p className="text-[13px] text-black">
                    기금e든든 (주택도시기금)
                  </p>
                  <p className="text-[11px] text-[#757575]">
                    청년·신혼부부 전용 상품
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full min-h-[252px] p-[25px] mt-[20px]">
          <div className="w-full">
            <p className="text-black text-[16px] font-semibold flex">
              선행 조건 체크리스트
            </p>
          </div>
          <div className="min-h-[215px] w-full mt-[13px]">
            <div className="box-content min-w-full h-[39px] p-[12px] flex">
              <div className="w-[22px] h-[22px] mr-[12px]">
                <div className="w-[22px] h-[22px] flex justify-center items-center bg-[#58CCFF] rounded-full">
                  <CiCircleCheck color="white" size={15} />
                </div>
              </div>
              <div className="min-w-[136px] h-[39px]">
                <div className="min-w-[208px] min-h-full">
                  <p className="text-[13px] text-black">확정일자 받기</p>
                  <p className="text-[11px] text-[#757575]">
                    계약 체결 후 주민센터 또는 인터넷으로 신청
                  </p>
                </div>
              </div>
            </div>
            <div className="box-content min-w-full h-[39px] p-[12px] flex">
              <div className="w-[22px] h-[22px] mr-[12px]">
                <div className="w-[22px] h-[22px] flex justify-center items-center bg-[#58CCFF] rounded-full">
                  <CiCircleCheck color="white" size={15} />
                </div>
              </div>
              <div className="min-w-[136px] h-[39px]">
                <div className="min-w-[208px] h-full">
                  <p className="text-[13px] text-black">전입신고</p>
                  <p className="text-[11px] text-[#757575]">
                    계약일 또는 잔금일 이후에 신고
                  </p>
                </div>
              </div>
            </div>
            <div className="box-content min-w-full h-[39px] p-[12px] flex mb-[13px]">
              <div className="w-[22px] h-[22px] mr-[12px]">
                <div className="w-[22px] h-[22px] flex justify-center items-center bg-[#58CCFF] rounded-full">
                  <CiCircleCheck color="white" size={15} />
                </div>
              </div>
              <div className="min-w-[136px] h-[39px]">
                <div className="min-w-[208px] min-h-full">
                  <p className="text-[13px] text-black">
                    임대차계약서 및 계약금 영수증
                  </p>
                  <p className="text-[11px] text-[#757575]">
                    대출 신청 시 필수 서류
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
        <div className="box-content w-full h-[55px] mt-[60px] pb-[60px]">
          <button className="w-full h-full bg-[#58CCFF] rounded-[10px] text-white text-[18px] font-bold justify-center items-center border-none">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
