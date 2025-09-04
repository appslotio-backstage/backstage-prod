import { useEffect } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    desc?: string;
    bullets?: string[];
};

export default function StyleModal({ open, onClose, title, desc, bullets = [] }: Props) {
    // Блокировка прокрутки фона при открытой модалке
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [open]);

    // Обработка закрытия по клавише Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Затемненный фон */}
            <div 
                onClick={onClose} 
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                aria-hidden="true"
            />
            
            {/* Модальное окно */}
            <div className="relative w-full max-w-[694px] max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-[30px] border border-[#F06512]/50">
                {/* Фон */}
                <img 
                    src="/popupstyles.png" 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/55" />

                {/* Контент */}
                <div className="relative h-full p-5 sm:p-6 md:p-8">
                    {/* Кнопка закрытия */}
                    <button 
                        onClick={onClose} 
                        className="absolute right-4 top-4 grid place-items-center size-8 md:size-10 bg-black/30 rounded-full z-10"
                        aria-label="Закрыть"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path 
                                d="M18 6L6 18M6 6l12 12" 
                                stroke="#D4D4D4" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                            />
                        </svg>
                    </button>

                    {/* Заголовок и контент */}
                    <div className="pt-6 md:pt-8 pb-16 md:pb-20">
                        <h3 className="text-[#D4D4D4] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight">
                            {title}
                        </h3>
                        
                        {desc && (
                            <p className="mt-3 md:mt-4 text-[#D4D4D4] text-base sm:text-lg md:text-[20px] leading-relaxed max-w-[540px]">
                                {desc}
                            </p>
                        )}

                        {bullets.length > 0 && (
                            <div className="mt-5 md:mt-6">
                                <div className="text-[#D4D4D4] font-bold text-lg md:text-[20px] leading-[25px] mb-3">
                                    Что входит:
                                </div>
                                <ul className="space-y-2 md:space-y-3 text-[#D4D4D4] text-sm md:text-[16px] leading-relaxed max-w-[540px]">
                                    {bullets.map((b, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="inline-block mt-2 mr-2 size-1.5 rounded-full bg-[#D4D4D4] flex-shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Кнопка заказа */}
                    <div className="sticky bottom-0 left-0 right-0 py-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center">
                        <button className="h-12 md:h-[51px] px-6 md:px-[40px] rounded-full md:rounded-[30px] bg-[#F06512] text-[#1B1B1B] text-base md:text-[16px] font-medium leading-[20px] hover:bg-[#e05a0c] transition-colors">
                            Заказать съемку
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}