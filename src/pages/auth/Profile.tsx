import useProfile from "@/hooks/useProfile";
import { PROFILE_MENU_ITEMS } from "@/constants/auth";
import * as C from "./components"
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const { userData, logout } = useProfile();
  
  const goToSetting = () => {navigate('/profile/setting');}

  return (
    <div className="min-h-screen w-[836px] pt-20 mx-auto bg-[#F8FAFB] pb-[49px]">
      <div className="w-[515px] mx-auto pt-10">
        <C.ProfileHeader onclick={goToSetting} userData={userData} />
        <C.ProfileMenuSection menuItems={PROFILE_MENU_ITEMS} />
        <C.ProfileInfoSection userData={userData} />
        <div className="mt-[50px] flex justify-center items-center">
          <button
            onClick={logout}
            type="button"
            className="border-none bg-none cursor-pointer text-[#ED5E5E] text-[18px] font-semibold"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
