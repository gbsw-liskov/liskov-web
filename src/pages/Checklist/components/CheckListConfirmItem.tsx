import { FaCheck, FaExclamation, FaExclamationTriangle } from "react-icons/fa";
import { useState, useEffect } from "react";

interface CheckListConfirmItemProps {
  item: string;
  itemId: number;
  isConfirmed: boolean;
  savedLevel?: 'safe' | 'warning' | 'danger' | null;
  savedMemo?: string;
  onSave?: (itemId: number, level: 'safe' | 'warning' | 'danger' | null, memo: string) => void;
}

export default function CheckListConfirmItem({ 
  item, 
  itemId, 
  isConfirmed, 
  savedLevel, 
  savedMemo,
  onSave 
}: CheckListConfirmItemProps) {
  const [selectedLevel, setSelectedLevel] = useState<'safe' | 'warning' | 'danger' | null>(savedLevel || null);
  const [memo, setMemo] = useState(savedMemo || "");

  useEffect(() => {
    setSelectedLevel(savedLevel || null);
    setMemo(savedMemo || "");
  }, [savedLevel, savedMemo]);

  useEffect(() => {
    if (isConfirmed && onSave) {
      onSave(itemId, selectedLevel, memo);
    }
  }, [isConfirmed]);

  const getLevelColor = () => {
    switch (selectedLevel) {
      case 'safe':
        return 'text-[#58CCFF]';
      case 'warning':
        return 'text-[#FFC107]';
      case 'danger':
        return 'text-[#FF4444]';
      default:
        return 'text-gray-500';
    }
  };

  const getLevelIcon = () => {
    switch (selectedLevel) {
      case 'safe':
        return (
          <div className="w-8 h-8 rounded-full bg-[#58CCFF] flex items-center justify-center">
            <FaCheck size={14} color="white" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 rounded-full bg-[#FFC107] flex items-center justify-center">
            <FaExclamation size={14} color="white" />
          </div>
        );
      case 'danger':
        return (
          <div className="w-8 h-8 rounded-full bg-[#FF4444] flex items-center justify-center">
            <FaExclamationTriangle size={14} color="white" />
          </div>
        );
      default:
        return null;
    }
  };

  if (isConfirmed) {
    return (
      <div className="w-[410px] min-h-[80px]">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-[16px] font-medium text-black flex-1">{item}</h1>
          <div className="ml-3">
            {getLevelIcon()}
          </div>
        </div>
        {memo && (
          <p className={`text-[14px] ${getLevelColor()}`}>
            {memo}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-[410px] min-h-[153px] border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <h1 className="text-[16px] font-medium text-black flex-1">{item}</h1>
        
        <div className="flex gap-2 ml-3">
          <button
            onClick={() => setSelectedLevel(selectedLevel === 'safe' ? null : 'safe')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              selectedLevel === 'safe' 
                ? 'bg-[#58CCFF]' 
                : 'bg-[#58CCFF] opacity-30 hover:opacity-50'
            }`}
          >
            <FaCheck size={14} color="white" />
          </button>
          <button
            onClick={() => setSelectedLevel(selectedLevel === 'warning' ? null : 'warning')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              selectedLevel === 'warning' 
                ? 'bg-[#FFC107]' 
                : 'bg-[#FFC107] opacity-30 hover:opacity-50'
            }`}
          >
            <FaExclamation size={14} color="white" />
          </button>
          <button
            onClick={() => setSelectedLevel(selectedLevel === 'danger' ? null : 'danger')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              selectedLevel === 'danger' 
                ? 'bg-[#FF4444]' 
                : 'bg-[#FF4444] opacity-30 hover:opacity-50'
            }`}
          >
            <FaExclamationTriangle size={14} color="white" />
          </button>
        </div>
      </div>
      
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모"
        className="w-full h-20 px-3 py-2 text-[14px] border border-gray-300 rounded outline-none focus:border-[#58CCFF] transition-colors resize-none"
      />
    </div>
  );
}