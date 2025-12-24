interface LoanInputProps {
  label: string;
  name: string;
  type: "text" | "button" | "number";
  placeholder?: string;
  options?: string[];
  displayLabels?: string[];
  value: string;
  onChange: (name: string, value: string) => void;
  buttonSize?: "full" | "half" | "third";
  gridCols?: number;
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
  const buttonSizeClasses = {
    full: "w-full",
    half: "w-[491px]",
    third: "w-[325px]",
  };

  const labels = displayLabels || options;

  // 숫자 입력 핸들러
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      onChange(name, value);
    }
  };

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

  // 숫자 입력
  if (type === "number") {
    return (
      <div className="mt-[32px]">
        <p className="text-black text-[14px] mb-[8px]">{label}</p>
        <input
          className="w-full text-black text-[14px] h-[47px] border focus:outline-none focus:border-[#58CCFF] border-[#D9D9D9] placeholder:text-[#A0A0A0] pl-[17px] rounded-[5px]"
          type="text"
          name={name}
          value={value}
          onChange={handleNumberChange}
          placeholder={placeholder}
        />
      </div>
    );
  }

  // 버튼 선택
  if (type === "button" && options.length > 0) {
    // gridCols가 있으면 grid 사용, 없으면 flex + buttonSize 사용
    const gridClass =
      gridCols === 1
        ? "grid grid-cols-1 gap-[8px]"
        : gridCols === 2
        ? "grid grid-cols-2 gap-[8px]"
        : gridCols === 3
        ? "grid grid-cols-3 gap-[8px]"
        : "flex gap-[8px]";

    // gridCols가 있으면 버튼은 w-full, 없으면 buttonSize 적용
    const buttonWidthClass = gridCols
      ? "w-full"
      : buttonSizeClasses[buttonSize];

    return (
      <div className="mt-[32px]">
        <p className="text-black text-[14px] mb-[8px]">{label}</p>
        <div className={gridClass}>
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onChange(name, option)}
              className={`${buttonWidthClass} cursor-pointer text-[14px] h-[47px] rounded-[5px] transition-all ${
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
