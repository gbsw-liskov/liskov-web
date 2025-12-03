import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import * as C from './components';
import { CheckListSelect } from "@/allFiles";

export default function Analyze() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  const [showHouseSelect, setShowHouseSelect] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDocUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "application/pdf"];
      if (validTypes.includes(file.type)) {
        setUploadedFile(file);
      } else {
        alert("PNG, JPG, PDF 파일만 업로드 가능합니다.");
      }
    }
  };

  const handleHouseUpload = () => {
    setShowHouseSelect(true);
  };

  const handleCloseHouseSelect = () => {
    setShowHouseSelect(false);
  };

  const handleHouseSelect = (house: any) => {
    setSelectedHouse(house);
    setShowHouseSelect(false);
  };

  const isAnalyzeEnabled = uploadedFile && selectedHouse;

  const handleAnalyze = () => {
    if (isAnalyzeEnabled) {
      const analyzeData = {
        file: uploadedFile,
        fileName: uploadedFile?.name,
        house: selectedHouse,
      };
      
      navigate('/analyze/result', {state : analyzeData});
      // 추후 API 연결
    }
  };

  return (
    <>
      {!showHouseSelect ? (
        <div className="w-[790px] min-h-[644px] pt-[138px] mx-auto pb-[81px]">
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col w-full items-center h-[110px]">
            <h1 className="text-[28px] text-black font-semibold">
              부동산 위험 매물 분석
            </h1>
            <p className="flex text-center mt-[15px] font-medium text-[16px] text-[#757575]">
              등기부등본과 건축물대장을
              <br />
              업로드하여 매물의 위험도를 확인하세요.
            </p>
          </div>

          <div className="flex mt-[40px] justify-between w-[790px] h-[400px]">
            <C.UploadCard
              title="서류 업로드"
              uploadKind="doc"
              onclick={handleDocUpload}
              uploadedFile={uploadedFile}
            />
            <C.UploadCard
              title="매물 업로드"
              uploadKind="house"
              onclick={handleHouseUpload}
              selectedHouse={selectedHouse}
            />
          </div>

          <div className="flex justify-center h-auto w-full mt-[50px]">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!isAnalyzeEnabled}
              className={`cursor-pointer w-[357px] h-[51px] flex items-center justify-center rounded-[5px] border-none font-bold text-[16px] transition-colors ${
                isAnalyzeEnabled
                  ? "bg-[#58CCFF] text-white hover:bg-[#4AB8E8]"
                  : "bg-[#F2F2F2] text-[#A0A0A0] cursor-not-allowed"
              }`}
            >
              분석 시작하기
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={handleCloseHouseSelect}
            className="absolute top-4 right-4 z-50 text-[32px] text-black hover:text-gray-600 bg-white rounded-full w-10 h-10 flex items-center justify-center"
          >
          </button>
          <CheckListSelect
            title="매물 추가"
            buttonTitle="추가하기"
            redirectionURL="/analyze"
            AI={false}
            onHouseSelected={handleHouseSelect}
          />
        </div>
      )}
    </>
  );
}
