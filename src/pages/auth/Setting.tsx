import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoPerson, IoLockClosed } from "react-icons/io5";
import useProfile from "@/hooks/useProfile";
import * as C from "./components";
type ModalType = "name" | "password" | "delete" | null;

export default function Setting() {
  const navigate = useNavigate();
  const { userData, updateUserName, updatePassword, deleteUser } = useProfile();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <div className="flex justify-center min-w-full min-h-screen">
      <div className="w-[850px] min-h-full bg-[#F8FAFB] flex flex-col justify-between">
        <div>
          <div className="w-full h-[60px] flex items-center justify-between px-6 pt-[27px]">
            <IoChevronBack
              size={25}
              className="text-gray-700 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-[18px] font-bold text-black">설정</h1>
            <div className="w-6" />
          </div>

          <div className="flex flex-col items-center px-6 py-8 space-y-4">
            <C.SettingCard
              icon={<IoPerson size={20} />}
              title="이름 변경"
              label="이름"
              value={
                userData
                  ? `${userData.firstName} ${userData.lastName}`
                  : "로딩 중..."
              }
              onEdit={() => setActiveModal("name")}
            />

            <C.SettingCard
              icon={<IoLockClosed size={20} />}
              title="비밀번호 변경"
              label="비밀번호"
              value="*********"
              onEdit={() => setActiveModal("password")}
            />
          </div>
        </div>

        <div className="flex justify-center pt-8 pb-[54px]">
          <button
            onClick={() => setActiveModal("delete")}
            className="text-[#ED5E5E] text-[16px] font-medium"
          >
            회원 탈퇴
          </button>
        </div>
      </div>

      {activeModal === "name" && (
        <C.UpdateNameModal
          currentFirstName={userData?.firstName || ""}
          currentLastName={userData?.lastName || ""}
          onClose={() => setActiveModal(null)}
          onSubmit={updateUserName}
        />
      )}

      {activeModal === "password" && (
        <C.UpdatePasswordModal
          onClose={() => setActiveModal(null)}
          onSubmit={updatePassword}
        />
      )}

      {activeModal === "delete" && (
        <C.DeleteAccountModal
          onClose={() => setActiveModal(null)}
          onConfirm={deleteUser}
        />
      )}
    </div>
  );
}
