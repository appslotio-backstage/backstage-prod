type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    desc?: string;
    bullets?: string[];
    bg: string;           // путь к картинке фона
    paper?: string;       // опционально: текстура бумаги
};

export default function ServiceModal({
                                         open,
                                         onClose,
                                         title,
                                         desc,
                                         bullets = [],
                                         bg,
                                         paper = "/paper.png",
                                     }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100]">
            {/* backdrop */}
            <button
                aria-label="close"
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            />
            {/* modal */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[694px] h-[546px] rounded-[30px] border border-[#F06512]/50 overflow-hidden">
                {/* фон */}
                <div className="absolute inset-0">
                    <img src={bg} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30" />
                    {/* опц. бумага */}
                    {paper && (
                        <img
                            src={paper}
                            alt=""
                            className="absolute -left-24 -top-24 h-[694px] w-[546px] rotate-90 mix-blend-multiply opacity-70 pointer-events-none"
                        />
                    )}
                    {/* легкий градиент снизу для читабельности */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#151515]/70" />
                </div>

                {/* контент */}
                <div className="relative h-full p-6">
                    {/* close */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 grid place-items-center size-8 rounded-full hover:bg-white/10"
                        aria-label="Закрыть"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>

                    <h3 className="max-w-[620px] text-[#D4D4D4] font-[600] text-[48px] leading-[1] mt-6">
                        {title}
                    </h3>

                    {desc && (
                        <p className="mt-4 text-[#D4D4D4] text-[20px] leading-[25px] max-w-[540px]">
                            {desc}
                        </p>
                    )}

                    {bullets.length > 0 && (
                        <div className="mt-6">
                            <div className="text-[#D4D4D4] font-[700] text-[20px] leading-[25px] mb-3">
                                Что входит:
                            </div>
                            <ul className="space-y-2 text-[#D4D4D4] text-[16px] leading-[20px] max-w-[540px]">
                                {bullets.map((b, i) => (
                                    <li key={i} className="pl-4 relative">
                                        <span className="absolute left-0 top-2 size-1.5 rounded-full bg-[#D4D4D4]" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-6">
                        <button className="h-[51px] px-[40px] rounded-[30px] bg-[#F06512] text-[#1B1B1B] text-[16px] leading-[20px]">
                            Заказать съемку
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
