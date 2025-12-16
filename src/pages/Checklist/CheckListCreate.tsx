import * as I from "@/assets";
import * as C from "./components";
import { useState } from "react";
import API from "@/api/axios";

export default function CheckListCreate() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    propertyType: "",
    floor: "",
    area: "",
    builtYear: "",
    marketPrice: "",
    leaseType: "월세",
    deposit: "",
    monthlyRent: "",
    memo: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const propertyTypeMap: { [key: string]: string } = {
    아파트: "APARTMENT",
    빌라: "VILLA",
    오피스텔: "OFFICETEL",
    원룸: "ONE_ROOM",
    기타: "OTHER",
  };

  const leaseTypeMap: { [key: string]: string } = {
    월세: "MONTHLY_RENT",
    전세: "JEONSE",
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.propertyType ||
      !formData.floor ||
      !formData.area ||
      !formData.builtYear ||
      !formData.marketPrice ||
      !formData.leaseType ||
      !formData.deposit
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    if (formData.leaseType === "월세" && !formData.monthlyRent) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    const mappedPropertyType = propertyTypeMap[formData.propertyType];
    if (!mappedPropertyType) {
      alert(
        "주택형태는 아파트, 빌라, 오피스텔, 원룸, 기타 중 하나를 입력해주세요."
      );
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const res = await API.post(
        "/api/properties",
        {
          name: formData.name,
          address: formData.address,
          propertyType: mappedPropertyType,
          floor: parseInt(formData.floor),
          area: parseFloat(formData.area),
          builtYear: parseInt(formData.builtYear),
          marketPrice: parseInt(formData.marketPrice),
          leaseType: leaseTypeMap[formData.leaseType],
          deposit: parseInt(formData.deposit),
          monthlyRent: formData.monthlyRent
            ? parseInt(formData.monthlyRent)
            : null,
          memo: formData.memo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("매물 추가 성공:", res.data);
      alert("매물이 추가되었습니다.");
    } catch (error) {
      console.error("매물 추가 실패:", error);
      alert("매물 추가에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    if (confirm("작성 중인 내용이 사라집니다. 취소하시겠습니까?")) {
      setFormData({
        name: "",
        address: "",
        propertyType: "",
        floor: "",
        area: "",
        builtYear: "",
        marketPrice: "",
        leaseType: "월세",
        deposit: "",
        monthlyRent: "",
        memo: "",
      });
      setSelectedImage(null);
    }
  };

  return (
    <div className="flex min-w-full min-h-screen mt-[128px] justify-center pb-[60px]">
      <div className="w-[790px] min-h-screen">
        <h1 className="font-semibold text-[28px] text-black">체크리스트</h1>
        <div className="flex w-[790px] h-[1200px] justify-between pt-[50px]">
          <div className="w-[313px]">
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="w-full h-[313px] bg-[#F5FDFF] flex justify-center items-center rounded-[8px] flex-col shadow border-[#C4F2FF] border-[3px] hover:bg-[#E8F9FF] transition-colors">
                {selectedImage ? (
                  <img
                    className="w-full h-full object-cover rounded-[6px]"
                    src={selectedImage}
                    alt="선택된 이미지"
                  />
                ) : (
                  <>
                    <img
                      className="w-12 h-[42px] mb-5"
                      src={I.Image}
                      alt="이미지 사진"
                    />
                    <h1 className="text-[#58CCFF] text-[14px] font-semibold">
                      방 사진을 추가해보세요
                    </h1>
                  </>
                )}
              </div>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex flex-col w-[313px] h-[550px] justify-between mt-10">
              <C.Input
                title="매물이름"
                placeholder="매물이름을 입력해주세요"
                value={formData.name}
                onChange={(value) => handleInputChange("name", value)}
              />
              <C.Input
                title="주소"
                placeholder="주소를 입력해주세요"
                value={formData.address}
                onChange={(value) => handleInputChange("address", value)}
              />
              <C.Input
                title="주택형태"
                placeholder="아파트, 빌라, 오피스텔, 원룸, 기타"
                value={formData.propertyType}
                onChange={(value) => handleInputChange("propertyType", value)}
              />
              <C.Input
                title="층수"
                placeholder="층수를 입력해주세요 예) 12"
                value={formData.floor}
                onChange={(value) => handleInputChange("floor", value)}
              />
              <C.Input
                title="평수"
                placeholder="평수를 입력해주세요 예) 23"
                value={formData.area}
                onChange={(value) => handleInputChange("area", value)}
              />
            </div>
          </div>
          <div className="w-[418px] h-full">
            <div className="flex flex-col justify-between w-full h-[550px] mb-[50px]">
              <C.Input
                title="준공년도"
                placeholder="준공년도를 입력해주세요"
                value={formData.builtYear}
                onChange={(value) => handleInputChange("builtYear", value)}
              />
              <C.Input
                title="시세"
                placeholder="시세를 입력해주세요 예) 1억 5천"
                value={formData.marketPrice}
                onChange={(value) => handleInputChange("marketPrice", value)}
              />
              <C.Input
                title="거래 유형"
                button={true}
                value={formData.leaseType}
                onChange={(value) => handleInputChange("leaseType", value)}
              />
              <C.Input
                title="보증금"
                placeholder="보증금을 입력해주세요 예) 1000"
                value={formData.deposit}
                onChange={(value) => handleInputChange("deposit", value)}
              />
              {formData.leaseType === "전세" ? (
                <div className="w-full h-19">
                  <h1 className="font-medium text-[12px] text-black mb-2">
                    월세 금액
                  </h1>
                  <div className="w-full h-12 bg-[#F2F2F2] rounded-[5px] flex items-center justify-center">
                    <span className="text-[#757575] text-[12px] font-medium">
                      전세는 월세 금액이 필요하지 않습니다
                    </span>
                  </div>
                </div>
              ) : (
                <C.Input
                  title="월세 금액"
                  placeholder="월세 금액을 입력해주세요 예) 60"
                  value={formData.monthlyRent}
                  onChange={(value) => handleInputChange("monthlyRent", value)}
                />
              )}
            </div>
            <C.Input
              title="메모"
              placeholder="메모를 입력해주세요"
              memo={true}
              value={formData.memo}
              onChange={(value) => handleInputChange("memo", value)}
            />
          </div>
        </div>
        <div className="w-[790px] h-[60px] flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="w-[373px] h-full flex justify-center items-center border-0 bg-[#F2F2F2] text-[#757575] font-bold text-[18px] cursor-pointer hover:bg-[#E5E5E5] transition-colors"
          >
            생성취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[373px] h-full flex justify-center items-center border-0 bg-[#58CCFF] text-white font-bold text-[18px] cursor-pointer hover:bg-[#45b8eb] transition-colors"
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
