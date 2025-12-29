import * as C from "./components";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { AnalyzeResponse, PropertyForAnalyze } from "@/types/analyze";

export default function AnalyzeResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as
    | { analyzeResult: AnalyzeResponse; selectedProperty?: PropertyForAnalyze }
    | undefined;

  useEffect(() => {
    if (!state?.analyzeResult) {
      navigate("/analyze");
    }
  }, [state, navigate]);

  const goToHome = () => {
    navigate("/");
  };

  const result = state?.analyzeResult;
  if (!result) return null;

  const score = result.totalRisk ?? 0;
  const status =
    score >= 80
      ? "안심할 수 있는 상태입니다"
      : score >= 60
        ? "주의가 필요한 상태입니다"
        : "즉시 확인이 필요합니다";

  const insights = [
    {
      type: score >= 60 ? ("positive" as const) : ("danger" as const),
      title: "AI 종합 코멘트",
      content: result.comment || "코멘트가 없습니다.",
    },
  ];

  const inspectionItems = (result.details ?? []).map((d) => ({
    level: null,
    title: d.original,
    subTitle: d.analysisText,
  }));

  return (
    <div className="w-[806px] min-h-screen mx-auto">
      <C.Header />
      <C.ScoreSummary
        score={score}
        status={status}
        description={
          state?.selectedProperty
            ? `${state.selectedProperty.name}<br />${state.selectedProperty.address}`
            : "매물 분석 결과를 확인하세요"
        }
      />
      <C.AiInsightsSection insights={insights} />
      <C.InspectionResults items={inspectionItems} />
      <div className="w-full flex justify-between mt-[64px] pb-[60px]">
        <button
          onClick={goToHome}
          className="w-full h-[60px] border-none rounded-[10px] bg-[#58CCFF] text-[16px] font-bold text-white justify-center items-center cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  );
}