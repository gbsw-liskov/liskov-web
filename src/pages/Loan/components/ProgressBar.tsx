interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#757575] text-[14px]">
          {currentStep} / {totalSteps} 단계
        </span>
        <span className="text-[#757575] text-[14px]">{percentage}%</span>
      </div>
      <div className="w-full bg-[#E5E5E5] h-[8px] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#58CCFF] transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
