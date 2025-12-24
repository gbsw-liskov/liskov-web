import { useNavigate } from "react-router-dom";
import * as C from "./components";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import API from "@/api/axios";
import toast from "react-hot-toast";

interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
  level?: "NORMAL" | "WARNING" | "DANGER" | null;
  memo?: string;
}

interface ChecklistState {
  id: number;
  name: string;
  items: ChecklistItem[];
  isConfirmed: boolean;
}

export default function CheckList() {
  const navigate = useNavigate();
  const checklistId = localStorage.getItem("currentChecklistId");

  const [checklist, setChecklist] = useState<ChecklistState | null>(null);

  useEffect(() => {
    if (!checklistId) {
      navigate("/checklist");
      return;
    }
    getCheckListItem();
  }, [checklistId]);

  const getCheckListItem = async () => {
    const token = localStorage.getItem("accessToken");

    const res = await API.get(`/api/checklist/${checklistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = res.data.data;
    const savedKey = `checklist_saved_${checklistId}`;
    const isSaved = localStorage.getItem(savedKey) === "true";

    setChecklist({
      id: data.checklistId,
      name: `${data.name} 체크리스트`,
      isConfirmed: isSaved,
      items: data.items.map((item: any) => ({
        id: item.itemId,
        text: item.content,
        checked: item.severity !== "NONE",
        level:
          item.severity === "NORMAL"
            ? "NORMAL"
            : item.severity === "WARNING"
            ? "WARNING"
            : item.severity === "DANGER"
            ? "DANGER"
            : null,
        memo: item.memo || "",
      })),
    });
  };

  const handleSaveItem = (
    itemId: number,
    level: "NORMAL" | "WARNING" | "DANGER" | null,
    memo: string
  ) => {
    if (!checklist) return;

    setChecklist({
      ...checklist,
      items: checklist.items.map((item) =>
        item.id === itemId ? { ...item, level, memo } : item
      ),
    });
  };

  const handlePreviewConfirm = () => {
    if (!checklist) return;
    setChecklist({ ...checklist, isConfirmed: true });
  };

  const handleEdit = () => {
    if (!checklist) return;
    setChecklist({ ...checklist, isConfirmed: false });
  };

  const handleFinalConfirm = async () => {
    if (!checklist) return;
    const token = localStorage.getItem("accessToken");

    const payload = checklist.items.map((item) => ({
      itemId: item.id,
      memo: item.memo || "",
      severity:
        item.level === "NORMAL"
          ? "NORMAL"
          : item.level === "WARNING"
          ? "WARNING"
          : item.level === "DANGER"
          ? "DANGER"
          : "NONE",
    }));

    try {
      await API.put(`/api/checklist/${checklist.id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const savedKey = `checklist_saved_${checklistId}`;
      localStorage.setItem(savedKey, "true");

      navigate('/checklist');
      toast.success("체크리스트를 저장하였습니다.");

      setChecklist({ ...checklist, isConfirmed: true });
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.message || "체크리스트 저장에 실패했습니다.";
      toast.error(errorMessage);
    }
  };

  if (!checklist) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  const savedKey = `checklist_saved_${checklistId}`;
  const isSaved = localStorage.getItem(savedKey) === "true";

  return (
    <div className="flex pt-[50px] justify-center min-h-screen pb-20">
      <div className="w-[882px]">
        {checklist.isConfirmed && (
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/checklist")}
              className="flex items-center gap-2 text-gray-600 hover:text-black"
            >
              <IoIosArrowBack size={20} />
            </button>

            <button
              onClick={handleEdit}
              className="text-sm text-gray-500 hover:text-black"
            >
              수정
            </button>
          </div>
        )}

        <h1 className="text-center text-[28px] font-semibold">
          {checklist.name}
        </h1>

        <div className="grid grid-cols-2 gap-x-[36px] gap-y-[30px] pt-16">
          {checklist.items.map((item) => (
            <C.CheckListConfirmItem
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

        <div className="flex justify-center mt-16">
          {!checklist.isConfirmed ? (
            <button
              onClick={handlePreviewConfirm}
              className="w-[417px] py-4 bg-[#58CCFF] text-white rounded"
            >
              확인
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={handleFinalConfirm}
                className="w-[417px] py-4 bg-[#58CCFF] text-white rounded"
              >
                저장
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
