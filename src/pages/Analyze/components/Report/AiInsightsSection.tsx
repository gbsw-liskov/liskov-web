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
    <div className="w-full min-h-[300px] mt-[34px]">
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
      {insights.map((insight, index) => (
        <InsightCard
          key={index}
          type={insight.type}
          title={insight.title}
          content={insight.content}
        />
      ))}
    </div>
  );
}
