interface LoanInputProps {
  label: string;
  name: string;
  type: "text" | "button";
  placeholder?: string;
  options?: string[]; // 버튼 타입일 때 선택지들
  displayLabels?: string[]; // 화면에 표시될 레이블 (options와 매핑)
  value: string;
  onChange: (name: string, value: string) => void;
  buttonSize?: "full" | "half" | "third"; // 버튼 크기
  gridCols?: number; // 그리드 열 개수 (2열, 3열 등)
}

export default function LoanInput({
  label,
  name,
  type,
  placeholder,
  options = [],
  displayLabels,
  value,
  onChange,
  buttonSize = "full",
  gridCols,
}: LoanInputProps) {
  // 버튼 크기 매핑
  const buttonSizeClasses = {
    full: "w-full",
    half: "w-[491px]",
    third: "w-[325px]",
  };

  // 표시할 레이블 결정 (displayLabels가 있으면 사용, 없으면 options 사용)
  const labels = displayLabels || options;

  // 텍스트 입력
  if (type === "text") {
    return (
      <div className="mt-[32px]">
        <p className="text-black text-[14px] mb-[8px]">{label}</p>
        <input
          className="w-full text-black text-[14px] h-[47px] border focus:outline-none focus:border-[#58CCFF] border-[#D9D9D9] placeholder:text-[#A0A0A0] pl-[17px] rounded-[5px]"
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
        />
      </div>
    );
  }

  // 버튼 선택
  if (type === "button" && options.length > 0) {
    return (
      <div className="mt-[32px]">
        <p className="text-black text-[14px] mb-[8px]">{label}</p>
        <div
          className={
            gridCols ? `grid grid-cols-${gridCols} gap-[8px]` : "flex gap-[8px]"
          }
        >
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onChange(name, option)}
              className={`${
                buttonSizeClasses[buttonSize]
              } cursor-pointer text-[14px] h-[47px] rounded-[5px] transition-all ${
                value === option
                  ? "border-[#58CCFF] text-[#58CCFF] border-2"
                  : "border-[#D9D9D9] text-[#A0A0A0] border"
              }`}
            >
              {labels[index]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
