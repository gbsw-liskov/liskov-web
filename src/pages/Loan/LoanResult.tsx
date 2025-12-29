import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AILoading } from "@/components";
import API from "@/api/axios";
import * as C from "./components";

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
  confirmedDate: string;
}

interface LoanResultData {
  loanAmount: number;
  interestRate: number;
  ownCapital: number;
  monthlyInterest: number;
  managementFee: number;
  totalMonthlyCost: number;
  loans: Array<{ title: string; content: string }>;
  procedures: Array<{ title: string; content: string }>;
  channels: Array<{ title: string; content: string }>;
  advance: Array<{ title: string; content: string }>;
}

export default function LoanResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<LoanResultData | null>(null);

  const loanRequestData = location.state as LoanRequestData | null;

  useEffect(() => {
    if (!loanRequestData) {
      navigate("/loan");
      return;
    }

    const fetchLoanResult = async () => {
      const token = localStorage.getItem("accessToken");
      console.log(loanRequestData);
      try {
        const res = await API.post("/api/loan", loanRequestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("대출 가이드 결과:", res.data);
        setResult(res.data.data);
      } catch (error) {
        console.error("대출 가이드 요청 실패:", error);
        alert("대출 가이드 생성에 실패했습니다.");
        navigate("/loan");
      } finally {
        setLoading(false);
      }
    };

    fetchLoanResult();
  }, [loanRequestData, navigate]);

  if (loading) {
    return <AILoading title="대출 가이드" />;
  }

  if (!result) {
    return null;
  }

  const handleConfirm = () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-[60px] flex justify-center items-center text-black text-[22px] font-semibold mt-[30px] mb-[50px]">
        대출 가이드 결과
      </div>

      <div className="w-[992px] mx-auto pb-[60px]">
        <C.LoanSummaryCard
          loanAmount={result.loanAmount}
          interestRate={result.interestRate}
        />

        <C.ExpectedPayment
          ownCapital={result.ownCapital}
          monthlyInterest={result.monthlyInterest}
          managementFee={result.managementFee}
          totalMonthlyCost={result.totalMonthlyCost}
        />

        <C.RecommendedLoans loans={result.loans} />

        <C.Procedures procedures={result.procedures} />

        <C.Channels channels={result.channels} />

        <C.AdvanceChecklist advance={result.advance} />

        <C.WarningNotice />

        <div className="box-content w-full h-[55px] mt-[60px]">
          <button
            onClick={handleConfirm}
            className="w-full h-full bg-[#58CCFF] rounded-[10px] text-white text-[18px] font-bold justify-center items-center border-none hover:bg-[#45b8eb] transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
