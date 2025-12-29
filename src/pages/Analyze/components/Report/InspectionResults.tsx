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
    <div className="w-full min-h-[100px] mt-[32px] rounded-[12px] bg-white border border-[#E5E7EB] shadow-sm p-[20px] flex flex-col gap-[12px]">
      <h1 className="text-black text-[18px] font-semibold">세부 점검 결과</h1>
      <div className="flex flex-col gap-[14px]">
        {items.map((item, index) => (
          <DetailInspect
            key={index}
            title={item.title}
            subTitle={item.subTitle}
          />
        ))}
      </div>
    </div>
  );
}
