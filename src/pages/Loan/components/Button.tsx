interface ButtonProps {
  title: string;
  mt?: string;
  onClick: () => void;
}

export default function Button({ title, mt = "10px", onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ marginTop: mt }}
      className="w-full h-[55px] bg-[#58CCFF] flex border-none rounded-[10px] items-center justify-center text-white text-[18px] font-bold hover:bg-[#45b8eb] transition-all"
    >
      {title}
    </button>
  );
}
