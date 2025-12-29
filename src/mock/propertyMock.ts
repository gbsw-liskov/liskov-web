export interface Property {
  id: number;
  name: string;
  address: string;
  type: "전세" | "월세";
  deposit: number;
  rent?: number;
  area: number;
  floor: string;
  priceTrend: string;
  phone: string;
  lat: number;
  lng: number;
  image: string;
}

/* =======================
   의성 지역 클러스터
======================= */
const UISUNG_CLUSTERS = [
  { name: "의성읍", lat: 36.352, lng: 128.697 },
  { name: "안계면", lat: 36.386, lng: 128.719 },
  { name: "봉양면", lat: 36.32, lng: 128.742 },
  { name: "단촌면", lat: 36.307, lng: 128.661 },
  { name: "점곡면", lat: 36.335, lng: 128.678 },
  { name: "다인면", lat: 36.41, lng: 128.65 },
  { name: "비안면", lat: 36.27, lng: 128.735 },
];

/* =======================
   실제 매물 이름 풀
======================= */
const NAME_POOL = [
  "역세권 신축 투룸",
  "채광 좋은 남향 빌라",
  "마당 있는 전원주택",
  "조용한 주택가 원룸",
  "생활권 편리한 투룸",
  "리모델링 단독주택",
  "숲세권 전원형 주택",
  "주차 편한 소형 빌라",
  "전망 좋은 전세 아파트",
  "귀촌 추천 단독주택",
];

/* =======================
   좌표 분산 함수
======================= */
const spread = (base: number, index: number) =>
  base + (Math.random() - 0.5) * (0.02 + (index % 5) * 0.004);

/* =======================
   자동 생성 매물 (14~52)
======================= */
const generatedProperties: Property[] = Array.from(
  { length: 39 },
  (_, i): Property => {
    const cluster = UISUNG_CLUSTERS[i % UISUNG_CLUSTERS.length];
    const isJeonse = i % 2 === 0;

    return {
      id: 14 + i,
      name: `${cluster.name} ${NAME_POOL[i % NAME_POOL.length]}`,
      address: `경북 의성군 ${cluster.name} 일대`,
      type: isJeonse ? ("전세" as const) : ("월세" as const),
      deposit: isJeonse ? 14000 + i * 250 : 1000 + i * 60,
      rent: isJeonse ? undefined : 30 + (i % 15),
      area: 18 + (i % 20),
      floor: `${(i % 5) + 1}층 / 5층`,
      priceTrend: "시세 안정",
      phone: `010-55${i}3-77${i}`,
      lat: spread(cluster.lat, i),
      lng: spread(cluster.lng, i),
      image: `/assets/property/다운로드 (${14 + i}).jpeg`,
    };
  }
);

