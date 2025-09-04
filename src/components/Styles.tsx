import { useState, useEffect, useRef } from "react";
import StyleModal from "../components/StyleModal";

type Item = {
    title: string;
    subtitle: string;
    img: string;
    desc: string;
    bullets: string[];
};

const items: Item[] = [
    {
        title: "Love story",
        subtitle: "Романтические кадры для пары",
        img: "/styles/Rectangle 12.png",
        desc: "Описаниеописаниеописаниеописаниеописание",
        bullets: [
            "Текст текст текст текст текст текст текст",
            "Текст текст текст текст текст текст",
            "Текст текст текст текст текст текст текст текст текст",
            "Текст текст текст текст текст текст",
        ],
    },
    {
        title: "Индивидуальная съёмка",
        subtitle: "Ваша уникальность в каждом кадре",
        img: "/styles/Rectangle 15.png",
        desc: "Описаниеописаниеописаниеописаниеописание",
        bullets: [
            "Текст текст текст текст текст текст текст",
            "Текст текст текст текст текст текст",
            "Текст текст текст текст текст текст",
        ],
    },
    {
        title: "Fashion-съёмка",
        subtitle: "Стильные образы и тренды",
        img: "/styles/image.png",
        desc: "Описаниеописаниеописаниеописаниеописание",
        bullets: [
            "Текст текст текст текст текст текст",
            "Текст текст текст текст текст текст",
        ],
    },
    // Добавим еще элементы для демонстрации
    {
        title: "Семейная фотосессия",
        subtitle: "Теплые моменты с близкими",
        img: "/styles/family.png",
        desc: "Описание семейной фотосессии",
        bullets: [
            "Текст текст текст текст текст",
            "Текст текст текст текст текст",
            "Текст текст текст текст текст",
        ],
    },
    {
        title: "Портретная съёмка",
        subtitle: "Подчеркнем вашу индивидуальность",
        img: "/styles/portrait.png",
        desc: "Описание портретной съёмки",
        bullets: [
            "Текст текст текст текст текст",
            "Текст текст текст текст текст",
        ],
    },
];

