import * as C from "./components";
import * as Image from "@/assets";

type PopularItem =  {
  id: number;
  image: string;
  price: string;
  houseType: string;
  floor: string;
  address: string;
  description: string;
}

const popularItems: PopularItem[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: index + 1,
    image: Image.House,
    price: "월세 120",
    houseType: "원룸",
    floor: "1층 15평",
    address: "의성군 봉양면 화전리 129 파랑채",
    description: "깨끗하게 관리되어 있습니다",
  })
);

type recentItem = {
  id: number;
  image: string;
  houseType: string;
  floor: string;
  address: string;
  price: string;
};

const recentItems: recentItem[] = [
  {
    id: 1,
    image: Image.RecentHome,
    houseType: "원룸",
    floor: "1층 15평",
    address: "의성군 봉양면 화전리 129 파랑채",
    price: "월세 120",
  },
  {
    id: 2,
    image: Image.RecentHome,
    houseType: "투룸",
    floor: "2층 20평",
    address: "의성군 봉양면 화전리 130 파랑채",
    price: "월세 150",
  },
];

export default function Home() {

  const handleItemClick = (id: number) => {
    console.log("매물 클릭:", id);
  };

  const handleDetailClick = (id: number) => {
    console.log("자세히 보기 클릭:", id);
  };

  return (
    <div className="w-full bg-white pb-[55px] overflow-hidden">
      <C.Banner />
      <div className="mt-20 w-[1135px] mx-auto">
        <h1 className="text-black text-[28px] font-semibold">
          🔥지금 가장 인기있는 <span className="text-[#58CCFF]">봉양면 </span>매물
        </h1>
        <div className="w-full h-[680px] grid grid-cols-4 gap-x-[25px] content-between mt-8">
          {popularItems.map((item: PopularItem) => (
            <C.PopularItem
              key={item.id}
              image={item.image}
              price={item.price}
              houseType={item.houseType}
              floor={item.floor}
              address={item.address}
              description={item.description}
              onclick={() => handleItemClick(item.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-20 w-[1135px] mx-auto">
        <h1 className="text-black text-[28px] font-semibold mb-8">
          🔎 최근 가장 많이 찾는 <span className="text-[#58CCFF]">봉양면 </span>매물
        </h1>
        <div className="flex gap-[51px]">
          {recentItems.map((item) => (
            <C.RecentItem
              key={item.id}
              id={item.id}
              image={item.image}
              houseType={item.houseType}
              floor={item.floor}
              address={item.address}
              price={item.price}
              onDetailClick={() => handleDetailClick(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
