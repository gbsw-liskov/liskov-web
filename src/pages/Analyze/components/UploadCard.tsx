import * as Image from "@/assets";
import UploadHouse from "./UploadHouse";
import { useEffect, useState } from "react";
import API from "@/api/axios";

interface UploadCardProps {
  title: string;
  uploadKind: string;
  onclick: () => void;
  uploadedFile?: File | null;
}

export default function UploadCard({
  title,
  uploadKind,
  onclick,
  uploadedFile,
}: UploadCardProps) {
  const [info, setInfo] = useState<string>("");
  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  useEffect(() => {
    if(localStorage.getItem("HouseIndex")) {
      getHouseDetail();
    }
  }, [])

  const getHouseDetail = async () => {
    const houseIndex:number = Number(localStorage.getItem("HouseIndex"));
    const token = localStorage.getItem("accessToken");
      try{
        const res = await API.get(`/api/properties/${houseIndex}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        setSelectedHouse(res.data.data);
        const propertyTypeMap: { [key: string]: string } = {
          APARTMENT: "아파트",
          VILLA: "빌라",
          OFFICETEL: "오피스텔",
          ONE_ROOM: "원룸",
          OTHER: "기타",
        };
        const propertyType = propertyTypeMap[res.data.data.propertyType] || res.data.data.propertyType;
        const info = `${res.data.data.floor}층 | ${res.data.data.area}평 | ${propertyType}`;
        setInfo(info);
        localStorage.removeItem("HouseIndex");
      } catch (e) {
        console.error(e);
      }
  }
  return (
    <div
      onClick={onclick}
      className="w-[380px] h-[396px] rounded-[7px] border-[#F2F2F2] border-[5px] cursor-pointer"
    >
      <div className="w-full h-auto pt-5 pl-5">
        <p className="font-semibold text-[16px] text-black">{title}</p>
      </div>
      {uploadKind === "doc" ? (
        <div className="flex flex-col items-center w-full h-auto pt-[68px]">
          <div className="w-[122px] h-[122px] flex justify-center items-center">
            <img
              src={uploadedFile ? Image.Document : Image.UploadDoc}
              alt="업로드 아이콘"
            />
          </div>
          {uploadedFile ? (
            <p className="font-medium text-[#58CCFF] text-[18px] pt-[40px]">
              {uploadedFile.name}
            </p>
          ) : (
            <>
              <p className="font-medium text-black text-[16px] pt-4">
                등기 부등본, 건축물대장
              </p>
              <p className="font-medium text-[#757575] text-[14px] pt-3">
                PNG, JPG, PDF 업로드
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full h-auto pt-[18px]">
          {selectedHouse ? (
            <div className="pt-[20px]">
              <UploadHouse
                image={selectedHouse.image}
                name={selectedHouse.name}
                address={selectedHouse.address}
                info={info}
                memo={selectedHouse.memo}
                deposit={selectedHouse.deposit}
              />
            </div>
          ) : (
            <>
              <img src={Image.UploadHouse} alt="집 아이콘" />
              <p className="font-semibold text-black text-[16px] pt-7">
                관심매물에서 간편하게 매물 업로드!
              </p>
              <p className="font-bold text-[#3A98FF] text-[20px] pt-7">
                매물 업로드 하기
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
