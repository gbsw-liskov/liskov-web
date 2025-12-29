import { CheckListMenu, NoData } from "./components/index";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CheckListSelect from "./CheckListSelect";
import API from "@/api/axios";
import toast from "react-hot-toast";

interface Checklist {
  name: string;
  checklistId: number;
  propertyId: number;
  createdAt: string;
  image?: string;
}

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

export default function ChecklistMain() {
  const [listSelect, setListSelect] = useState(false);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCheckList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await API.get("/api/checklist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChecklists(res.data.data || []);
    } catch (e) {
      console.error(e);
      toast.error("체크리스트를 불러오지 못했습니다.");
      setChecklists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCheckList();
  }, []);

  const selectCheckList = () => {
    setListSelect((listSelect) => !listSelect);
  };

  const onClickedHouse = (checklistId: number) => {
    localStorage.setItem("currentChecklistId", checklistId.toString());
    navigate("/checklist/confirm");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-w-full min-h-screen">
        <p className="text-[18px] text-[#757575]">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-full px-[237px] pt-[128px] pb-[60px] relative">
      {checklists.length > 0 ? (
        <div className="flex flex-col items-center w-full">
          <h1 className="pb-10 text-4xl font-semibold text-black">
            체크리스트
          </h1>
          <div className="grid grid-cols-4 gap-x-[30px] gap-y-[60px] pb-20">
            {checklists.map((checklist) => (
              <CheckListMenu
                key={checklist.checklistId}
                image={
                  checklist.image ??
                  FALLBACK_IMAGES[checklist.propertyId % FALLBACK_IMAGES.length] ??
                  FALLBACK_IMAGES[0]
                }
                title={checklist.name}
                date={checklist.createdAt.split("T")[0]}
                onclick={() => onClickedHouse(checklist.checklistId)}
              />
            ))}
          </div>
          <button
            onClick={selectCheckList}
            type="button"
            className="flex mx-auto w-[417px] py-4 rounded-[5px] justify-center items-center bg-[#58CCFF] font-semibold text-lg text-white hover:bg-[#45b8eb] transition-colors"
          >
            추가하기
          </button>
        </div>
      ) : (
        <NoData
          title="체크리스트가 없습니다"
          subTitle={
            <>
              추가 버튼을 눌러
              <br />
              체크리스트를 추가해보세요!
            </>
          }
          buttonTitle="추가하기"
          onclick={selectCheckList}
        />
      )}
      {listSelect && (
        <CheckListSelect
          title="체크리스트 추가"
          AI={true}
          buttonTitle="추가하기"
          redirectionURL="/ai/createlist"
        />
      )}
    </div>
  );
}
