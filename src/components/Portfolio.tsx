import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function Portfolio() {
  const p = "/portfolio";
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Категории портфолио
  const categories = ["Love story", "Свадьбы", "Портреты", "Семейные"];
  
  // Изображения для мобильной версии
  const mobileImages = [
    { id: 1, image: `${p}/Rectangle 38.png` },
    { id: 2, image: `${p}/Rectangle 6.png` },
    { id: 3, image: `${p}/Rectangle 5.png` },
    { id: 4, image: `${p}/Rectangle 39.png` },
    { id: 5, image: `${p}/image.png` },
    { id: 6, image: `${p}/image-1.png` }
  ];

  // Полноразмерные изображения для десктопа
  const desktopImages = [
    { id: 1, image: `${p}/Rectangle 38.png` },
    { id: 2, image: `${p}/Rectangle 6.png` },
    { id: 3, image: `${p}/Rectangle 5.png` },
    { id: 4, image: `${p}/Rectangle 39.png` },
    { id: 5, image: `${p}/image.png` },
    { id: 6, image: `${p}/image-1.png` }
  ];

  return (
    <motion.section 
      id="portfolio" 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-[#1B1B1B] py-12 md:py-20 lg:py-[120px] px-4 sm:px-6 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl xl:max-w-[1420px]">
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl lg:text-[48px] leading-tight md:leading-[59px] font-bold text-[#D4D4D4] mb-6 md:mb-8 text-center lg:text-left"
        >
          Портфолио
        </motion.h2>

        {/* Мобильная сетка со слайдами */}
        {isMobile && (
          <motion.div variants={containerVariants} className="mb-8 md:mb-10">
            {[
              mobileImages.slice(0, 3), // первый слайд
              mobileImages.slice(3, 6)  // второй слайд
            ].map((slide, slideIndex) => (
              <motion.div
                key={slideIndex}
                className={`${slideIndex === activeSlide ? "block" : "hidden"}`}
              >
                {/* Верхняя сетка из 2-х фото */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {slide.slice(0, 2).map((image) => (
                    <motion.div
                      key={image.id}
                      variants={imageVariants}
                      className="overflow-hidden rounded-2xl bg-gray-800"
                    >
                      <img 
                        src={image.image} 
                        alt={`Портфолио ${image.id}`} 
                        className="w-full h-full object-cover"
                        style={{ maxHeight: "185px" }} // уменьшенная высота
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Фото на всю ширину */}
                <motion.div variants={imageVariants}>
                  <div className="overflow-hidden rounded-2xl bg-gray-800 aspect-video">
                    <img 
                      src={slide[2].image} 
                      alt={`Портфолио ${slide[2].id}`} 
                      className="w-full h-full object-cover"
                      style={{ maxHeight: "1000px" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Переключатель слайдов */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    activeSlide === i ? "bg-orange-500" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Десктопная сетка */}
        {!isMobile && (
          <motion.div 
            variants={containerVariants}
            className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-[40px] mb-8 md:mb-10"
          >
            {/* Левая колонка */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <motion.div 
                  variants={imageVariants}
                  whileHover="hover"
                  className="overflow-hidden rounded-2xl md:rounded-[30px] aspect-[4/3] w-48 bg-gray-800"
                >
                  <img 
                    src={desktopImages[0].image} 
                    alt="Love story" 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
                <motion.div 
                  variants={imageVariants}
                  whileHover="hover"
                  className="overflow-hidden rounded-2xl md:rounded-[30px] aspect-[4/3] w-72 bg-gray-800"
                >
                  <img 
                    src={desktopImages[1].image} 
                    alt="Wedding" 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
              </div>
              <div className="flex gap-6">
                <motion.div 
                  variants={imageVariants}
                  whileHover="hover"
                  className="overflow-hidden rounded-2xl md:rounded-[30px] aspect-[4/3] w-72 bg-gray-800"
                >
                  <img 
                    src={desktopImages[2].image} 
                    alt="Portrait" 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
                <motion.div 
                  variants={imageVariants}
                  whileHover="hover"
                  className="overflow-hidden rounded-2xl md:rounded-[30px] aspect-[4/3] w-48 bg-gray-800"
                >
                  <img 
                    src={desktopImages[3].image} 
                    alt="Family" 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
              </div>
            </div>

            {/* Правая колонка */}
            <div className="flex gap-6 mt-6 lg:mt-0">
              <motion.div 
                variants={imageVariants}
                whileHover="hover"
                className="overflow-hidden rounded-2xl md:rounded-[30px] aspect-[3/4] w-96 bg-gray-800"
              >
                <img 
                  src={desktopImages[4].image} 
                  alt="Portfolio" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
              <motion.div 
                variants={imageVariants}
                whileHover="hover"
                className="overflow-hidden rounded-2xl md:rounded-[30px] aspect-[3/4] w-52 bg-gray-800"
              >
                <img 
                  src={desktopImages[5].image} 
                  alt="Portfolio" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Кнопка */}
        <motion.div variants={itemVariants} className="mt-8 md:mt-10 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#FF7B2D" }}
            whileTap={{ scale: 0.95 }}
            className="h-12 md:h-[51px] px-6 md:px-[40px] rounded-full bg-[#F06512] text-[#1B1B1B] text-base md:text-[16px] font-medium"
          >
            Подробнее
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