/* =======================
   고정 매물 (1~13)
======================= */
const fixedProperties: Property[] = [
  {
    id: 1,
    name: "의성읍 햇살 전원주택",
    address: "경북 의성군 의성읍 중앙로 122",
    type: "전세",
    deposit: 17000,
    area: 29,
    floor: "단층",
    priceTrend: "시세 안정",
    phone: "010-2341-5521",
    lat: 36.3523,
    lng: 128.6974,
    image: "/assets/property/다운로드 (1).jpeg",
  },
  {
    id: 2,
    name: "의성역 인근 신축 빌라",
    address: "경북 의성군 의성읍 역전길 15",
    type: "월세",
    deposit: 2000,
    rent: 45,
    area: 18,
    floor: "3층 / 5층",
    priceTrend: "월세 수요 증가",
    phone: "010-7732-1182",
    lat: 36.3541,
    lng: 128.6989,
    image: "/assets/property/다운로드 (2).jpeg",
  },
  {
    id: 3,
    name: "의성천 조망 전세 아파트",
    address: "경북 의성군 의성읍 하리 78",
    type: "전세",
    deposit: 22000,
    area: 32,
    floor: "7층 / 12층",
    priceTrend: "전세가 소폭 상승",
    phone: "010-9983-4412",
    lat: 36.3509,
    lng: 128.6958,
    image: "/assets/property/다운로드 (3).jpeg",
  },
  {
    id: 4,
    name: "의성읍 원룸형 도시형주택",
    address: "경북 의성군 의성읍 후죽리 44",
    type: "월세",
    deposit: 500,
    rent: 35,
    area: 12,
    floor: "2층 / 4층",
    priceTrend: "유지",
    phone: "010-4456-8821",
    lat: 36.3515,
    lng: 128.7021,
    image: "/assets/property/다운로드 (4).jpeg",
  },
  {
    id: 5,
    name: "안계면 신축 전원주택",
    address: "경북 의성군 안계면 용기리 56",
    type: "전세",
    deposit: 19000,
    area: 35,
    floor: "단층",
    priceTrend: "전세가 소폭 상승",
    phone: "010-3341-6621",
    lat: 36.3863,
    lng: 128.7192,
    image: "/assets/property/다운로드 (5).jpeg",
  },
  {
    id: 6,
    name: "봉양면 마당 있는 단독주택",
    address: "경북 의성군 봉양면 화전리 102",
    type: "월세",
    deposit: 3000,
    rent: 50,
    area: 40,
    floor: "단층",
    priceTrend: "시세 안정",
    phone: "010-8832-9982",
    lat: 36.32,
    lng: 128.742,
    image: "/assets/property/다운로드 (6).jpeg",
  },
  {
    id: 7,
    name: "단촌면 조용한 빌라",
    address: "경북 의성군 단촌면 하화리 78",
    type: "전세",
    deposit: 16000,
    area: 25,
    floor: "2층 / 3층",
    priceTrend: "유지",
    phone: "010-5556-1121",
    lat: 36.307,
    lng: 128.661,
    image: "/assets/property/다운로드 (7).jpeg",
  },
  {
    id: 8,
    name: "점곡면 넓은 전원주택",
    address: "경북 의성군 점곡면 사촌리 44",
    type: "월세",
    deposit: 2500,
    rent: 40,
    area: 38,
    floor: "단층",
    priceTrend: "전세가 소폭 하락",
    phone: "010-4446-7721",
    lat: 36.335,
    lng: 128.678,
    image: "/assets/property/다운로드 (8).jpeg",
  },
  {
    id: 9,
    name: "다인면 햇빛 좋은 아파트",
    address: "경북 의성군 다인면 덕미리 120",
    type: "전세",
    deposit: 21000,
    area: 30,
    floor: "5층 / 10층",
    priceTrend: "전세가 소폭 상승",
    phone: "010-9993-4422",
    lat: 36.41,
    lng: 128.65,
    image: "/assets/property/다운로드 (9).jpeg",
  },
  {
    id: 10,
    name: "비안면 신축 투룸",
    address: "경북 의성군 비안면 이두리 88",
    type: "월세",
    deposit: 1500,
    rent: 38,
    area: 20,
    floor: "4층 / 5층",
    priceTrend: "월세 수요 증가",
    phone: "010-7772-1192",
    lat: 36.27,
    lng: 128.735,
    image: "/assets/property/다운로드 (10).jpeg",
  },
  {
    id: 11,
    name: "의성읍 중심가 원룸",
    address: "경북 의성군 의성읍 도동리 25",
    type: "월세",
    deposit: 800,
    rent: 32,
    area: 14,
    floor: "3층 / 4층",
    priceTrend: "유지",
    phone: "010-2221-5531",
    lat: 36.3528,
    lng: 128.6982,
    image: "/assets/property/다운로드 (11).jpeg",
  },
  {
    id: 12,
    name: "안계면 전망 좋은 빌라",
    address: "경북 의성군 안계면 안평리 67",
    type: "전세",
    deposit: 18000,
    area: 28,
    floor: "3층 / 5층",
    priceTrend: "전세가 소폭 상승",
    phone: "010-6661-8821",
    lat: 36.3871,
    lng: 128.7201,
    image: "/assets/property/다운로드 (12).jpeg",
  },
  {
    id: 13,
    name: "봉양면 귀촌형 단독주택",
    address: "경북 의성군 봉양면 도원리 55",
    type: "월세",
    deposit: 4000,
    rent: 55,
    area: 45,
    floor: "단층",
    priceTrend: "시세 안정",
    phone: "010-9992-3312",
    lat: 36.3215,
    lng: 128.7435,
    image: "/assets/property/다운로드 (13).jpeg",
  },
];

export const propertyMock: Property[] = [...fixedProperties, ...generatedProperties];