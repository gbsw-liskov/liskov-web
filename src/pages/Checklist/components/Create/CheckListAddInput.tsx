interface InputProps {
  title: string;
  placeholder?: string;
  memo?: boolean;
  button?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export default function CheckListAddInput({
  title,
  placeholder,
  memo = false,
  value,
  button = false,
  onChange,
}: InputProps) {
  return (
    <div className={`w-full ${memo ? "h-[428px]" : "h-19"}`}>
      <h1 className="font-medium text-[12px] text-black mb-2">{title}</h1>
      {memo ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[400px] bg-white pl-[17px] pt-[12px] border-[2px] border-[#F2F2F2] rounded-[5px] font-medium text-[12px] text-black placeholder:text-[#A0A0A0] resize-none outline-none focus:border-[#58CCFF] transition-colors"
          placeholder={placeholder}
        />
      ) : button ? (
        <div className="flex pt-[7px]">
          <button
            type="button"
            onClick={() => onChange("월세")}
            className={`w-[75px] h-10 rounded-[5px] font-semibold mr-[15px] transition-colors ${
              value === "월세"
                ? "text-white bg-[#58CCFF]"
                : "text-[#757575] bg-[#F2F2F2]"
            }`}
          >
            월세
          </button>
          <button
            type="button"
            onClick={() => onChange("전세")}
            className={`w-[75px] h-10 font-semibold rounded-[5px] transition-colors ${
              value === "전세"
                ? "text-white bg-[#58CCFF]"
                : "text-[#757575] bg-[#F2F2F2]"
            }`}
          >
            전세
          </button>
        </div>
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 bg-white pl-[17px] border-[2px] border-[#F2F2F2] rounded-[5px] font-medium text-[12px] text-black placeholder:text-[#A0A0A0] outline-none focus:border-[#58CCFF] transition-colors"
          type="text"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
