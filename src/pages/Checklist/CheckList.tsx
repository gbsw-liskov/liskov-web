import { useNavigate } from "react-router-dom";
import { savedChecklists } from "@/mock/mock";
import CheckListConfirmItem from "./components/CheckListConfirmItem";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
  level?: 'safe' | 'warning' | 'danger' | null;
  memo?: string;
}

export default function CheckList() {
  const navigate = useNavigate();
  const checklistId = localStorage.getItem("currentChecklistId");
  
  const [checklist, setChecklist] = useState<{
    id: number;
    houseName: string;
    items: ChecklistItem[];
    isConfirmed: boolean;
  } | null>(null);

  useEffect(() => {
    if (!checklistId) {
      navigate("/checklist");
      return;
    }

    const found = savedChecklists.find(c => c.id === Number(checklistId));
    if (found) {
      setChecklist({
        id: found.id,
        houseName: found.houseName,
        items: found.items,
        isConfirmed: found.isConfirmed || false
      });
    } else {
      navigate("/checklist");
    }
  }, [checklistId, navigate]);

  const handleSaveItem = (itemId: number, level: 'safe' | 'warning' | 'danger' | null, memo: string) => {
    if (!checklist) return;

    const updatedItems = checklist.items.map(item =>
      item.id === itemId ? { ...item, level, memo } : item
    );

    setChecklist({ ...checklist, items: updatedItems });
  };

  const handleConfirm = () => {
    if (!checklist) return;

    const checklistIndex = savedChecklists.findIndex(c => c.id === checklist.id);
    if (checklistIndex !== -1) {
      savedChecklists[checklistIndex].items = checklist.items;
      savedChecklists[checklistIndex].isConfirmed = true;
    }

    setChecklist({ ...checklist, isConfirmed: true });
  };

  const handleBack = () => {
    navigate("/checklist");
  };

  if (!checklist) {
    return (
      <div className="flex items-center justify-center min-w-full min-h-screen">
        <p className="text-lg text-gray-500">로딩 중...</p>
      </div>
    );
  }

  const displayItems = checklist.isConfirmed 
    ? checklist.items.filter(item => item.checked) 
    : checklist.items;

  return (
    <div className="flex pt-[50px] justify-center min-w-full min-h-screen pb-20">
      <div className="w-[882px] min-h-[758px]">
        {checklist.isConfirmed && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-black"
          >
            <IoIosArrowBack size={20} />
          </button>
        )}
        
        <h1 className="flex justify-center font-semibold text-[28px] text-black">
          {checklist.houseName}
        </h1>
        
        <div className="grid grid-cols-2 gap-x-[36px] gap-y-[30px] pt-16">
          {displayItems.map((item) => (
            <CheckListConfirmItem
              key={item.id}
              itemId={item.id}
              item={item.text}
              isConfirmed={checklist.isConfirmed}
              savedLevel={item.level}
              savedMemo={item.memo}
              onSave={handleSaveItem}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-16">
          {!checklist.isConfirmed && (
            <button
              onClick={handleConfirm}
              type="button"
              className="w-[417px] py-4 rounded-[5px] flex justify-center items-center bg-[#58CCFF] font-semibold text-lg text-white hover:bg-[#45b8eb] transition-all"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}