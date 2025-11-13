import * as M from "@/mock/mock";
import { CheckListMenu, NoData } from "./components/index";
import { useNavigate } from "react-router-dom";

export default function ChecklistMain() {
  const navigate = useNavigate();
  const checklists = M.savedChecklists;

  const addCheckList = () => navigate("/checklist/add");
  
  const onClickedHouse = (checklistId: number) => {
    localStorage.setItem("currentChecklistId", checklistId.toString());
    navigate("/checklist/confirm");
  };

  return (
    <div className="min-h-screen min-w-full px-[237px] pt-[128px] pb-[60px]">
      {checklists.length > 0 ? (
        <div className="flex flex-col items-center w-full">
          <h1 className="pb-10 text-4xl font-semibold text-black">체크리스트</h1>
          <div className="grid grid-cols-4 gap-x-[30px] gap-y-[60px] pb-20">
            {checklists.map((checklist) => (
              <CheckListMenu
                key={checklist.id}
                image={checklist.image}
                title={checklist.houseName}
                date={checklist.date}
                onclick={() => onClickedHouse(checklist.id)}
              />
            ))}
          </div>
          <button
            onClick={addCheckList}
            type="button"
            className="flex mx-auto w-[417px] py-4 rounded-[5px] justify-center items-center bg-[#58CCFF] font-semibold text-lg text-white"
          >
            추가하기
          </button>
        </div>
      ) : (
        <NoData
          title="체크리스트가 없습니다"
          subTitle={
            <>
              추가 버튼을 눌러
              <br />
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