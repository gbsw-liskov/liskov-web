export interface Property {
  id: number;
  name: string;
  address: string;
  type: "전세" | "월세";
  deposit: number; // 보증금 (만원)
  rent?: number; // 월세 (만원)
  area: number; // 평수
  floor: string; // 층수
  priceTrend: string;
  phone: string;
  lat: number;
  lng: number;
  image: string;
}

export const propertyMock: Property[] = [
  {
    id: 1,
    name: "의성읍 햇살 전원주택",
    address: "경북 의성군 의성읍 중앙로 123",
    type: "전세",
    deposit: 18000,
    area: 28,
    floor: "1층",
    priceTrend: "최근 6개월 평균가 유지",
    phone: "010-1234-5678",
    lat: 36.3525,
    lng: 128.6971,
    image: "/assets/property/property_1.png",
  },
  {
    id: 2,
    name: "안계면 신축 빌라",
    address: "경북 의성군 안계면 용기리 45",
    type: "월세",
    deposit: 2000,
    rent: 45,
    area: 18,
    floor: "3층 / 5층",
    priceTrend: "월세 수요 증가",
    phone: "010-9876-4321",
    lat: 36.3832,
    lng: 128.7204,
    image: "/assets/property/property_2.png",
  },
];
