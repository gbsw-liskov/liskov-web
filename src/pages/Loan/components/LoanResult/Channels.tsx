import { CiCircleCheck } from "react-icons/ci";

interface Channel {
  title: string;
  content: string;
}

interface ChannelsProps {
  channels: Channel[];
}

export default function Channels({ channels }: ChannelsProps) {
  return (
    <div className="w-full min-h-[252px] p-[25px] mb-[4px]">
      <div className="w-full">
        <p className="text-black text-[18px] font-semibold flex">
          신청 가능 채널
        </p>
      </div>
      <div className="min-h-[215px] w-full mt-[22px]">
        {channels.map((channel, index) => (
          <div
            key={index}
            className="min-w-full min-h-[63px] p-[12px] flex items-center mb-[13px]"
          >
            <div className="w-[22px] h-[22px] mr-[12px]">
              <CiCircleCheck color="#58CCFF" size={25} />
            </div>
            <div className="min-w-[136px] min-h-[39px]">
              <p className="text-[15px] text-black">{channel.title}</p>
              <p className="text-[13px] text-[#757575]">{channel.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
