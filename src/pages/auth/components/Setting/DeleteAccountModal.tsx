import { IoClose, IoWarning } from "react-icons/io5";

interface DeleteAccountModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteAccountModal({
  onClose,
  onConfirm,
}: DeleteAccountModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-[400px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-semibold">회원 탈퇴</h2>
          <IoClose
            size={24}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={onClose}
          />
        </div>

        <div className="flex flex-col items-center py-4">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-50">
            <IoWarning size={32} color="#ED5E5E" />
          </div>

          <p className="text-[16px] text-center text-gray-700 mb-2">
            정말로 탈퇴하시겠습니까?
          </p>
          <p className="text-[14px] text-center text-gray-500">
            탈퇴 시 모든 데이터가 삭제되며
            <br />
            복구할 수 없습니다.
          </p>
        </div>

        <div className="flex pt-4 space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 transition border border-gray-300 rounded-md hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-[#ED5E5E] text-white rounded-md hover:bg-[#D54E4E] transition"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
