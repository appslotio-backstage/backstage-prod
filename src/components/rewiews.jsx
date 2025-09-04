import React, { useState, useEffect, useRef } from 'react';
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
      
      <div className="relative w-full max-w-[350px] mx-auto">
        <div className="relative bg-modal-bg rounded-2xl border border-orange-500 p-6 md:p-8 pt-12 md:pt-16 pb-6 md:pb-8 overflow-hidden">
          {/* Фоновое изображение */}
          <div className="absolute inset-0 opacity-50">
            <img
              src="/rew.png" // Путь к вашему изображению
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
            className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors z-10"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          <div className="relative z-10">
            <h2 className="font-gilroy text-2xl md:text-[32px] font-semibold text-white leading-none mb-4 md:mb-6">
              Свяжитесь с нами
            </h2>

            <p className="font-actay text-lg md:text-xl text-white leading-tight mb-6 md:mb-8 max-w-[280px]">
              Оставьте свои контакты
              и мы свяжемся с вами
              для уточнения деталей съемки
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Имя"
                  className="w-full px-5 py-5 rounded-full border border-gray-400 bg-white/10 backdrop-blur-glass text-white placeholder:text-white/70 font-actay text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Телефон"
                  className="w-full px-5 py-5 rounded-full border border-gray-400 bg-white/10 backdrop-blur-glass text-white placeholder:text-white/70 font-actay text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 px-10 py-5 bg-orange-500 text-white font-actay text-base font-normal rounded-full hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
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

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  
  const reviews = [
    {
      id: 1,
      name: "Ирина Апостолова",
      text: "Анна, благодарю Вас за волшебную фотосессию! Это было чудесно, много эмоций и улыбок…. Ощущение совершенного состояния души и тела!💚 Спасибо Вам, что приехали в Москву, в тот день, когда я хотела, это ценно! Фотографии все шикарные, останутся самые теплые, нежные, добрые и в то же время искрящиеся, харизматичные, страстные, соблазнительные воспоминания! 🌟",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/11df90011ecb2b0596de1915d8d0da9cc90d9685?width=760"
    },
    {
      id: 2,
      name: "Марк Фоткин",
      text: "Анна, благодарю Вас за волшебную фотосессию! Это было чудесно, много эмоций и улыбок…. Ощущение совершенного состояния души и тела!💚 Спасибо Вам, что приехали в Москву, в тот день, когда я хотела, это ценно!",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d042e06757308d303a384db3d267b1e54b373100?width=760"
    },
    {
      id: 3,
      name: "Митя Петров",
      text: "Анна, благодарю Вас за волшебную фотосессию! Это было чудесно, много эмоций и улыбок…. Ощущение совершенного состояния души и тела!💚 Спасибо Вам, что приехали в Москву, в тот день, когда я хотела, это ценно! Фотографии все шикарные, останутся самые теплые, нежные, добрые и в то же время искрящиеся, харизматичные, страстные, соблазнительные воспоминания! 🌟",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3fc5d6a378865104f0ef7b2af5d4de191ec038e8?width=760"
    }
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Добавляем обработчики для свайпа на мобильных устройствах
    const slider = sliderRef.current;
    if (slider && isMobile) {
      const handleTouchStart = (e) => {
        startXRef.current = e.touches[0].pageX - slider.offsetLeft;
        scrollLeftRef.current = slider.scrollLeft;
      };
      
      const handleTouchMove = (e) => {
        if (!e.touches || e.touches.length === 0) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startXRef.current) * 2;
        slider.scrollLeft = scrollLeftRef.current - walk;
      };
      
      slider.addEventListener('touchstart', handleTouchStart, false);
      slider.addEventListener('touchmove', handleTouchMove, false);
      
      return () => {
        slider.removeEventListener('touchstart', handleTouchStart);
        slider.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('resize', checkScreenSize);
      };
    }
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [isMobile]);

  const getItemsPerPage = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  
  const nextPage = () => {
    if (isMobile) {
      const nextIndex = (currentPage + 1) % totalPages;
      scrollToSlide(nextIndex);
    } else {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }
  };
  
  const prevPage = () => {
    if (isMobile) {
      const prevIndex = (currentPage - 1 + totalPages) % totalPages;
      scrollToSlide(prevIndex);
    } else {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };
  
  const handleScroll = () => {
    if (isMobile && sliderRef.current) {
      const scrollPos = sliderRef.current.scrollLeft;
      const cardWidth = sliderRef.current.offsetWidth;
      const newIndex = Math.round(scrollPos / cardWidth);
      
      if (newIndex !== currentPage && newIndex >= 0 && newIndex < totalPages) {
        setCurrentPage(newIndex);
      }
    }
  };

  const scrollToSlide = (index) => {
    if (isMobile && sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentPage(index);
    } else {
      setCurrentPage(index);
    }
  };

  const getVisibleItems = () => {
    if (isMobile) return reviews;
    
    const startIndex = currentPage * itemsPerPage;
    return reviews.slice(startIndex, startIndex + itemsPerPage);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#ea580c",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section className="relative px-4 py-12 md:px-16 md:py-24 lg:px-32 xl:px-64 max-sm:px-5 max-sm:py-12 bg-[#1B1B1B]">
      <motion.h2 
        className="mb-16 text-3xl font-semibold leading-10 text-center md:text-4xl lg:text-5xl max-sm:text-3xl text-[#D4D4D4]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Отзывы
      </motion.h2>

      <div className="relative overflow-hidden mb-10">
        {isMobile ? (
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-full px-4 snap-always snap-center"
              >
                <motion.article
                  className="flex flex-col items-start p-4 bg-transparent border border-orange-500 rounded-3xl"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.img 
                    src={review.image} 
                    alt={review.name}
                    className="object-cover mb-5 border border-solid border-orange-600 border-opacity-50 h-80 rounded-3xl w-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3 className="mb-4 text-xl font-bold text-[#D4D4D4]">{review.name}</h3>
                  <p className="text-base text-[#D4D4D4]">{review.text}</p>
                </motion.article>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            key={currentPage}
            className="grid gap-5 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {getVisibleItems().map((review) => (
              <motion.article
                key={review.id}
                className="flex flex-col items-start p-4 bg-transparent border border-orange-500 rounded-3xl"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.img 
                  src={review.image} 
                  alt={review.name}
                  className="object-cover mb-5 border border-solid border-orange-600 border-opacity-50 h-80 rounded-3xl w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="mb-4 text-xl font-bold text-[#D4D4D4]">{review.name}</h3>
                <p className="text-base text-[#D4D4D4]">{review.text}</p>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>

      <div className="flex gap-5 justify-center mb-10">
        <motion.button 
          className="size-10 md:size-12 grid place-items-center disabled:opacity-30 transition-opacity hover:opacity-80 bg-[#2A2A2A] rounded-full"
          onClick={prevPage}
          disabled={currentPage === 0}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Предыдущие отзывы"
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
        </motion.button>

        <motion.button 
          className="size-10 md:size-12 grid place-items-center disabled:opacity-30 transition-opacity hover:opacity-80 bg-[#2A2A2A] rounded-full"
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Следующие отзывы"
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
        </motion.button>
      </div>

      <div className="flex justify-center mt-4 gap-2 mb-10">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentPage ? 'bg-[#D4D4D4] w-6' : 'bg-[#464646] w-2 hover:bg-[#5a5a5a]'
            }`}
            aria-label={`Перейти к отзыву ${index + 1}`}
          />
        ))}
      </div>

      <motion.p 
        className="mx-auto mt-0 mb-16 text-base text-center max-w-[470px] text-[#D4D4D4]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Оставьте свои контакты и мы свяжемся с вами для уточнения деталей съемки
      </motion.p>

      <motion.button 
        className="flex justify-center items-center px-10 py-5 mx-auto my-0 text-base font-semibold bg-orange-600 hover:bg-orange-700 cursor-pointer rounded-[30px] text-zinc-900 w-[260px] transition-colors"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsModalOpen(true)}
      >
        Заказать съемку
      </motion.button>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Reviews;