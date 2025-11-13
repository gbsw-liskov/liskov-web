import { useNavigate } from "react-router-dom";
import API from "@/api/axios";
import * as C from "./components/index";
import * as M from "@/mock/mock";
import { useState, useEffect } from "react";

export default function CheckListAdd() {
  const navigate = useNavigate();
  const [properites, setProperties] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
    const getProperties = async () => {
    try {
      const res = await API.get('/api/properties');
      console.log(res);
      setProperties(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProperties();
  },[]);
  const handleSelect = (i: number) => setSelectedIndex(selectedIndex === i ? null : i);

  const handleHouseAdd = () => {
    if (selectedIndex === null) return alert("선택된 매물이 없습니다.");
    
    const houseIndex = selectedIndex + 1;
    localStorage.setItem("HouseIndex", houseIndex.toString());
    navigate("/ai/loading");
  };

  return (
    <div className="min-h-screen min-w-full px-[237px] pt-[128px] pb-[60px]">
      <div className="flex flex-col items-center w-full">
        <h1 className="pb-10 text-[28px] font-semibold text-black">체크리스트 추가</h1>
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
          추가하기
        </button>
      </div>
    </div>
  );
}