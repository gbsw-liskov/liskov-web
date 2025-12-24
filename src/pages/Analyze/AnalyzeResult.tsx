import * as C from "./components";
import { useNavigate } from "react-router-dom";

export default function AnalyzeResult() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const insights = [
    {
      type: "danger" as const,
      title: "즉시 확인 필요",
      content:
        "보일러와 채광 문제가 발견되었습니다.<br /><div class='pt-[4px]'>특히 보일러는 겨울철 생활에 직접적인 영향을 미치므로 계약 전 반드시 수리 또는 교체를 요구하세요.</div>",
    },
    {
      type: "positive" as const,
      title: "긍정적 요소",
      content:
        "화장실 상태는 양호하고 수압도 적절합니다. 주방 바닥의 찍힘은 생활에 큰 지장은 없지만<br /><div class='pt-[4px]'>입주 전 사진으로 기록해두시는 것을추천드려요.</div>",
    },
  ];

  const inspectionItems = [
    {
      level: "NORMAL" as const,
      title: "화장실 곰팡이 확인하기",
      subTitle: "곰팡이 없이 청결한 상태입니다. 환기 상태도 양호해요.",
    },
    {
      level: "WARNING" as const,
      title: "바닥 찍힘 상태 확인하기",
      subTitle:
        "주방 바닥 안쪽 화장실 입구 장고 미세한 바닥 찍힘 있음<br />- 생활에 지장은 없으나 입주 전 사진 촬영 권장",
    },
    {
      level: "DANGER" as const,
      title: "채광이 잘 드는지 확인하기",
      subTitle:
        "집 창문쪽 아파트가 있어 햇빛이 잘 들지 않은<br />- 낮에도 조명 사용이 필요할 수 있어요",
    },
    {
      level: "WARNING" as const,
      title: "수압 확인하기",
      subTitle:
        "주방은 수압이 좋지만 화장실은 수압이 불규칙적임<br />- 배관 점검 필요",
    },
    {
      level: "DANGER" as const,
      title: "보일러 확인하기",
      subTitle:
        "보일러가 오래되어 오래 기다려야 온도가 올라감<br />- 교체 또는 수리 필수",
    },
  ];

  return (
    <div className="w-[806px] min-h-screen mx-auto">
      <C.Header />
      <C.ScoreSummary
        score={68}
        status="주의가 필요한 상태입니다"
        description="일부 항목에서 문제가 발견되었어요.<br />계약 전 개선 가능 여부를 확인하세요"
        normalCount={1}
        warningCount={2}
        dangerCount={2}
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
