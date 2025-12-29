import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import * as C from "./components";
import { CheckListSelect } from "@/allFiles";
import API from "@/api/axios";
import { AILoading } from "@/components";
import toast from "react-hot-toast";
import type { AnalyzeResponse, PropertyForAnalyze } from "@/types/analyze";

export default function Analyze() {
  const navigate = useNavigate();
  const location = useLocation();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<PropertyForAnalyze | null>(null);
  const [showHouseSelect, setShowHouseSelect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const state = location.state as { propertyId?: number } | undefined;
    if (state?.propertyId) {
      fetchPropertyDetail(state.propertyId);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const fetchPropertyDetail = async (id: number) => {
    try {
      const res = await API.get(`/api/properties/${id}`);
      const data = res.data?.data ?? res.data;

      const normalized: PropertyForAnalyze = {
        propertyId: data.propertyId,
        name: data.name,
        address: data.address,
        propertyType: data.propertyType,
        floor: data.floor,
        area: data.area,
        builtYear: data.builtYear,
        marketPrice: data.marketPrice ?? data.makretPrice ?? 0, // 백엔드 스펙 오탈자 케이스 대응
        leaseType: data.leaseType,
        deposit: data.deposit,
        monthlyRent: data.monthlyRent ?? null,
        memo: data.memo ?? "",
        createdAt: data.createdAt,
      };

      setSelectedHouse(normalized);
    } catch (e) {
      console.error("매물 상세 조회 실패:", e);
      toast.error("매물 정보를 불러오지 못했습니다. 다시 시도해주세요.");
    }
  };

  const handleDocUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const validTypes = ["image/png", "image/jpeg", "application/pdf"];
    const invalid = files.find((f) => !validTypes.includes(f.type));
    if (invalid) {
      toast.error("PNG, JPG, PDF 파일만 업로드 가능합니다.");
      return;
    }

    // 등기부등본 + 건축물대장 (2개) 업로드를 기본으로 안내
    setUploadedFiles(files);
  };

  const handleHouseUpload = () => {
    setShowHouseSelect(true);
  };

  const handleCloseHouseSelect = () => {
    setShowHouseSelect(false);
  };

  const handleHouseSelect = (id: number) => {
    setShowHouseSelect(false);
    fetchPropertyDetail(id);
  };

  const isAnalyzeEnabled = uploadedFiles.length >= 1 && selectedHouse;

  const handleAnalyze = async () => {
    if (!selectedHouse) {
      toast.error("매물을 선택해주세요.");
      return;
    }
    if (uploadedFiles.length < 1) {
      toast.error("서류를 최소 1개 이상 업로드해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const requestPayload = {
        propertyId: selectedHouse.propertyId,
        marketPrice: selectedHouse.marketPrice,
        deposit: selectedHouse.deposit,
        monthlyRent: selectedHouse.monthlyRent ?? 0,
      };

      const formData = new FormData();
      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], { type: "application/json" }),
      );

      // 파일은 1개만 있어도 동작해야 하므로, 존재하는 것만 첨부합니다.
      if (uploadedFiles[0]) formData.append("files", uploadedFiles[0]); // 첫 번째 파일(등기부등본 등)
      if (uploadedFiles[1]) formData.append("files", uploadedFiles[1]); // 두 번째 파일(건축물대장 등)

      const formDataEntries: Array<
        { key: string; value: string } | { key: string; file: { name: string; type: string; size: number } }
      > = [];
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          formDataEntries.push({ key, value });
        } else {
          const file = value as File;
          formDataEntries.push({
            key,
            file: { name: file.name, type: file.type, size: file.size },
          });
        }
      }

      const res = await API.post("/api/analysis", formData);
      const result: AnalyzeResponse = (res.data?.data ?? res.data) as AnalyzeResponse;
      navigate("/analyze/result", {
        state: {
          analyzeResult: result,
          selectedProperty: selectedHouse,
        },
      });
    } catch (e) {
      console.error("매물 분석 요청 실패:", e);
      toast.error("매물 분석에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <AILoading title="매물 분석 결과" />;
  }

  return (
    <>
      {!showHouseSelect ? (
        <div className="w-[790px] min-h-[644px] pt-[138px] mx-auto pb-[81px]">
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            multiple
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
              uploadedFiles={uploadedFiles}
            />
            <C.UploadCard
              title="매물 업로드"
              uploadKind="house"
              onclick={handleHouseUpload}
              selectedHouse={selectedHouse ?? undefined}
            />
          </div>

          <div className="flex justify-center h-auto w-full mt-[50px]">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!isAnalyzeEnabled || isSubmitting}
              className={`cursor-pointer w-[357px] h-[51px] flex items-center justify-center rounded-[5px] border-none font-bold text-[16px] transition-colors ${
                isAnalyzeEnabled
                  ? "bg-[#58CCFF] text-white hover:bg-[#4AB8E8]"
                  : "bg-[#F2F2F2] text-[#A0A0A0] cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "분석 중..." : "분석 시작하기"}
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={handleCloseHouseSelect}
            className="absolute top-4 right-4 z-50 text-[32px] text-black hover:text-gray-600 bg-white rounded-full w-10 h-10 flex items-center justify-center"
          ></button>
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
