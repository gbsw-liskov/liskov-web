import { Logo, Person } from "@/assets";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = "asdf";
  const isLogined = localStorage.getItem("accessToken");
  
  const menus = [
    { name: "홈", path: "/" },
    { name: "매물 분석", path: "/analyze" },
    { name: "지도", path: "/map" },
    { name: "체크리스트", path: "/checklist" }
  ];

  return (
    <div className=" top-0 z-[1000] box-border flex fixed items-center justify-between w-full h-20 bg-white border-2 border-b border-gray-200 px-[100px]">
      <div className="flex h-10 cursor-pointer w-19" onClick={() => navigate("/")}>
        <img src={Logo} alt="집착 로고" className="w-full h-full" />
      </div>

      <div className="flex justify-between text-[18px] font-medium w-[698px] h-5">
        {menus.map((menu) => (
          <div
            key={menu.name}
            className={`cursor-pointer transition-all duration-200 ${
              location.pathname === menu.path
                ? "text-[#58CCFF]"
                : "text-black"
            }`}
            onClick={() => navigate(menu.path)}
          >
            {menu.name}
          </div>
        ))}
      </div>
      <div className="flex items-center w-auto h-11">
        <div className="flex items-center h-8">

        </div>
        {isLogined ?
          <>
            <img src={Person} alt="사람 아이콘" />
            <p className="pl-3 text-[18px] cursor-pointer">{username}</p>
          </>
        :
          <>
            <p 
              className={`text-[18px] cursor-pointer transition-all duration-200 ${
                location.pathname === '/signin' 
                  ? "text-[#58CCFF]" 
                  : "text-black"
              }`}
              onClick={() => navigate('/signin')}
            >
              로그인
            </p>
          </>
        }
      </div>
    </div>
  );
}