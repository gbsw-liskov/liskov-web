interface UploadHouseProps {
  image: string;
  name: string;
  address: string;
  info: string;
  memo: string;
  deposit: number;
}

export default function UploadHouse({
  image,
  name,
  address,
  info,
  memo,
  deposit,
}: UploadHouseProps) {
  return (
    <div className="w-[204px] h-[285px]">
      <div className="w-full h-[137px] rounded-[8px]">
        <img
          className="w-full h-full rounded-[8px] object-cover"
          src={image}
          alt="매물 사진"
        />
      </div>
      <div className="w-full h-auto pt-[22px]">
        <p className="text-[#757575] text-[12px] font-medium">{name}</p>
        <p className="text-black text-[13px] font-medium">{address}</p>
        <p className="text-[#757575] text-[12px] font-medium">{info}</p>
        <p className="text-[#757575] text-[12px] font-medium">{memo}</p>
        <p className="text-black text-[14px] font-semibold">{deposit}</p>
      </div>
    </div>
  );
}
