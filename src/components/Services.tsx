import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  desc?: string;
  bullets?: string[];
  bg: string;
  paper: string;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  open,
  onClose,
  title,
  desc,
  bullets,
  bg,
  paper
}) => {
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

  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Затемненный фон с анимацией */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Контент модального окна */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-3xl"
      >
        {/* Фоновая картинка */}
        <img
          src={bg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-2xl md:rounded-3xl"
        />

        {/* Бумажная текстура */}
        <img
          src={paper}
          alt=""
          className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light rounded-2xl md:rounded-3xl opacity-50"
        />

        {/* Основной контент */}
        <div className="relative bg-[#1B1B1B]/90 p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl">
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white text-xl md:text-2xl hover:text-orange-500 transition-colors z-10 bg-black/30 rounded-full"
            aria-label="Закрыть"
          >
            &times;
          </button>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Текстовый контент */}
            <div className="flex-1 text-white">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                {title}
              </h3>
              
              {desc && (
                <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm sm:text-base">
                  {desc}
                </p>
              )}

              {bullets && bullets.length > 0 && (
                <ul className="space-y-2 md:space-y-3 mb-6">
                  {bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span className="text-gray-300 text-sm sm:text-base">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Кнопка действия */}
            <div className="lg:self-end flex-shrink-0">
              <button className="w-full lg:w-auto bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 md:px-8 rounded-full font-semibold transition-colors text-sm sm:text-base">
                Заказать услугу
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default ServiceModal;