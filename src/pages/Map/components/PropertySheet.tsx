import type { Property } from "@/mock/propertyMock";

interface Props {
  property: Property;
  onClose: () => void;
}

export default function PropertySheet({ property, onClose }: Props) {
  return (
    <div className="absolute inset-0 z-20 bg-black/40">
      <div className="absolute bottom-0 w-full p-5 bg-white rounded-t-2xl animate-slideUp">
        {/* 상단 핸들 */}
        <div className="w-12 h-1 mx-auto mb-4 bg-gray-300 rounded-full" />

        {/* 이미지 */}
        <img
          src={property.image}
          alt={property.name}
          className="object-cover w-full h-48 mb-4 rounded-xl"
        />

        {/* 제목 */}
        <h2 className="text-lg font-semibold">{property.name}</h2>
        <p className="mb-3 text-sm text-gray-500">{property.address}</p>

        {/* 가격 */}
        <div className="mb-2 text-xl font-bold">
          {property.type}{" "}
          {property.type === "전세"
            ? `${property.deposit.toLocaleString()}만원`
            : `${property.deposit.toLocaleString()} / ${property.rent}만원`}
        </div>

        {/* 정보 */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-700">
          <div>📐 {property.area}평</div>
          <div>🏢 {property.floor}</div>
          <div className="col-span-2">📈 {property.priceTrend}</div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <a
            href={`tel:${property.phone}`}
            className="flex-1 bg-[#58CCFF] text-white py-3 rounded-xl text-center font-semibold"
          >
            📞 전화 문의
          </a>
          <button
            onClick={onClose}
            className="flex-1 py-3 font-semibold border rounded-xl"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
