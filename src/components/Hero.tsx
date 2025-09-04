import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[90vw] sm:max-w-[350px] mx-auto">
        <div className="relative bg-modal-bg rounded-2xl border border-orange-500 p-4 sm:p-6 md:p-8 pt-10 sm:pt-12 md:pt-16 pb-4 sm:pb-6 md:pb-8 overflow-hidden">
          {/* Фоновое изображение */}
          <div className="absolute inset-0 opacity-50">
            <img
              src="/rew.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute -left-32 -top-4 opacity-50">
            <svg
              width="350"
              height="200"
              viewBox="0 0 350 200"
              fill="none"
              className="transform rotate-90"
            >
              <path
                d="M300 -28C200 20 100 150 150 180C220 220 240 160 180 150C140 145 50 170 0 250"
                stroke="#F06512"
                strokeOpacity="0.5"
                strokeWidth="3"
                strokeDasharray="10 10"
              />
            </svg>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-orange-500 transition-colors z-10"
          >
            <X size={20} strokeWidth={1.5} className="sm:w-6 sm:h-6" />
          </button>

          <div className="relative z-10">
            <h2 className="font-gilroy text-xl sm:text-2xl md:text-[32px] font-semibold text-white leading-none mb-3 sm:mb-4 md:mb-6">
              Свяжитесь с нами
            </h2>

            <p className="font-actay text-sm sm:text-base md:text-xl text-white leading-tight mb-4 sm:mb-6 md:mb-8 max-w-[260px] sm:max-w-[280px]">
              Оставьте свои контакты
              и мы свяжемся с вами
              для уточнения деталей съемки
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Имя"
                  className="w-full px-4 py-3 sm:px-5 sm:py-5 rounded-full border border-gray-400 bg-white/10 backdrop-blur-glass text-white placeholder:text-white/70 font-actay text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Телефон"
                  className="w-full px-4 py-3 sm:px-5 sm:py-5 rounded-full border border-gray-400 bg-white/10 backdrop-blur-glass text-white placeholder:text-white/70 font-actay text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 sm:mt-6 px-6 py-3 sm:px-10 sm:py-5 bg-orange-500 text-white font-actay text-sm sm:text-base font-normal rounded-full hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Заказать съемку
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
    >
      {/* Фон на всю секцию */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          src="/Vector.png"
          alt="Фоновое изображение"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* HEADER внутри hero */}
      <header 
        role="banner" 
        className={`w-full py-3 px-4 sm:px-6 lg:px-8 z-50 fixed transition-all duration-300 ${
          scrolled ? 'bg-black/70 backdrop-blur-sm py-2' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Логотип */}
          <div className="font-inter font-semibold text-base sm:text-lg md:text-xl uppercase text-[#D4D4D4] transition-all hover:text-[#F06512]">
            BACKSTAGE
          </div>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {[
              { label: "Главная", href: "#hero" },
              { label: "Услуги", href: "#services" },
              { label: "Стили", href: "#styles" },
              { label: "Прайс", href: "#pricing" },
              { label: "Портфолио", href: "#portfolio" },
              { label: "Отзывы", href: "#reviews" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative h-[18px] flex items-center justify-center pb-[7px]
                font-actay font-light text-sm lg:text-base text-[#D4D4D4] hover:text-white transition-colors
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px
                after:bg-[#F06512] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Контакты для десктопа */}
          <div className="hidden md:flex flex-col items-end">
            <p className="font-actay font-light text-sm lg:text-base text-[#D4D4D4]">
              +7(000)000-00-00
            </p>
            <button
              onClick={openModal}
              className="font-actay font-light text-sm lg:text-base text-[#F06512] underline hover:no-underline transition-all cursor-pointer"
            >
              Заказать звонок
            </button>
          </div>

          {/* Иконки для мобильной версии */}
          <div className="flex md:hidden items-center space-x-3 sm:space-x-4">
            {/* Иконка телефона */}
            <a href="tel:+70000000000" className="p-1 sm:p-2 hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7">
                <g clipPath="url(#clip0_145_229)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.00565 1.08585C4.37747 0.714584 4.82395 0.426582 5.31549 0.240924C5.80704 0.0552668 6.33243 -0.0238066 6.85684 0.00894436C7.38126 0.0416953 7.89273 0.185523 8.35736 0.430895C8.82198 0.676268 9.22916 1.01758 9.5519 1.43222L13.3663 6.33247C14.0654 7.23135 14.3119 8.40222 14.0356 9.50722L12.8733 14.161C12.8136 14.402 12.8171 14.6544 12.8833 14.8937C12.9496 15.1331 13.0764 15.3513 13.2515 15.5273L18.4726 20.7485C18.6489 20.924 18.8675 21.051 19.1072 21.1173C19.347 21.1835 19.5998 21.1868 19.8411 21.1267L24.4928 19.9643C25.0381 19.8288 25.6071 19.8186 26.157 19.9345C26.7069 20.0505 27.2233 20.2895 27.6675 20.6337L32.5678 24.446C34.3294 25.8166 34.4909 28.4197 32.9142 29.9943L30.7169 32.1916C29.1444 33.7641 26.7941 34.4547 24.6033 33.6833C18.9947 31.7126 13.9029 28.5021 9.70702 24.2908C5.49607 20.0956 2.28557 15.0045 0.314524 9.39672C-0.454726 7.20797 0.235899 4.8556 1.8084 3.2831L4.00565 1.08585Z" fill="#D4D4D4"/>
                </g>
                <defs>
                  <clipPath id="clip0_145_229">
                    <rect width="34" height="34" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </a>

            {/* Кнопка бургер-меню */}
            <button 
              onClick={toggleMenu}
              className="p-1 sm:p-2 hover:scale-110 transition-transform focus:outline-none"
              aria-label="Меню"
            >
              <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-9 sm:h-9">
                <path d="M8.00001 36C7.43334 36 6.95867 35.808 6.57601 35.424C6.19334 35.04 6.00134 34.5653 6.00001 34C5.99867 33.4347 6.19067 32.96 6.57601 32.576C6.96134 32.192 7.43601 32 8.00001 32H40C40.5667 32 41.042 32.192 41.426 32.576C41.81 32.96 42.0013 33.4347 42 34C41.9987 34.5653 41.8067 35.0407 41.424 35.426C41.0413 35.8113 40.5667 36.0027 40 36H8.00001ZM8.00001 26C7.43334 26 6.95867 25.808 6.57601 25.424C6.19334 25.04 6.00134 24.5653 6.00001 24C5.99867 23.4347 6.19067 22.96 6.57601 22.576C6.96134 22.192 7.43601 22 8.00001 22H40C40.5667 22 41.042 22.192 41.426 22.576C41.81 22.96 42.0013 23.4347 42 24C41.9987 24.5653 41.8067 25.0407 41.424 25.426C41.0413 25.8113 40.5667 26.0027 40 26H8.00001ZM8.00001 16C7.43334 16 6.95867 15.808 6.57601 15.424C6.19334 15.04 6.00134 14.5653 6.00001 14C5.99867 13.4347 6.19067 12.96 6.57601 12.576C6.96134 12.192 7.43601 12 8.00001 12H40C40.5667 12 41.042 12.192 41.426 12.576C41.81 12.96 42.0013 13.4347 42 14C41.9987 14.5653 41.8067 15.0407 41.424 15.426C41.0413 15.8113 40.5667 16.0027 40 16H8.00001Z" fill="#D4D4D4"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Мобильное меню (выпадающее) */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="py-3 px-2 bg-black/80 backdrop-blur-md rounded-lg mt-2">
            <div className="flex flex-col space-y-3">
              {[
                { label: "Главная", href: "#hero" },
                { label: "Услуги", href: "#services" },
                { label: "Стили", href: "#styles" },
                { label: "Прайс", href: "#pricing" },
                { label: "Портфолио", href: "#portfolio" },
                { label: "Отзывы", href: "#reviews" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-actay font-light text-sm sm:text-base text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-[#F06512] transition-all duration-300 flex items-center"
                >
                  <span className="ml-2">{item.label}</span>
                </a>
              ))}
              <div className="pt-3 border-t border-gray-700">
                <p className="font-actay font-light text-sm sm:text-base text-white px-3 sm:px-4 py-2">
                  +7(000)000-00-00
                </p>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openModal();
                  }}
                  className="font-actay font-light text-sm sm:text-base text-[#F06512] px-3 sm:px-4 py-2 block hover:underline cursor-pointer w-full text-left"
                >
                  Заказать звонок
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Основной контент hero */}
      <div className="flex-grow relative flex items-center justify-center w-full pt-20 pb-24 md:pb-48 lg:pb-64">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          {/* Заголовок с анимацией */}
          <h1
            className="text-center font-display font-extrabold uppercase
            text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[148px]
            leading-tight sm:leading-snug md:leading-normal lg:leading-[1.2] xl:leading-[187px]
            text-[#F06512] max-w-full px-2 animate-fade-in-down"
          >
            BACKSTAGE
          </h1>

          {/* Подзаголовок с задержкой анимации */}
          <p
            className="mt-3 md:mt-6 text-center font-actay 
            text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
            leading-relaxed sm:leading-relaxed md:leading-normal
            text-[#8F8F8F] max-w-full md:max-w-4xl px-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Организация съёмок «под ключ»
          </p>

          {/* Кнопка с анимацией и hover-эффектом */}
          <button
            onClick={openModal}
            className="mt-6 md:mt-12 px-6 py-2 md:px-10 md:py-4
            rounded-[30px] bg-[#F06512] hover:bg-[#ff7b2d] transition-all duration-300
            flex items-center justify-center font-display text-sm md:text-lg text-[#1B1B1B] tracking-wide
            transform hover:scale-105 animate-fade-in-up shadow-lg hover:shadow-xl cursor-pointer"
            style={{ animationDelay: '0.6s' }}
          >
            Заказать съёмку
          </button>
        </div>
      </div>

      {/* Рваный край - теперь точно в самом низу секции */}
      <div className="mt-auto">
        <div className="pointer-events-none select-none w-full h-20 md:h-40 lg:h-56 xl:h-64 overflow-hidden z-20 relative">
          <img
            src="/Torn-Paper-Edge-03.png"
            alt="Декоративный рваный край"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Модальное окно */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Стили для анимаций */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}