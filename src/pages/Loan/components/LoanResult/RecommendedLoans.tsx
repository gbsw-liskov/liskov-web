import { MdApartment } from "react-icons/md";

interface Loan {
  title: string;
  content: string;
}

interface RecommendedLoansProps {
  loans: Loan[];
}

export default function RecommendedLoans({ loans }: RecommendedLoansProps) {
  return (
    <div className="w-full min-h-[414px] p-[40px] mb-[4px]">
      <div className="w-full mb-[16px]">
        <p className="text-black text-[18px] font-semibold flex">
          <MdApartment color="#58CCFF" size={25} className="mr-[6px]" />
          추천 대출 상품
        </p>
      </div>
      {loans.map((loan, index) => (
        <div
          key={index}
          className={`w-full p-5 min-h-[163px] rounded-[10px] ${
            index === 0 ? "bg-[#F6FBFF] mb-[16px]" : ""
          }`}
        >
          <div className="flex justify-between w-full">
            <p className="text-black text-[16px] font-semibold">{loan.title}</p>
            {index === 0 && (
              <p className="text-[#757575] text-[16px] font-bold">추천</p>
            )}
          </div>
          <div className="mt-[14px]">
            <p className="text-[#757575] text-[13px] font-medium whitespace-pre-line">
              {loan.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
