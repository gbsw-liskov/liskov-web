interface NoDataProps {
  title: string;
  subTitle: React.ReactNode;
  buttonTitle: string;
  onclick: () => void;
}

export default function NoData({title, subTitle, buttonTitle, onclick}: NoDataProps) {
  return(
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-188px)]">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-[32px] text-black pb-[27px]">
          {title}
        </h1>
        <h2 className="font-medium text-[24px] text-[#757575] pb-[80px] text-center leading-snug">
          {subTitle}
        </h2>
        <button onClick={onclick} type="button" className="flex mx-auto w-[417px] py-4 rounded-[5px] justify-center items-center bg-[#58CCFF] font-semibold text-lg text-white">
          {buttonTitle}
        </button>
      </div>
    </div>
  )
}