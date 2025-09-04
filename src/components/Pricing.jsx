import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Данные услуг
const servicesData = [
  {
    title: "Фото",
    items: [
      {
        title: "Индивидуальная фотосессия",
        description: "1 час съемки\n20 обработанных фото",
        price: "ОТ 5000 ₽"
      },
      {
        title: "Семейная фотосессия",
        description: "2 часа съемки\n40 обработанных фото",
        price: "ОТ 5000 ₽"
      },
      {
        title: "Love story съемка",
        description: "2 часа съемки\n30 обработанных фото",
        price: "ОТ 6000 ₽"
      }
    ]
  },
  {
    title: "Видео",
    items: [
      {
        title: "Индивидуальная видеосъемка",
        description: "1 час съемки\n1 минутный клип",
        price: "ОТ 8000 ₽"
      },
      {
        title: "Семейная видеосъемка",
        description: "2 часа съемки\n3 минутный фильм",
        price: "ОТ 12000 ₽"
      },
      {
        title: "Рекламный ролик",
        description: "Профессиональный видеоконтент\nдля бизнеса",
        price: "ОТ 15000 ₽"
      }
    ]
  },
  {
    title: "Доп. услуги",
    items: [
      {
        title: "Визажист",
        description: "Профессиональный макияж\nдля фотосессии",
        price: "ОТ 3000 ₽"
      },
      {
        title: "Стилист",
        description: "Подбор образов\nи аксессуаров",
        price: "ОТ 4000 ₽"
      },
      {
        title: "Аренда локации",
        description: "Подбор и бронирование\nидеальной локации",
        price: "ОТ 2000 ₽"
      }
    ]
  }
];

// Анимации
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 20px -5px rgba(240, 101, 18, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

function ServiceCard({ service }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      whileHover="hover"
      className="relative flex flex-col p-4 border border-solid bg-[#2A2A2A] border-[#F06512] border-opacity-50 min-h-[130px] rounded-xl transition-all duration-300 md:p-5"
    >
      <div className="absolute top-4 right-4 text-base font-medium text-white">
        {service.price}
      </div>
      
      <div className="pr-16">
        <h4 className="text-sm font-medium text-[#D4D4D4] md:text-base">{service.title}</h4>
        <p className="mt-2 text-xs text-[#D4D4D4] md:text-sm whitespace-pre-line leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % servicesData.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + servicesData.length) % servicesData.length);
  };

  return (
    <section 
      id="pricing" 
      ref={ref}
      className="relative bg-[#1B1B1B] py-10 md:py-14 lg:py-16 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2 
          className="text-2xl md:text-3xl font-medium text-center text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Стоимость услуг
        </motion.h2>
        
        <motion.p 
          className="mx-auto mt-0 mb-8 md:mb-10 text-sm text-center text-[#D4D4D4] max-w-[400px] md:max-w-[493px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          В стоимость входит организация вашей съемки "под ключ" от выбора стиля до получения готовых фото и видео
        </motion.p>

        {/* Desktop layout - две колонки сверху, одна снизу по центру */}
        <div className="hidden md:block">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mx-auto mb-8 lg:mb-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {servicesData.slice(0, 2).map((category, categoryIndex) => (
              <motion.div 
                key={category.title}
                variants={itemVariants}
                className="flex flex-col gap-5"
              >
                <h3 className="text-xl font-medium text-center text-white">
                  {category.title}
                </h3>
                
                <div className="flex flex-col gap-5">
                  {category.items.map((service, serviceIndex) => (
                    <ServiceCard 
                      key={service.title} 
                      service={service} 
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Третья категория - по центру снизу */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full max-w-md">
              <h3 className="text-xl font-medium text-center text-white mb-5">
                {servicesData[2].title}
              </h3>
              
              <div className="flex flex-col gap-5">
                {servicesData[2].items.map((service, serviceIndex) => (
                  <ServiceCard 
                    key={service.title} 
                    service={service} 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile layout - кастомный слайдер */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-xl bg-transparent p-5">
            {/* Заголовок текущего слайда */}
            <h3 className="text-xl font-medium text-center text-white mb-5">
              {servicesData[activeSlide].title}
            </h3>
            
            {/* Контент слайда */}
            <div className="flex flex-col gap-5">
              {servicesData[activeSlide].items.map((service, serviceIndex) => (
                <ServiceCard 
                  key={service.title} 
                  service={service} 
                />
              ))}
            </div>
            
            {/* Навигационные кнопки */}
            <div className="flex justify-between items-center mt-6">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-[#3A3A3A] hover:bg-[#F06512] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* Индикаторы слайдов */}
              <div className="flex gap-2">
                {servicesData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeSlide ? 'bg-[#F06512]' : 'bg-[#D4D4D4]'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-[#3A3A3A] hover:bg-[#F06512] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;