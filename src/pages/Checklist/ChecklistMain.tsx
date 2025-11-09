import { CheckListMenu, NoData } from "./components/index";
import { useNavigate } from 'react-router-dom';
import { House } from "@/assets";

export default function ChecklistMain() {
  const navigate = useNavigate();
  const mock = Array.from({ length: 8 }, (_, i) => ({
    image: House,
    title: `봉양면 ${i + 1}번 주택`,
    date: "2025-09-16",
  }));

  const addCheckList = () => {
    navigate('/checklist/add');
  }

  return (
    <div className="min-h-screen min-w-full px-[237px] pt-[128px] pb-[60px]">
      {mock ? (
        <div className="flex flex-col items-center w-full">
          <h1 className="pb-10 text-4xl font-semibold text-black">체크리스트</h1>

          <div className="grid grid-cols-4 gap-x-[30px] gap-y-[60px] pb-20">
            {mock.map((item, index) => (
              <CheckListMenu
                key={index}
                image={item.image}
                title={item.title}
                date={item.date}
                onclick={() => alert(`선택된 house는 ${index + 1}`)}
              />
            ))}
          </div>
          <button onClick={() => alert("추가하기")} type="button" className="flex mx-auto w-[417px] py-4 rounded-[5px] justify-center items-center bg-[#58CCFF] font-semibold text-lg text-white">
            추가하기
          </button>
        </div>
      ) : (
        <NoData
          title="체크리스트가 없습니다"
          subTitle={
            <>
              추가 버튼을 눌러<br />
              체크리스트를 추가해보세요!
            </>
          }
          buttonTitle="추가하기"
          onclick={addCheckList}
        />
      )}
    </div>
  );
}
