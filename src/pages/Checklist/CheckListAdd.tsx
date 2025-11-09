import * as C from './components/index';
import { useNavigate} from 'react-router-dom';
import { House } from "@/assets";

export default function CheckListAdd() {
  const navigate = useNavigate();
  // const mock = null;
  const mock = Array.from({ length: 8 }, (_, i) => ({
    image: House,
    title: `봉양면 ${i + 1}번 주택`,
    date: "2025-09-16",
  }));

  const searchHouse = () => {
    alert("찾아보기 버튼 클릭");
  }
  return (
    <div className="min-h-screen min-w-full px-[237px] pt-[128px] pb-[60px]">
      {mock ? (
        <div className="flex flex-col items-center w-full">
          <h1 className="pb-10 text-[28px] font-semibold text-black">체크리스트 추가</h1>

          <div className="flex flex-col items-center w-full pb-20">
            {mock.map((item, index) => (
              <div
                key={index}
                style={{ marginTop: `${index * 20}px` }}
              >
                <C.CheckListMenu
                  image={item.image}
                  title={item.title}
                  date={item.date}
                  onclick={() => alert(`선택된 house는 ${index + 1}`)}
                />
              </div>
            ))}
          </div>
          <button onClick={() => alert("추가하기")} type="button" className="flex mx-auto w-[417px] py-4 rounded-[5px] justify-center items-center bg-[#58CCFF] font-semibold text-lg text-white">
            추가하기
          </button>
        </div>
      ) : (
        <C.NoData
          title="관심매물이 없습니다"
          subTitle={
            <>
              지도를 통해 내 주변<br />
              나에게 딱 맞는 매물을 찾아보세요!
            </>
          }
          buttonTitle="찾아보기"
          onclick={searchHouse}
        />
      )}
    </div>
  );
}
