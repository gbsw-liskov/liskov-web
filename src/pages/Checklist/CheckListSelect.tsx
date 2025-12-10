import API from "@/api/axios";
import * as C from "./components/index";
import AILoading from "@/components/AILoading";
import * as M from "@/mock/mock";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SelectProps {
  title: string;
  sooDong?: boolean;
  buttonTitle: string;
  AI?: boolean;
  redirectionURL: string;
  onHouseSelected?: (house: any) => void;
}

export default function CheckListSelect({
  title,
  sooDong = false,
  buttonTitle,
  redirectionURL,
  AI = false,
  onHouseSelected,
}: SelectProps) {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getProperties = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await API.get("/api/properties",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res);
      setProperties(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handleSelect = (i: number) =>
    setSelectedIndex(selectedIndex === i ? null : i);

  const handleHouseAdd = () => {
    if (selectedIndex === null) return alert("선택된 매물이 없습니다.");

    const houseIndex = selectedIndex + 1;

    if (AI) {
      localStorage.setItem("HouseIndex", houseIndex.toString());
      setAiLoading(true);
    } else {
      const selectedHouse = M.addMockHouses[selectedIndex];
      localStorage.setItem("HouseIndex", houseIndex.toString());
      localStorage.setItem("SelectedHouseData", JSON.stringify(selectedHouse));

      if (onHouseSelected) {
        onHouseSelected(selectedHouse);
      }
    }
  };

  const handleLoadingComplete = () => {
    setAiLoading(false);
    navigate("/ai/createlist");
  };

  const goSoodongAdd = () => {
    navigate(`${redirectionURL}`);
  };

  return (
    <>
      <div className="min-h-screen min-w-full px-[237px] pt-[128px] pb-[60px] absolute top-0 left-0 bg-white">
        <div className="flex flex-col items-center w-full">
          <div className="relative flex items-center justify-center w-[790px] pb-10">
            <h1 className="text-[28px] font-semibold text-black">{title}</h1>
            {sooDong && (
              <p
                onClick={goSoodongAdd}
                className="absolute right-0 text-black text-[20px] font-medium cursor-pointer"
              >
                수동추가
              </p>
            )}
          </div>
          <div className="flex flex-col items-center w-full pb-20">
            {M.addMockHouses.map((item, index) => (
              <div key={index} className={index !== 0 ? "mt-5" : ""}>
                <C.CheckListAddMenu
                  image={item.image}
                  roomType={item.roomType!}
                  region={item.region!}
                  info={item.info!}
                  intro={item.intro!}
                  price={item.price!}
                  selected={selectedIndex === index}
                  onClick={() => handleSelect(index)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleHouseAdd}
            type="button"
            className="flex mx-auto w-[417px] py-4 rounded-[5px] justify-center items-center bg-[#58CCFF] font-semibold text-lg text-white"
          >
            {buttonTitle}
          </button>
        </div>
      </div>
      {aiLoading && <AILoading onComplete={handleLoadingComplete} />}
    </>
  );
}
