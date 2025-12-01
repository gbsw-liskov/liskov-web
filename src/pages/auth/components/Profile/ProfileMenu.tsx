import * as Image from '@/assets'

interface ProfileMenuProps{
  imageNum: number;
  title: string;
}

export default function ProfileMenu({ imageNum, title }: ProfileMenuProps) {
  return(
    <div className="flex w-[161px] h-[126px] justify-center items-center bg-white cursor-pointer rounded-[5px]">
      <div className="flex flex-col w-[65px] h-20 justify-between items-center">
        <img className="w-[40px] h-[45px]" src={imageNum == 1 ? Image.Heart : imageNum == 2 ? Image.ClipBoard : Image.Passed } alt="아이콘" />
        <p className="text-black text-[13px] font-semibold">
          {title}
        </p>
      </div>
    </div>
  )
}