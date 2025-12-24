import API from "@/api/axios";
import * as C from "./components/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

interface SelectProps {
  title: string;
  buttonTitle: string;
  AI?: boolean;
  redirectionURL?: string;
  onHouseSelected?: (house: any) => void;
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

  const getProperties = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await API.get("/api/properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProperties(res.data.data || []);
    } catch (e) {
      console.error(e);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handleSelect = (i: number) =>
    setSelectedIndex(selectedIndex === i ? null : i);

  const handleHouseAdd = () => {
    if (selectedIndex === null) {
      alert("선택된 매물이 없습니다.");
      return;
    }

    const selectedProperty = properties[selectedIndex];

    const navigationState = {
      propertyId: selectedProperty.propertyId,
      selectedProperty,
    };

    if (onHouseSelected) {
      onHouseSelected(selectedProperty);
    }

    if (AI) {
      localStorage.setItem(
        "aiChecklistProperty",
        JSON.stringify(navigationState)
      );
      navigate("/ai/createlist", { state: navigationState });
    }
    else {
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
                      image={item.image || null}
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
