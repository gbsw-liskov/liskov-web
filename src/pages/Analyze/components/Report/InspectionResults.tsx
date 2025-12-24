import DetailInspect from "./DetailInspect";

interface InspectionItem {
  level: "NORMAL" | "WARNING" | "DANGER" | null;
  title: string;
  subTitle: string;
}

interface InspectionResultsProps {
  items: InspectionItem[];
}

export default function InspectionResults({ items }: InspectionResultsProps) {
  return (
    <div className="w-full min-h-[100px] mt-[60px]">
      <h1 className="text-black text-[18px] font-semibold mb-[18px]">
        세부 점검 결과
      </h1>
      {items.map((item, index) => (
        <DetailInspect
          key={index}
          level={item.level}
          title={item.title}
          subTitle={item.subTitle}
        />
      ))}
    </div>
  );
}
