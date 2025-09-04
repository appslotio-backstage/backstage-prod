import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Импортируем изображения
import mainImage from "/image.png";
import mobileImage from "/image2.png";

// Анимации
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Why() {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  // Определяем тип устройства при монтировании и изменении размера окна
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Проверяем при монтировании
    checkIsMobile();

    // Добавляем слушатель изменения размера
    window.addEventListener('resize', checkIsMobile);
    
    // Убираем слушатель при размонтировании
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <motion.section 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-[#1B1B1B] py-16 mt-[0px] overflow-hidden"
    >
      <div className="w-full max-w-[1420px] mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <motion.h2
          variants={itemVariants}
          style={{ fontFamily: "'Gilroy', sans-serif" }}
          className="text-[36px] md:text-[48px] font-[600] leading-[100%] text-[#D4D4D4] mb-4 text-center md:text-left"
        >
          Почему <span className="text-[#F06512]">стоит доверить</span><br />
          организацию <span className="text-[#F06512]">Backstage</span>
        </motion.h2>

        {/* Подзаголовок по центру */}
        <motion.p
          variants={itemVariants}
          style={{ fontFamily: "'Actay', sans-serif" }}
          className="mx-auto text-center text-[#D4D4D4] text-[16px] leading-[20px] mb-10 max-w-[489px]"
        >
          Мы создаем не просто фотосессии, а уникальные истории, где каждая деталь отражает вашу индивидуальность
        </motion.p>

        {/* Адаптивное изображение - разное для мобильных и десктопных устройств */}
        <motion.div 
          variants={itemVariants}
          className="relative w-full overflow-hidden rounded-lg shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Десктопное изображение */}
          <motion.img
            src={mainImage}
            alt="Почему стоит выбрать Backstage"
            className="w-full h-auto object-cover hidden md:block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          
          {/* Мобильное изображение */}
          <motion.img
            src={mobileImage}
            alt="Почему стоит выбрать Backstage"
            className="w-full h-auto object-cover block md:hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          
          {/* Дополнительные элементы с анимацией поверх изображения */}
      
        </motion.div>

        {/* Дополнительный текст под изображением */}
        
      </div>
    </motion.section>
  );
}