import * as Image from "@/assets";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState, useRef, useEffect, useCallback } from "react";

export default function SlideMenu() {
  const AUTO_DELAY = 5000;
  const SLIDE_WIDTH = 551;

  const IMAGES = [
    Image.SlideBar1,
    Image.House,
    Image.SlideBar1,
    Image.SlideBar1,
    Image.SlideBar1,
  ];

  const extendedImages = [IMAGES[IMAGES.length - 1], ...IMAGES, IMAGES[0]];

  const [index, setIndex] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setIndex((prev) => prev + 1);
    resetTimer();
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, AUTO_DELAY);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  const handleTransitionEnd = () => {
    const total = IMAGES.length;

    if (index === total + 1) {
      trackRef.current!.style.transition = "none";
      setIndex(1);

      requestAnimationFrame(() => {
        trackRef.current!.style.transition = "transform 0.6s ease";
      });
    }

    if (index === 0) {
      trackRef.current!.style.transition = "none";
      setIndex(total);

      requestAnimationFrame(() => {
        trackRef.current!.style.transition = "transform 0.6s ease";
      });
    }
  };

  type SlideItem = { slideImage: string; title: string };
  
  const slideItems: SlideItem[] = [
    {
      slideImage: Image.SlideBar1,
      title: "NH투자증권, 패밀리오피스 세미나 개최…부동산 이슈 점검",
    },
    {
      slideImage: Image.SlideBar2,
      title: "수익률 낮고 공실률 높아”…전북 부동산 경기 ‘최악’",
    },
    {
      slideImage: Image.SlideBar3,
      title: "최근 부동산 트렌드 ‘공공기여’…지역가치 상승 이끌어",
    },
    {
      slideImage: Image.SlideBar4,
      title: "수도권에 판교급 물량 더…정부 부동산 대책 '산으로 간다'",
    },
    {
      slideImage: Image.SlideBar5,
      title: "부동산 대출 조여 집값 잡기 특단…“서민 내집마련 위축”",
    },
  ];

  const extendedMeta = [slideItems[slideItems.length-1], ...slideItems, slideItems[0]];

  return (
    <div className="w-[551px] h-[343px] overflow-hidden rounded-[5px] relative cursor-pointer">
      <div
        ref={trackRef}
        onTransitionEnd={handleTransitionEnd}
        className="flex h-full"
        style={{
          width: `${extendedImages.length * SLIDE_WIDTH}px`,
          transform: `translateX(-${index * SLIDE_WIDTH}px)`,
          transition: "transform 0.6s ease",
        }}
      >
        {extendedMeta.map((item, i) => (
          <div
            key={`${i}-${item.title}`}
            className="w-[551px] h-[343px] flex-shrink-0 bg-cover bg-center rounded-[5px]"
            style={{
              backgroundImage: `
                linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%),
                 url(${item.slideImage})
              `,
            }}
          >
            <div className="flex flex-col justify-between w-full h-full pl-[22px] pt-4 pb-[26px]">
              <div>
                <h1 className="text-white text-[16px] font-bold">
                  부동산 이슈
                </h1>
                <h1 className="text-white text-[10px] font-medium mt-[5px]">
                  실시간 부동산 제공합니다
                </h1>
              </div>

              <div className="flex items-center justify-between pr-5">
                <h1 className="text-white font-bold text-[17px]">
                  {item.title}
                </h1>

                <MdKeyboardArrowRight
                  onClick={nextSlide}
                  size={30}
                  color="white"
                  className="z-50"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
