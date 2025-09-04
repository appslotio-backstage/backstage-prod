import React, { useState } from 'react';

const PhotoSessionQuiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState('love-story');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedHelp, setSelectedHelp] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-5 mb-6 sm:mb-10">
            <h3 className="mb-6 text-xl font-bold text-left text-neutral-300 sm:mb-10 sm:text-2xl">
              Какой стиль фотосессий вам интересен?
            </h3>
            {[
              { value: 'love-story', label: 'Love story' },
              { value: 'family', label: 'Семейная' },
              { value: 'business', label: 'Деловая' },
              { value: 'fashion', label: 'Fashion' }
            ].map((option) => (
              <label key={option.value} className="flex gap-3 items-center text-sm text-neutral-300 cursor-pointer sm:gap-5 sm:text-base">
                <input
                  type="radio"
                  name="style"
                  value={option.value}
                  checked={selectedStyle === option.value}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="hidden"
                />
                <div className="radio-icon flex-shrink-0">
                  {selectedStyle === option.value ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9.5" stroke="#D4D4D4" />
                      <circle cx="10" cy="10" r="7" fill="#F06512" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9.5" stroke="#D4D4D4" />
                    </svg>
                  )}
                </div>
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-5 mb-6 sm:mb-10">
            <h3 className="mb-6 text-xl font-bold text-left text-neutral-300 sm:mb-10 sm:text-2xl">
              Где хотите провести съемку?
            </h3>
            {['На улице', 'На студии', 'Дома'].map((option) => (
              <label key={option} className="flex gap-3 items-center text-sm text-neutral-300 cursor-pointer sm:gap-5 sm:text-base">
                <input
                  type="radio"
                  name="location"
                  value={option}
                  checked={selectedLocation === option}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="hidden"
                />
                <div className="radio-icon flex-shrink-0">
                  {selectedLocation === option ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9.5" stroke="#D4D4D4" />
                      <circle cx="10" cy="10" r="7" fill="#F06512" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9.5" stroke="#D4D4D4" />
                    </svg>
                  )}
                </div>
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-5 mb-6 sm:mb-10">
            <h3 className="mb-6 text-xl font-bold text-left text-neutral-300 sm:mb-10 sm:text-2xl">
              Нужна ли вам помощь в подборе образа?
            </h3>
            {['Да', 'Нет'].map((option) => (
              <label key={option} className="flex gap-3 items-center text-sm text-neutral-300 cursor-pointer sm:gap-5 sm:text-base">
                <input
                  type="radio"
                  name="help"
                  value={option}
                  checked={selectedHelp === option}
                  onChange={(e) => setSelectedHelp(e.target.value)}
                  className="hidden"
                />
                <div className="radio-icon flex-shrink-0">
                  {selectedHelp === option ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9.5" stroke="#D4D4D4" />
                      <circle cx="10" cy="10" r="7" fill="#F06512" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9.5" stroke="#D4D4D4" />
                    </svg>
                  )}
                </div>
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col gap-5 mb-6 sm:mb-10">
            <h3 className="mb-6 text-xl font-bold text-left text-neutral-300 sm:mb-10 sm:text-2xl">
              Выберите продолжительность фотосессии
            </h3>
            {['30 минут', '1 час', 'Другое'].map((option) => (
              <label key={option} className="flex gap-3 items-center text-sm text-neutral-300 cursor-pointer sm:gap-5 sm:text-base">
                <input
                  type="radio"
                  name="duration"
                  value={option}
                  checked={selectedDuration === option}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="hidden"
                />
                <div className="radio-icon flex-shrink-0">
                  {selectedDuration === option ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9.5" stroke="#D4D4D4" />
                      <circle cx="10" cy="10" r="7" fill="#F06512" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9.5" stroke="#D4D4D4" />
                    </svg>
                  )}
                </div>
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative px-5 py-12 text-center sm:px-12 md:px-24 lg:px-32 xl:px-64 sm:py-24">
      <h2 className="mx-auto mb-8 text-3xl font-semibold leading-10 sm:mb-16 sm:text-4xl lg:text-5xl max-w-[1031px]">
        <span className="text-neutral-300">Ответьте на вопросы и получите скидку </span>
        <span className="text-orange-600">-10% </span>
        <span className="text-neutral-300">на организацию фотосессии «под ключ»</span>
      </h2>

      <div className="flex flex-col gap-8 justify-center items-center p-5 mx-auto border border-solid backdrop-blur-[6px] bg-neutral-800 bg-opacity-10 border-orange-600 border-opacity-50 rounded-2xl max-w-6xl sm:gap-10 sm:p-8 md:flex-row md:p-10 lg:gap-16 lg:rounded-3xl">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/148e5a05496a3e0678c256ba4a7e6ca4760f5209?width=1100"
          alt=""
          className="object-cover rounded-2xl w-full h-auto max-w-md md:max-w-xs lg:max-w-sm xl:max-w-md md:w-1/2 lg:rounded-3xl"
        />

        <div className="flex flex-col justify-between w-full md:w-1/2">
          {renderQuestion()}

          <div className={`flex ${currentStep > 1 ? 'justify-between' : 'justify-end'} mt-6`}>
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="inline-flex gap-2 items-center px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 cursor-pointer rounded-2xl text-white transition-colors sm:px-6 sm:py-2.5 sm:text-base sm:rounded-3xl"
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="transform rotate-180 w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M10.195 13.8302L15 9.00022L10.195 4.17022C10.1516 4.11324 10.0965 4.06624 10.0333 4.03241C9.9702 3.99859 9.90053 3.97872 9.82904 3.97416C9.75756 3.9696 9.68593 3.98045 9.61901 4.00598C9.55208 4.03151 9.49142 4.07112 9.44114 4.12213C9.39085 4.17313 9.35211 4.23435 9.32754 4.30164C9.30297 4.36892 9.29315 4.44069 9.29873 4.51211C9.30431 4.58352 9.32517 4.65289 9.35989 4.71554C9.39462 4.77819 9.4424 4.83265 9.5 4.87522L13.095 8.50022L3.53 8.50022C3.39739 8.50022 3.27021 8.5529 3.17645 8.64667C3.08268 8.74044 3.03 8.86762 3.03 9.00022C3.03 9.13283 3.08268 9.26001 3.17645 9.35378C3.27021 9.44755 3.39739 9.50022 3.53 9.50022L13.095 9.50022L9.5 13.1252C9.40651 13.2194 9.35425 13.3468 9.35472 13.4795C9.35519 13.6122 9.40835 13.7392 9.5025 13.8327C9.59665 13.9262 9.72409 13.9785 9.85677 13.978C9.98945 13.9775 10.1165 13.9244 10.21 13.8302L10.195 13.8302Z" fill="white"/>
                </svg>
                <span>Назад</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="inline-flex gap-2 items-center px-4 py-2 text-sm bg-orange-600 hover:bg-orange-700 cursor-pointer rounded-2xl text-zinc-900 transition-colors sm:px-6 sm:py-2.5 sm:text-base sm:rounded-3xl"
            >
              <span>{currentStep === 4 ? 'Отправить' : 'Далее'}</span>
              {currentStep < 4 && (
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className=" w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M10.195 13.8302L15 9.00022L10.195 4.17022C10.1516 4.11324 10.0965 4.06624 10.0333 4.03241C9.9702 3.99859 9.90053 3.97872 9.82904 3.97416C9.75756 3.9696 9.68593 3.98045 9.61901 4.00598C9.55208 4.03151 9.49142 4.07112 9.44114 4.12213C9.39085 4.17313 9.35211 4.23435 9.32754 4.30164C9.30297 4.36892 9.29315 4.44069 9.29873 4.51211C9.30431 4.58352 9.32517 4.65289 9.35989 4.71554C9.39462 4.77819 9.4424 4.83265 9.5 4.87522L13.095 8.50022L3.53 8.50022C3.39739 8.50022 3.27021 8.5529 3.17645 8.64667C3.08268 8.74044 3.03 8.86762 3.03 9.00022C3.03 9.13283 3.08268 9.26001 3.17645 9.35378C3.27021 9.44755 3.39739 9.50022 3.53 9.50022L13.095 9.50022L9.5 13.1252C9.40651 13.2194 9.35425 13.3468 9.35472 13.4795C9.35519 13.6122 9.40835 13.7392 9.5025 13.8327C9.59665 13.9262 9.72409 13.9785 9.85677 13.978C9.98945 13.9775 10.1165 13.9244 10.21 13.8302L10.195 13.8302Z" fill="#1B1B1B"/>
                </svg>
                
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoSessionQuiz;