import { useState } from "react";
import { IoClose } from "react-icons/io5";
import type { PasswordForm } from "@/types/auth";
import toast from "react-hot-toast";

interface UpdatePasswordModalProps {
  onClose: () => void;
  onSubmit: (form: PasswordForm) => void;
}

export default function UpdatePasswordModal({
  onClose,
  onSubmit,
}: UpdatePasswordModalProps) {
  const [form, setForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.currentPassword.trim() || !form.newPassword.trim()) {
      toast.error("모든 필드를 입력해주세요.");
      return;
    }

    if (form.currentPassword === form.newPassword) {
      toast.error("현재 비밀번호와 새 비밀번호가 같습니다.");
      return;
    }

    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-[400px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-semibold">비밀번호 변경</h2>
          <IoClose
            size={24}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              현재 비밀번호
            </label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="현재 비밀번호를 입력해주세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#58CCFF]"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              새 비밀번호
            </label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="새 비밀번호를 입력해주세요"
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
