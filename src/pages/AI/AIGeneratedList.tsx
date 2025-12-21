import * as C from "./components";
import { AILoading } from "@/components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/axios";
import toast from "react-hot-toast";

interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
}

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

export default function AIGeneratedList() {
  const navigate = useNavigate();
  const [aiLoading, setAiLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [checklists, setChecklists] = useState<ChecklistItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemText, setNewItemText] = useState("");

  useEffect(() => {
    const loadPropertyAndGenerateChecklist = async () => {
      const propertyData = localStorage.getItem("SelectedHouseData");
      if (propertyData) {
        const property = JSON.parse(propertyData);
        setSelectedProperty(property);
        await generateAIChecklist(property.propertyId);
      } else {
        setAiLoading(false);
      }
    };

    loadPropertyAndGenerateChecklist();
  }, []);

  const generateAIChecklist = async (propertyId: number) => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await API.post(
        "/api/checklist/generate",
        { propertyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);

      const contents = res.data.data.contents || [];
      const aiGeneratedItems = contents.map(
        (content: string, index: number) => ({
          id: index + 1,
          text: content,
          checked: false,
        })
      );

      setChecklists(aiGeneratedItems);
    } catch (e) {
      console.error(e);
      setChecklists([
        { id: 1, text: "건물 외관 및 균열 상태 확인", checked: false },
        { id: 2, text: "누수 및 곰팡이 흔적 점검", checked: false },
        { id: 3, text: "수압 및 배수 상태 테스트", checked: false },
        { id: 4, text: "전기 배선 및 콘센트 작동 확인", checked: false },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const toggleCheck = (id: number) => {
    setChecklists((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddSubmit = () => {
    if (newItemText.trim()) {
      setChecklists((prev) => [
        ...prev,
        { id: Date.now(), text: newItemText.trim(), checked: false },
      ]);
      setNewItemText("");
    }
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewItemText("");
  };

  const handleConfirm = async () => {
    const checkedItems = checklists.filter((item) => item.checked);

    if (checkedItems.length === 0) {
      alert("최소 1개 이상의 체크리스트를 선택해주세요.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    try {
      console.log({
        propertyId: selectedProperty?.propertyId,
        items: checkedItems.map((item) => ({
          content: item.text,
          severity: "NONE",
        })),
      });
      const res = await API.post(
        "/api/checklist",
        {
          propertyId: selectedProperty?.propertyId,
          items: checkedItems.map((item) => ({
            content: item.text,
            severity: "NONE",
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("체크리스트를 저장했습니다.");
      console.log("체크리스트를 저장했습니다", res.data);
      navigate("/checklist");
    } catch (error) {
      console.error("체크리스트 저장을 실패했습니다", error);
      alert("체크리스트 생성에 실패했습니다.");
    }
  };

  if (aiLoading) {
    return <AILoading title="체크리스트" />;
  }

  return (
    <div className="flex pt-[50px] justify-center min-w-full min-h-screen">
      <div className="w-[882px] min-h-[758px]">
        <h1 className="flex justify-center font-semibold text-[28px] text-black">
          {selectedProperty?.name || "매물 정보"}
        </h1>

        <div className="grid grid-cols-2 gap-x-[36px] gap-y-[30px] pt-16">
          {checklists.map((item) => (
            <div key={item.id} className="flex items-start h-7">
              <C.CheckListItem
                check={item.checked}
                item={item.text}
                onClick={() => toggleCheck(item.id)}
              />
            </div>
          ))}

          {isAdding ? (
            <div className="flex items-center gap-3 h-7">
              <div className="border-[1px] border-[#757575] min-w-6 min-h-6 bg-white rounded-lg" />
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="체크리스트 내용을 입력하세요"
                className="w-full text-[18px] font-medium outline-none"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddSubmit();
                  if (e.key === "Escape") handleCancel();
                }}
                onBlur={handleCancel}
              />
            </div>
          ) : (
            <div className="h-7">
              <C.AddCheckListItem onClick={handleAddClick} />
            </div>
          )}
        </div>

        <button
          onClick={handleConfirm}
          type="button"
          className="flex mx-auto mt-16 w-[417px] py-4 rounded-[5px] justify-center items-center bg-[#58CCFF] font-semibold text-lg text-white hover:bg-[#45b8eb] transition-all"
        >
          확인
        </button>
      </div>
    </div>
  );
}
