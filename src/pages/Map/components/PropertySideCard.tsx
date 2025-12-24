import type { Property } from "@/mock/propertyMock";

interface Props {
  property: Property;
  onClose: () => void;
}

export default function PropertySideCard({ property, onClose }: Props) {
  return (
    <div className="absolute top-20 left-6 w-[340px] bg-white rounded-2xl shadow-xl z-20 overflow-hidden">
      <img
        src={property.image}
        alt={property.name}
        className="object-cover w-full h-44"
      />

      <div className="p-4">
        <h2 className="mb-1 text-lg font-semibold">{property.name}</h2>
        <p className="mb-2 text-xs text-gray-500">{property.address}</p>

        <div className="mb-2 text-xl font-bold">
          {property.type === "전세"
            ? `전세 ${property.deposit.toLocaleString()}`
            : `월세 ${property.deposit.toLocaleString()} / ${property.rent}`}
          만원
        </div>

        <div className="mb-3 space-y-1 text-sm text-gray-700">
          <div>📐 {property.area}평</div>
          <div>🏢 {property.floor}</div>
          <div>📈 {property.priceTrend}</div>
        </div>

        <div className="flex gap-2">
          <a
            href={`tel:${property.phone}`}
            className="flex-1 bg-[#58CCFF] text-white py-2 rounded-lg text-center font-medium"
          >
            전화문의
          </a>
          <button
            onClick={onClose}
            className="flex-1 py-2 font-medium border rounded-lg"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
