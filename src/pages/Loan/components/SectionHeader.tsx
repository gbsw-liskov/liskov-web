export default function SectionHeader({
  subtitle,
  description,
}: {
  subtitle: string;
  description: string;
}) {
  return (
    <div className="min-h-[64px] w-full flex flex-col justify-between">
      <h1 className="text-black text-[18px] font-semibold">{subtitle}</h1>
      <p className="text-[#757575] text-[14px]">{description}</p>
    </div>
  );
}