export default function Styles() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<Item | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
            
            if (sliderRef.current) {
                sliderRef.current.scrollLeft = 0;
                setCurrentIndex(0);
            }
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const openModal = (it: Item) => {
        setActive(it);
        setOpen(true);
    };

    const nextSlide = () => {
        if (isMobile && sliderRef.current) {
            const cardWidth = sliderRef.current.offsetWidth * 0.85;
            const scrollAmount = sliderRef.current.scrollLeft + cardWidth;
            
            sliderRef.current.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            
            setCurrentIndex(prev => Math.min(prev + 1, items.length - 1));
        } else {
            // Для десктопа и планшета переключаем группы карточек
            const cardsToShow = isTablet ? 2 : 3;
            setCurrentIndex(prev => (prev + 1) % Math.ceil(items.length / cardsToShow));
        }
    };

    const prevSlide = () => {
        if (isMobile && sliderRef.current) {
            const cardWidth = sliderRef.current.offsetWidth * 0.85;
            const scrollAmount = sliderRef.current.scrollLeft - cardWidth;
            
            sliderRef.current.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            
            setCurrentIndex(prev => Math.max(prev - 1, 0));
        } else {
            // Для десктопа и планшета переключаем группы карточек
            const cardsToShow = isTablet ? 2 : 3;
            setCurrentIndex(prev => (prev - 1 + Math.ceil(items.length / cardsToShow)) % Math.ceil(items.length / cardsToShow));
        }
    };

    const handleScroll = () => {
        if (isMobile && sliderRef.current) {
            const scrollPos = sliderRef.current.scrollLeft;
            const cardWidth = sliderRef.current.offsetWidth * 0.85;
            const newIndex = Math.round(scrollPos / cardWidth);
            
            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
            }
        }
    };

    // Получаем текущие карточки для отображения на десктопе/планшете
    const getVisibleItems = () => {
        if (isMobile) return items;
        
        const cardsToShow = isTablet ? 2 : 3;
        const startIndex = currentIndex * cardsToShow;
        return items.slice(startIndex, startIndex + cardsToShow);
    };

    return (
        <section className="relative w-full bg-[#1B1B1B] py-10 md:py-20 overflow-hidden">
            <div className="mx-auto max-w-[1420px] px-4 md:px-6">
                <h2 className="text-3xl md:text-[48px] md:leading-[59px] font-semibold text-[#D4D4D4] mb-8 md:mb-12 text-center md:text-left">
                    Выберите свой стиль
                </h2>

                {/* Обертка для слайдера */}
                <div className="relative">
                    {/* Мобильная версия - горизонтальный скролл */}
                    <div 
                        ref={sliderRef}
                        className="flex md:hidden overflow-x-auto pb-4 scrollbar-hide gap-4 snap-x snap-mandatory"
                        onScroll={handleScroll}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {items.map((it, index) => (
                            <div
                                key={it.title}
                                className="flex-shrink-0 w-[85vw] h-[300px] rounded-2xl overflow-hidden snap-always snap-center"
                            >
                                <button
                                    onClick={() => openModal(it)}
                                    className="relative w-full h-full text-left group"
                                >
                                    <img
                                        src={it.img}
                                        alt={it.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1B1B1BCC]" />
                                    <div className="absolute left-4 right-4 bottom-4">
                                        <div className="text-[#D4D4D4] font-bold text-xl">
                                            {it.title}
                                        </div>
                                        <div className="mt-1 text-[#D4D4D4]/90 text-sm">
                                            {it.subtitle}
                                        </div>
                                        <div className="mt-2 inline-flex items-center gap-2 text-[#D4D4D4] text-sm group-hover:gap-3 transition-all">
                                            <span>Подробнее</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="group-hover:translate-x-1 transition-transform">
                                                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Десктопная и планшетная версия - сетка карточек */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {getVisibleItems().map((it) => (
                            <div
                                key={it.title}
                                className="h-[365px] rounded-[30px] overflow-hidden group"
                            >
                                <button
                                    onClick={() => openModal(it)}
                                    className="relative w-full h-full text-left"
                                >
                                    <img
                                        src={it.img}
                                        alt={it.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1B1B1BCC]" />
                                    <div className="absolute left-6 right-6 bottom-6">
                                        <div className="text-[#D4D4D4] font-bold text-[20px] leading-[25px]">
                                            {it.title}
                                        </div>
                                        <div className="mt-1 text-[#D4D4D4]/90 text-[16px] leading-[20px]">
                                            {it.subtitle}
                                        </div>
                                        <div className="mt-3 inline-flex items-center gap-2 text-[#D4D4D4] text-[16px] group-hover:gap-3 transition-all">
                                            <span>Подробнее</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="group-hover:translate-x-1 transition-transform">
                                                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Стрелки навигации */}
                    <div className="mt-6 md:mt-12 flex justify-center gap-8 md:gap-10">
                        <button 
                            aria-label="Предыдущий слайд" 
                            className="size-10 md:size-12 grid place-items-center disabled:opacity-30 transition-opacity hover:opacity-80"
                            onClick={prevSlide}
                            disabled={
                                isMobile 
                                    ? currentIndex === 0 
                                    : currentIndex === 0
                            }
                        >
                            <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
                                <path
                                    d="M14 24L2 13L14 2"
                                    stroke="#D4D4D4"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <button 
                            aria-label="Следующий слайд" 
                            className="size-10 md:size-12 grid place-items-center disabled:opacity-30 transition-opacity hover:opacity-80"
                            onClick={nextSlide}
                            disabled={
                                isMobile 
                                    ? currentIndex === items.length - 1 
                                    : currentIndex === Math.ceil(items.length / (isTablet ? 2 : 3)) - 1
                            }
                        >
                            <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
                                <path
                                    d="M2 24L14 13L2 2"
                                    stroke="#D4D4D4"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Индикаторы прогресса */}
                <div className="flex justify-center mt-4 gap-2">
                    {Array.from(
                        { 
                            length: isMobile 
                                ? items.length 
                                : Math.ceil(items.length / (isTablet ? 2 : 3)) 
                        }
                    ).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (isMobile && sliderRef.current) {
                                    const cardWidth = sliderRef.current.offsetWidth * 0.85;
                                    sliderRef.current.scrollTo({
                                        left: index * cardWidth,
                                        behavior: 'smooth'
                                    });
                                } else {
                                    setCurrentIndex(index);
                                }
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'bg-[#D4D4D4] w-6' : 'bg-[#464646] w-2 hover:bg-[#5a5a5a]'
                            }`}
                            aria-label={`Перейти к слайду ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Бегущая строка */}
                <div className="mt-8 md:mt-16 w-full border-y border-[#464646] overflow-hidden py-3">
                    <div className="marquee-container">
                        <div className="marquee-content flex">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <span
                                    key={i}
                                    className="text-lg md:text-[24px] leading-[28px] uppercase text-[#464646] font-semibold whitespace-nowrap mx-4 md:mx-8"
                                >
                                    BACKSTAGE
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .marquee-container {
                        overflow: hidden;
                        position: relative;
                    }
                    
                    .marquee-content {
                        display: flex;
                        animation: marquee 25s linear infinite;
                        width: max-content;
                    }
                    
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>

                {/* Модальное окно */}
                <StyleModal
                    open={open}
                    onClose={() => setOpen(false)}
                    title={active?.title || ''}
                    desc={active?.desc || ''}
                    bullets={active?.bullets || []}
                />
            </div>
        </section>
    );
}