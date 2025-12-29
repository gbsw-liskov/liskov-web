import API from "@/api/axios";
import * as C from "./components/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Property {
  propertyId: number;
  name: string;
  address: string;
  propertyType: string;
  floor: number;
  area: number;
  builtYear: number;
  marketPrice: number;
  leaseType: string;
  deposit: number;
  monthlyRent: number | null;
  memo: string;
  image?: string;
}

type RawProperty = Record<string, unknown>;

const FALLBACK_IMAGES = [
  "/assets/property/다운로드 (1).jpeg",
  "/assets/property/다운로드 (2).jpeg",
  "/assets/property/다운로드 (3).jpeg",
  "/assets/property/다운로드 (4).jpeg",
  "/assets/property/다운로드 (5).jpeg",
  "/assets/property/다운로드 (6).jpeg",
  "/assets/property/다운로드 (7).jpeg",
  "/assets/property/다운로드 (8).jpeg",
  "/assets/property/다운로드 (9).jpeg",
  "/assets/property/다운로드 (10).jpeg",
];

const toNumber = (v: unknown, fallback = 0) => {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) {
    return Number(v);
  }
  return fallback;
};

const normalizeProperty = (raw: RawProperty): Property => {
  const marketPriceRaw =
    raw.marketPrice ??
    raw.market_price ??
    raw.marketprice ??
    raw.price ??
    raw.salePrice ??
    raw.sale_price;

  const monthlyRentRaw = raw.monthlyRent ?? raw.monthly_rent ?? raw.monthlyrent;
  const idForImage = toNumber(raw.propertyId ?? raw.id, 0);
  const fallbackImage =
    FALLBACK_IMAGES[idForImage % FALLBACK_IMAGES.length] ?? FALLBACK_IMAGES[0];

  return {
    propertyId: toNumber(raw.propertyId ?? raw.id, 0),
    name: String(raw.name ?? ""),
    address: String(raw.address ?? ""),
    propertyType: String(raw.propertyType ?? raw.type ?? ""),
    floor: toNumber(raw.floor, 0),
    area: toNumber(raw.area, 0),
    builtYear: toNumber(raw.builtYear ?? raw.built_year, 0),
    marketPrice: toNumber(marketPriceRaw, 0),
    leaseType: String(raw.leaseType ?? raw.lease_type ?? ""),
    deposit: toNumber(raw.deposit, 0),
    monthlyRent: monthlyRentRaw == null ? null : toNumber(monthlyRentRaw, 0),
    memo: String(raw.memo ?? ""),
    image: typeof raw.image === "string" ? raw.image : fallbackImage,
  };
};

interface SelectProps {
  title: string;
  buttonTitle: string;
  AI?: boolean;
  redirectionURL?: string;
  onHouseSelected?: (propertyId: number) => void;
}

export default function CheckListSelect({
  title,
  buttonTitle,
  redirectionURL,
  AI = false,
  onHouseSelected,
}: SelectProps) {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const propertyTypeMap: { [key: string]: string } = {
    APARTMENT: "아파트",
    VILLA: "빌라",
    OFFICETEL: "오피스텔",
    ONE_ROOM: "원룸",
    OTHER: "기타",
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await API.get("/api/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const rawList = (res.data?.data ?? []) as RawProperty[];
        const normalized = rawList.map(normalizeProperty);
        setProperties(normalized);
      } catch (e) {
        console.error(e);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleSelect = (i: number) =>
    setSelectedIndex(selectedIndex === i ? null : i);

  const handleHouseAdd = () => {
    if (selectedIndex === null) {
      toast.error("선택된 매물이 없습니다.");
      return;
    }

    const selectedProperty = properties[selectedIndex];

    if (AI) {
      // AI 경로는 기존 동작 유지 (selectedProperty까지 필요)
      const navigationState = {
        propertyId: selectedProperty.propertyId,
        selectedProperty,
      };
      localStorage.setItem("aiChecklistProperty", JSON.stringify(navigationState));
      navigate("/ai/createlist", { state: navigationState });
    } else {
      // 분석/기타 경로: propertyId만 전달, 상세는 대상 페이지에서 조회
      const navigationState = {
        propertyId: selectedProperty.propertyId,
      };

      if (onHouseSelected) {
        onHouseSelected(selectedProperty.propertyId);
      }

      navigate(redirectionURL!, { state: navigationState });
    }
  };

  const goSoodongAdd = () => {
    navigate("/checklist/add");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-w-full min-h-screen">
        <p className="text-[18px] text-[#757575]">로딩 중...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen min-w-full px-[237px] pt-[128px] pb-[60px] absolute top-0 left-0 bg-white">
        <div className="flex flex-col items-center w-full">
          {properties.length > 0 && (
            <div className="relative flex items-center justify-center w-[790px] pb-10">
              <h1 className="text-[28px] font-semibold text-black">{title}</h1>
            </div>
          )}

          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full py-40">
              <p className="text-[32px] font-semibold text-black mb-6">
                관심 매물이 없습니다
              </p>
              <p className="flex text-[24px] font-medium text-[#757575] mb-20 text-center">
                지도를 통해 내 주변
                <br />
                나에게 딱 맞는 매물을 찾아보세요!
              </p>
              <button
                onClick={goSoodongAdd}
                className="w-[417px] h-[60px] flex items-center justify-center bg-[#58CCFF] text-white text-[18px] rounded-[5px] font-semibold hover:bg-[#45b8eb] transition-colors"
              >
                찾아보기
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center w-full pb-20">
                {properties.map((item, index) => (
                  <div
                    key={item.propertyId}
                    className={index !== 0 ? "mt-5" : ""}
                  >
                    <C.CheckListAddMenu
                      image={item.image || FALLBACK_IMAGES[0]}
                      name={item.name}
                      region={item.address}
                      info={`${item.floor}층 | ${item.area}평 | ${
                        propertyTypeMap[item.propertyType] || item.propertyType
                      }`}
                      memo={item.memo ?? "메모가 없습니다."}
                      price={
                        item.leaseType === "MONTHLY_RENT"
                          ? `${item.deposit}/${item.monthlyRent}`
                          : `전세 ${item.deposit}`
                      }
                      selected={selectedIndex === index}
                      onClick={() => handleSelect(index)}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleHouseAdd}
                type="button"
                className="w-[417px] h-[60px] flex items-center justify-center bg-[#58CCFF] font-semibold text-[18px] text-white rounded-[5px] hover:bg-[#45b8eb] transition-colors"
              >
                {buttonTitle}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
