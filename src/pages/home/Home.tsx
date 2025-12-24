import * as C from "./components";
import { useNavigate } from "react-router-dom";
import { propertyMock, type Property } from "@/mock/propertyMock";

export default function Home() {
  const navigate = useNavigate();

  // 인기 매물 8개 (임의로 선택)
  const popularItems = propertyMock.slice(0, 8) as Property[];

  // 최근 매물 2개 (임의로 선택)
  const recentItems = propertyMock.slice(19, 21) as Property[];

  const handleItemClick = (propertyId: number) => {
    navigate(`/map?propertyId=${propertyId}`);
  };

  const handleDetailClick = (propertyId: number) => {
    navigate(`/map?propertyId=${propertyId}`);
  };

  // 매물 타입에 따른 텍스트 추출 (원룸, 투룸, 아파트 등)
  const getPropertyType = (name: string): string => {
    if (name.includes('원룸')) return '원룸';
    if (name.includes('투룸')) return '투룸';
    if (name.includes('아파트')) return '아파트';
    if (name.includes('빌라')) return '빌라';
    if (name.includes('주택')) return '주택';
    return '매물';
  };

  // 가격 정보 포맷팅
  const formatPrice = (property: Property): string => {
    if (property.type === '월세') {
      return `월세 ${property.deposit}/${property.rent}`;
    } else {
      return `전세 ${property.deposit.toLocaleString()}만`;
    }
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      <C.Banner />
      <div className="mt-20 w-[1135px] mx-auto">
        <h1 className="text-black text-[28px] font-semibold">
          🔥지금 가장 인기있는 <span className="text-[#58CCFF]">의성군 </span>매물
        </h1>
        <div className="w-full h-[680px] grid grid-cols-4 gap-x-[25px] content-between mt-8">
          {popularItems.map((item: Property) => (
            <C.PopularItem
              key={item.id}
              image={item.image}
              price={formatPrice(item)}
              houseType={getPropertyType(item.name)}
              floor={`${item.floor} ${item.area}평`}
              address={item.address}
              description={item.priceTrend}
              onclick={() => handleItemClick(item.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-20 w-[1135px] mx-auto">
        <h1 className="text-black text-[28px] font-semibold mb-8">
          🔎 최근 가장 많이 찾는 <span className="text-[#58CCFF]">의성군 </span>매물
        </h1>
        <div className="flex gap-[51px] pb-[55px]">
          {recentItems.map((item) => (
            <C.RecentItem
              key={item.id}
              id={item.id}
              image={item.image}
              houseType={getPropertyType(item.name)}
              floor={`${item.floor} ${item.area}평`}
              address={item.address}
              price={formatPrice(item)}
              onDetailClick={() => handleDetailClick(item.id)}
            />
          ))}
        </div>
      </div>
      <C.AddButton />
    </div>
  );
}
