import { CiSearch } from "react-icons/ci";
import { IoFilterSharp } from "react-icons/io5";

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  searchInput: string;
  onSearchInputChange: (input: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

export default function FilterSidebar({
  isOpen,
  onToggle,
  selectedFilter,
  onFilterChange,
  searchInput,
  onSearchInputChange,
  onSearch,
  onReset,
}: FilterSidebarProps) {
  const filterOptions = [
    { id: "전체", label: "전체" },
    { id: "아파트", label: "아파트" },
    { id: "원룸투룸", label: "원룸/투룸" },
  ];

  return (
    <>
      {/* 사이드바 */}
      <div
        className={`fixed top-0 right-0 h-screen bg-white shadow-2xl transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "320px" }}
      >
        {/* 사다리꼴 토글 버튼 - 사이드바 왼쪽에 붙음 */}
        <button
          onClick={onToggle}
          className="absolute top-1/2 -left-10 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-100 transition-all"
          style={{
            width: "40px",
            height: "80px",
            clipPath: "polygon(100% 0, 100% 100%, 0 80%, 0 20%)",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
        >
          <IoFilterSharp 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-700" 
            size={20}
          />
        </button>
        <div className="flex flex-col h-full p-6">
          {/* 헤더 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black">필터</h2>
            <p className="text-sm text-gray-500 mt-1">매물을 검색하고 필터링하세요</p>
          </div>

          {/* 검색창 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-black mb-3">
              매물 검색
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => onSearchInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSearch();
                    }
                  }}
                  placeholder="매물 이름으로 검색..."
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
                <CiSearch 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" 
                  size={22}
                />
              </div>
              <button
                onClick={onSearch}
                className="px-4 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                검색
              </button>
            </div>
          </div>

          {/* 필터 옵션 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-black mb-3">
              매물 유형
            </label>
            <div className="space-y-3">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onFilterChange(option.id)}
                  className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all ${
                    selectedFilter === option.id
                      ? "bg-black text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 초기화 버튼 */}
          <button
            onClick={onReset}
            className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            필터 초기화
          </button>
        </div>
      </div>

      {/* 오버레이 (사이드바 열렸을 때 배경 클릭하면 닫힘) */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black bg-opacity-20 z-30 transition-opacity"
        />
      )}
    </>
  );
}

