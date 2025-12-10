import { useState } from "react";
import { IoClose } from "react-icons/io5";
import type { UserNameForm } from "@/types/auth";
import toast from "react-hot-toast";

interface UpdateNameModalProps {
  currentFirstName: string;
  currentLastName: string;
  onClose: () => void;
  onSubmit: (form: UserNameForm) => void;
}

export default function UpdateNameModal({
  currentFirstName,
  currentLastName,
  onClose,
  onSubmit,
}: UpdateNameModalProps) {
  const [form, setForm] = useState<UserNameForm>({
    firstName: currentFirstName,
    lastName: currentLastName,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error("성과 이름을 모두 입력해주세요.");
      return;
    }

    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-[400px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-semibold">이름 변경</h2>
          <IoClose
            size={24}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              성
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="성을 입력해주세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#58CCFF]"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#58CCFF]"
            />
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
              type="submit"
              className="flex-1 px-4 py-2 bg-[#58CCFF] text-white rounded-md hover:bg-[#4BB8E5] transition"
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
