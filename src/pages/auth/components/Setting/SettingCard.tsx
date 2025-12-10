interface SettingCardProps {
  icon: React.ReactNode;
  title: string;
  label: string;
  value: string;
  onEdit: () => void;
}

export default function SettingCard({
  icon,
  title,
  value,
  label,
  onEdit,
}: SettingCardProps) {
  return (
    <div className="w-[515px] h-[110px] pt-[18px] pb-[22px] px-[22px] bg-white rounded-lg flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold text-black">{title}</h3>
        <button
          onClick={onEdit}
          className="text-[14px] font-medium text-[#58CCFF]"
        >
          수정
        </button>
      </div>

      <div className="flex items-center space-x-3">
        {icon}
        <div className="flex items-center justify-between w-full space-x-4">
          <span className="text-[14px] font-medium text-black">{label}</span>
          <span className="text-[14px] font-medium text-black">{value}</span>
        </div>
      </div>
    </div>
  );
}
