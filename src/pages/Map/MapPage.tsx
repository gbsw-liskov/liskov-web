import { useEffect, useRef, useState } from "react";
import { propertyMock, type Property } from "@/mock/propertyMock";
import { PropertySideCard } from './components'

declare global {
  interface Window {
    google: any;
  }
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<Property | null>(null);

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
  }, []);

  const initMap = () => {
    if (!mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 36.3525, lng: 128.6971 },
      zoom: 12,
    });

    propertyMock.forEach((p) => {
      const marker = new window.google.maps.Marker({
        map,
        position: { lat: p.lat, lng: p.lng },
      });

      marker.addListener("click", () => {
        setSelected(p);
      });
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
    </div>
  );
}
