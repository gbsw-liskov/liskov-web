import * as Image from "@/assets";
import InsightCard from "./InsightCard";

interface InsightData {
  type: "danger" | "positive";
  title: string;
  content: string;
}

interface AiInsightsSectionProps {
  insights: InsightData[];
}

export default function AiInsightsSection({
  insights,
}: AiInsightsSectionProps) {
  return (
    <div className="w-full mt-[34px] bg-[#F7FAFF] rounded-[12px] p-[24px] shadow-sm flex flex-col gap-[14px]">
      <div className="flex items-center w-full">
        <img
          className="w-[32px] h-[32px] mr-[15px]"
          src={Image.Ai}
          alt="AI 이미지"
        />
        <h1 className="text-[26px] font-semibold text-black mt-[21px] mb-[21px]">
          핵심 인사이트
        </h1>
      </div>
      <div className="flex flex-col gap-[12px]">
        {insights.map((insight, index) => (
          <InsightCard
            key={index}
            type={insight.type}
            title={insight.title}
            content={insight.content}
          />
        ))}
      </div>
    </div>
  );
}
