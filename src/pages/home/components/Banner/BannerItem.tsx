import { House1, House2, House3 } from '@/assets/index';

interface ItemProps{
  title: string,
  subTitle: string,
  data?: string,
  longshape?: boolean,
  imgNumber: number,
  onclick: () => void,
}

export default function BannerItem(
  { title, subTitle, data, longshape = false, imgNumber, onclick }: ItemProps
){

  return(
    <>
      {!longshape ? 
        <div onClick={onclick} className="flex rounded-[10px] bg-white w-[266px] h-40 pt-7 pl-[22px] pr-4 justify-between cursor-pointer">
          <div>
            <h1 className="text-[16px] text-black font-bold pb-[6px]">{title}</h1>
            <p className="text-xs font-medium text-[#757575] pb-6px]" dangerouslySetInnerHTML={{ __html: subTitle }} />
            {data && <p className="text-[10px] font-medium text-[#757575]" dangerouslySetInnerHTML={{ __html: data }} />}
          </div>
          <div className="flex items-center h-full">
            <img className="w-[62px] h-14" src={imgNumber === 1 ? House1 : House2} alt="집 아이콘" />
          </div>
        </div>
        :
        <div onClick={onclick} className="flex rounded  -[10px] bg-white w-[552px] h-40 pt-8 pl-[18px] pr-[30px] justify-between cursor-pointer">
          <div>
            <h1 className="text-[18px] text-black font-bold pb-[22px]">{title}</h1>
            <p className="text-[14px] font-medium text-[#757575]" dangerouslySetInnerHTML={{ __html: subTitle }} />
          </div>
          <div className="flex items-center h-full">
            <img className="w-[154px] h-22" src={House3} alt="도시 맵 아이콘" />
          </div>
        </div>
        }
    </>
  )
}