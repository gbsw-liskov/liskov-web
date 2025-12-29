import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { propertyMock, type Property } from "@/mock/propertyMock";
import { PropertySideCard, FilterSidebar } from './components'

declare global {
  interface Window {
    google: any;
  }
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<Property | null>(null);
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get("type");
  const propertyIdParam = searchParams.get("propertyId");
  const propertyIdNumber =
    propertyIdParam && !Number.isNaN(Number(propertyIdParam))
      ? Number(propertyIdParam)
      : null;
  
  // 필터 사이드바 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");
  const [searchInput, setSearchInput] = useState(""); // 입력 중인 검색어
  const [searchTerm, setSearchTerm] = useState(""); // 실제 적용된 검색어

  // URL 파라미터에서 초기 필터 설정
  useEffect(() => {
    if (filterType === "원룸투룸") {
      setSelectedFilter("원룸투룸");
    } else if (filterType === "아파트") {
      setSelectedFilter("아파트");
    } else {
      setSelectedFilter("전체");
    }
  }, [filterType]);

  // 필터 초기화 함수
  const handleReset = () => {
    setSelectedFilter("전체");
    setSearchInput("");
    setSearchTerm("");
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
  }, [selectedFilter, searchTerm]);

  // 필터링 로직: 필터 타입과 검색어에 따라 매물 필터링
  const getFilteredProperties = () => {
    // propertyId가 있을 때는 모든 핑을 보여주고 선택만 해당 매물로 맞춥니다.
    let filtered = propertyMock;
    
    // 필터 타입 적용
    if (selectedFilter === "원룸투룸") {
      filtered = filtered.filter(p => 
        p.name.includes("원룸") || p.name.includes("투룸")
      );
    } else if (selectedFilter === "아파트") {
      filtered = filtered.filter(p => 
        p.name.includes("아파트")
      );
    }
    
    // 검색어 적용
    if (searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const initMap = () => {
    if (!mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 36.3525, lng: 128.6971 },
      zoom: 12,
    });

    const filteredProperties = getFilteredProperties();

    filteredProperties.forEach((p) => {
      const marker = new window.google.maps.Marker({
        map,
        position: { lat: p.lat, lng: p.lng },
      });

      marker.addListener("click", () => {
        setSelected(p);
      });

      // URL로 전달된 propertyId가 있으면 해당 매물에 포커스
      if (propertyIdNumber !== null && p.id === propertyIdNumber) {
        setSelected(p);
        map.setCenter({ lat: p.lat, lng: p.lng });
        map.setZoom(15);
      }
    });
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={mapRef} className="w-full h-full" />
      {selected && (
        <PropertySideCard
          property={selected}
          onClose={() => setSelected(null)}
        />
      )}
      <FilterSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearch={() => setSearchTerm(searchInput)}
        onReset={handleReset}
      />
    </div>
  );
}
