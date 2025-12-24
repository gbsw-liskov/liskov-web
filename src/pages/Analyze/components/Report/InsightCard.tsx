interface InsightCardProps {
  type: "danger" | "positive";
  title: string;
  content: string;
}

export default function InsightCard({
  type,
  title,
  content,
}: InsightCardProps) {
  const isDanger = type === "danger";

  return (
    <div
      className={`flex justify-end w-full min-h-[114px] ${
        isDanger ? "bg-[#ED5E5E] mb-[21px]" : "bg-[#58CCFF]"
      } rounded-[11px]`}
    >
      <div
        className={`w-[794px] min-h-[114px] ${
          isDanger ? "bg-[#FFEFEF]" : "bg-white"
        } rounded-[11px] pl-[30px] pt-[18px]`}
      >
        <h1 className="text-[15px] text-black font-semibold pb-[10px]">
          {title}
        </h1>
        <p
          className="text-[12px] text-[#757575] font-medium"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
