import * as I from "@/assets";
import * as C from "./components";
import { useState } from "react";
import axios from "axios";

export default function CheckListCreate() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    propertyType: "",
    floor: "",
    buildYear: "",
    area: "",
    availableDate: "",
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

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.propertyType ||
      !formData.floor
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/property", {
        name: formData.name,
        address: formData.address,
        propertyType: formData.propertyType,
        floor: formData.floor,
        buildYear: formData.buildYear,
        area: formData.area,
        availableDate: formData.availableDate,
      });

      console.log("매물 추가 성공:", response.data);
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
        buildYear: "",
        area: "",
        availableDate: "",
        memo: "",
      });
      setSelectedImage(null);
    }
  };

  return (
    <div className="flex min-w-full min-h-screen mt-[128px] justify-center pb-[60px]">
      <div className="w-[790px] min-h-screen">
        <h1 className="font-semibold text-[28px] text-black">체크리스트</h1>
        <div className="flex w-[790px] h-[669px] justify-between pt-[50px]">
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
            <div className="flex flex-col w-[313px] h-[195px] justify-between mt-10">
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
            </div>
          </div>
          <div className="w-[418px] h-full">
            <div className="flex flex-col justify-between w-full h-[202px] mb-[50px]">
              <C.Input
                title="주택형태"
                placeholder="주택 형태를 입력해주세요"
                value={formData.propertyType}
                onChange={(value) => handleInputChange("propertyType", value)}
              />
              <C.Input
                title="동/호수"
                placeholder="동/호수를 입력해주세요"
                value={formData.floor}
                onChange={(value) => handleInputChange("floor", value)}
              />
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
