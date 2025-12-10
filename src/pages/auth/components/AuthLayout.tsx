import { Logo } from "@/assets";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  height?: string;
}

export default function AuthLayout({
  title,
  children,
  height = "h-[538px]",
}: AuthLayoutProps) {
  return (
    <div className="flex pt-[178px] justify-center min-w-full min-h-screen pb-[149px]">
      <div className={`w-[540px] ${height}`}>
        <div className="w-[100px] h-[82px] mx-auto">
          <img className="w-full h-[52px] mx-auto" src={Logo} alt="로고 사진" />
          <div className="flex justify-center mt-2">
            <p className="text-[18px] font-medium text-[#757575]">{title}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
