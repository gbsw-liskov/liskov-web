import { Logo } from '@/assets/index';
import Input from './field/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userid: '',
    password: '',
  });

  const fields = [
    { label: '아이디', name: 'userid', placeholder: '아이디를 입력해주세요', type: 'text' },
    { label: '비밀번호', name: 'password', placeholder: '비밀번호를 입력해주세요', type: 'password' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.userid.trim()) {
      toast.error("아이디를 입력해주세요.");
      return;
    } else if(!form.password.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }
    localStorage.setItem("accessToken", "대충 토큰 내용");
    navigate('/');
    toast.success("로그인에 성공했습니다!");
  };

  return (
    <div className="flex pt-[178px] justify-center min-w-full min-h-screen pb-[149px]">
      <div className="w-[540px] h-[538px]">
        <div className="w-[100px] h-[82px] mx-auto">
          <img className="w-full h-[52px] mx-auto" src={Logo} alt="로고 사진" />
          <div className="flex justify-center mt-2">
            <p className="text-[18px] font-medium text-[#757575]">로그인</p>
          </div>
        </div>

        <div className="w-full h-[411px] mt-[45px] rounded-2xl shadow-[0_0_10px_#F2F2F2] px-[60px] pt-[55px]">
          <form
            onSubmit={handleSubmit}
            className="w-[417px] flex flex-col"
          >
            {fields.map((field) => (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
              />
            ))}
            <button
              type="submit"
              className="mt-[31px] w-[417px] min-h-[47px] bg-[#58CCFF] text-white text-[16px] font-medium rounded-md hover:bg-[#4BB8E5] transition"
            >
              로그인
            </button>
          </form>
          <div className="flex w-full mt-[35px] justify-center">
            <p className="flex text-[14px] font-medium">
              계정이 없으신가요?
              <span
                onClick={() => navigate('/signup')}
                className="pl-[10px] font-bold cursor-pointer text-[#3A98FF]"
              >
                회원가입
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
