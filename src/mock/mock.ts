import { House } from "@/assets";

export interface HouseItem {
  image: string;
  title: string;
  date: string;
}

export interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
  level?: 'safe' | 'warning' | 'danger' | null;
  memo?: string;
}

export interface SavedChecklist {
  id: number;
  houseIndex: string;
  houseName: string;
  image: string;
  date: string;
  items: ChecklistItem[];
  isConfirmed?: boolean;
}

const defaultChecklistItems: ChecklistItem[] = [
  { id: 1, text: "건물 외관 및 균열 상태 확인", checked: false },
  { id: 2, text: "누수 및 곰팡이 흔적 점검", checked: false },
  { id: 3, text: "수압 및 배수 상태 테스트", checked: false },
  { id: 4, text: "전기 배선 및 콘센트 작동 확인", checked: false },
];

export const savedChecklists: SavedChecklist[] = [
  {
    id: 1,
    houseIndex: "1",
    houseName: "의성군 봉양면 화전리 1 파랑채",
    image: House,
    date: "2024-11-10",
    items: [...defaultChecklistItems],
    isConfirmed: false
  },
  {
    id: 2,
    houseIndex: "2",
    houseName: "의성군 봉양면 화전리 2 파랑채",
    image: House,
    date: "2024-11-11",
    items: [...defaultChecklistItems],
    isConfirmed: false
  },
  {
    id: 3,
    houseIndex: "3",
    houseName: "의성군 봉양면 화전리 3 파랑채",
    image: House,
    date: "2024-11-12",
    items: [...defaultChecklistItems],
    isConfirmed: false
  }
];

export const addMockHouses = Array.from({ length: 8 }, (_, i) => ({
  image: House,
  roomType: "투룸",
  region: `의성군 봉양면 화전리 ${i + 1} 파랑채`,
  info: "1층, 15평",
  intro: "깨끗하게 관리 되어 있습니다.",
  price: "월세 1000/60",
}));