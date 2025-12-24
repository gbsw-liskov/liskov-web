import {
  FaCheck,
  FaExclamation,
  FaExclamationTriangle,
  FaMinus,
} from "react-icons/fa";

interface DetailInspectProps {
  level: "NORMAL" | "WARNING" | "DANGER" | null;
  title: string;
  subTitle: string;
}

export default function DetailInspect({
  level,
  title,
  subTitle,
}: DetailInspectProps) {
  const getLevelIcon = () => {
    switch (level) {
      case "NORMAL":
        return (
          <div className="w-[35px] h-[35px] rounded-full bg-[#58CCFF] flex items-center justify-center">
            <FaCheck size={15} color="white" />
          </div>
        );
      case "WARNING":
        return (
          <div className="w-[35px] h-[35px] rounded-full bg-[#FFC107] flex items-center justify-center">
            <FaExclamation size={15} color="white" />
          </div>
        );
      case "DANGER":
        return (
          <div className="w-[35px] h-[35px] rounded-full bg-[#FF4444] flex items-center justify-center">
            <FaExclamationTriangle size={15} color="white" />
          </div>
        );
      default:
        return (
          <div className="w-[35px] h-[35px] rounded-full bg-[#A0A0A0] flex items-center justify-center">
            <FaMinus size={15} color="white" />
          </div>
        );
    }
  };

  return (
    <div className="w-full flex min-h-[84px] pt-[17px] pl-[8px]">
      <div className="w-[35px] h-full mr-[15px]">{getLevelIcon()}</div>

      <div className="min-w-[270px] min-h-[74px]">
        <h1 className="text-[15px] font-semibold text-black">{title}</h1>

        <p className="text-[14px] text-[#757575] font-medium">
          {subTitle.split("<br />").map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
