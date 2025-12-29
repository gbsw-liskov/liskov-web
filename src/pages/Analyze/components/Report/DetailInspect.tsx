interface DetailInspectProps {
  title: string;
  subTitle: string;
}

export default function DetailInspect({
  title,
  subTitle,
}: DetailInspectProps) {

  return (
    <div className="w-full rounded-[10px] bg-white flex min-h-[84px] pt-[17px] pl-[8px]">
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
