import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { propertyMock, type Property } from "@/mock/propertyMock";
import { PropertySideCard } from './components'
import { CiSearch } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";
import { IoChevronForward } from "react-icons/io5";

declare global {
  interface Window {
    google: any;
  }
}

type FilterType = 'all' | 'room' | 'apartment';

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<Property | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlFilter = searchParams.get('filter');
  const urlSearch = searchParams.get('search');
  const urlPropertyId = searchParams.get('propertyId');
  const [activeFilter, setActiveFilter] = useState<FilterType>(
    (urlFilter as FilterType) || 'all'
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (urlFilter) {
      setActiveFilter(urlFilter as FilterType);
    }
  }, [urlFilter]);

  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
      setIsSidebarOpen(true); // 검색어가 있으면 사이드바 자동으로 열기
    }
  }, [urlSearch]);

  // 특정 매물로 이동
  useEffect(() => {
    if (urlPropertyId && mapInstanceRef.current) {
      const propertyId = parseInt(urlPropertyId);
      const property = propertyMock.find(p => p.id === propertyId);
      if (property) {
        setSelected(property);
        // 지도 중심을 해당 매물로 이동
        mapInstanceRef.current.setCenter({ lat: property.lat, lng: property.lng });
        mapInstanceRef.current.setZoom(15);
      }
    }
  }, [urlPropertyId]);

  // 필터에 따라 매물 필터링
  const getFilteredProperties = () => {
    let filtered = propertyMock;

    // 타입 필터
    if (activeFilter === 'room') {
      filtered = filtered.filter(p => 
        p.name.includes('원룸') || p.name.includes('투룸')
      );
    } else if (activeFilter === 'apartment') {
      filtered = filtered.filter(p => 
        p.name.includes('아파트')
      );
    }

    // 검색어 필터
    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      navigate('/map');
    } else {
      navigate(`/map?filter=${filter}`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (window.google) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, [activeFilter, searchQuery]); // filter가 변경될 때마다 지도 재렌더링

  const initMap = () => {
    if (!mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 36.3525, lng: 128.6971 },
      zoom: 12,
    });

    mapInstanceRef.current = map;

    const filteredProperties = getFilteredProperties();

    filteredProperties.forEach((p) => {
      const marker = new window.google.maps.Marker({
        map,
        position: { lat: p.lat, lng: p.lng },
      });

      marker.addListener("click", () => {
        setSelected(p);
      });
    });

    // URL에 propertyId가 있으면 해당 매물로 이동
    if (urlPropertyId) {
      const propertyId = parseInt(urlPropertyId);
      const property = propertyMock.find(p => p.id === propertyId);
      if (property) {
        setSelected(property);
        map.setCenter({ lat: property.lat, lng: property.lng });
        map.setZoom(15);
      }
    }
  };

  const filterButtons: { value: FilterType; label: string; icon: string }[] = [
    { value: 'all', label: '전체 매물', icon: '🏘️' },
    { value: 'room', label: '원룸/투룸', icon: '🏠' },
    { value: 'apartment', label: '아파트', icon: '🏢' },
  ];

  const filteredCount = getFilteredProperties().length;

  return (
    <div className="relative w-full h-screen">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* 사이드바 */}
      <div
        className={`absolute right-0 top-0 h-full bg-white shadow-2xl transition-transform duration-300 z-20 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '380px' }}
      >
        <div className="h-full flex flex-col">
          {/* 헤더 */}
          <div className="bg-white px-6 py-6 border-b border-gray-200">
            <h2 className="text-black text-[22px] font-bold">매물 검색</h2>
            <p className="text-[#757575] text-[13px] mt-1">
              원하는 조건으로 매물을 찾아보세요
            </p>
          </div>

          {/* 검색바 */}
          <div className="px-6 py-5 border-b border-gray-200">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="매물명 또는 주소 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[48px] pl-5 pr-12 rounded-[10px] border border-gray-300 focus:border-gray-500 focus:outline-none text-[15px] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#757575] hover:text-black transition-colors"
              >
                <CiSearch size={24} />
              </button>
            </form>
          </div>

          {/* 필터 옵션 */}
          <div className="px-6 py-5 flex-1 overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-[16px] font-bold text-black mb-3">
                매물 유형
              </h3>
              <div className="space-y-2">
                {filterButtons.map((btn) => (
                  <button
                    key={btn.value}
                    onClick={() => handleFilterChange(btn.value)}
                    className={`
                      w-full px-5 py-4 rounded-[10px] font-semibold text-[15px] transition-all duration-200 flex items-center justify-between border
                      ${
                        activeFilter === btn.value
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-white text-[#757575] border-gray-300 hover:border-gray-500 hover:text-black'
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[20px]">{btn.icon}</span>
                      {btn.label}
                    </span>
                    {activeFilter === btn.value && (
                      <span className="text-[12px] bg-white/20 px-2 py-1 rounded-full">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 결과 개수 */}
            <div className="mt-6 p-4 bg-gray-100 rounded-[10px] border border-gray-300">
              <p className="text-[14px] text-[#757575]">
                검색 결과
              </p>
              <p className="text-[24px] font-bold text-black mt-1">
                {filteredCount}개 매물
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 토글 버튼 (사다리꼴 탭) */}
      <button
        onClick={toggleSidebar}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-black transition-all duration-300 z-30 shadow-lg border border-gray-300 ${
          isSidebarOpen ? '-translate-x-[380px]' : 'translate-x-0'
        }`}
        style={{
          width: '48px',
          height: '100px',
          clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
        }}
      >
        <div className="flex items-center justify-center h-full">
          {isSidebarOpen ? (
            <IoChevronForward size={24} className="mr-1" />
          ) : (
            <HiMenu size={24} className="mr-2" />
          )}
        </div>
      </button>

      {/* 오버레이 */}
      {isSidebarOpen && (
        <div
          className="absolute inset-0 bg-black/20 z-10"
          onClick={toggleSidebar}
        />
      )}
      
      {selected && (
        <PropertySideCard
          property={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
