interface InputProps {
  title: string;
  placeholder: string;
  memo?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export default function CheckListAddInput({
  title,
  placeholder,
  memo = false,
  value,
  onChange,
}: InputProps) {
  return (
    <div className={`w-full ${memo ? "h-[428px]" : "h-19"}`}>
      <h1 className="font-medium text-[12px] text-black mb-2">{title}</h1>
      {memo ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[268px] bg-white pl-[17px] pt-[12px] border-[2px] border-[#F2F2F2] rounded-[5px] font-medium text-[12px] text-black placeholder:text-[#A0A0A0] resize-none outline-none focus:border-[#58CCFF] transition-colors"
          placeholder={placeholder}
        />
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
