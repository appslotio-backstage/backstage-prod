<template>
  <section id="hero" class="relative w-full min-h-screen flex flex-col overflow-hidden">
    <div class="absolute inset-0 w-full h-full overflow-hidden z-0">
      <NuxtImg
        src="/images/hero/hero-bg.png"
        alt="Фоновое изображение"
        class="w-full h-full object-cover"
        format="webp,jpg"
        quality="85"
        loading="eager"
        preload
      />
    </div>

    <HeroHeader @open-modal="openModal" />

    <div
      class="flex-grow relative flex items-center justify-center w-full pt-20 pb-24 md:pb-48 lg:pb-64"
    >
      <div class="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <h1
          class="text-center font-display font-extrabold uppercase text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[148px] leading-tight sm:leading-snug md:leading-normal lg:leading-[1.2] xl:leading-[187px] text-[#F06512] max-w-full px-2 animate-fade-in-down"
        >
          BACKSTAGE
        </h1>

        <p
          class="mt-3 md:mt-6 text-center font-actay text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed sm:leading-relaxed md:leading-normal text-[#8F8F8F] max-w-full md:max-w-4xl px-4 animate-fade-in-up"
          :style="{ animationDelay: '0.3s' }"
        >
          Организация съёмок «под ключ»
        </p>

        <button
          @click="openModal"
          class="mt-6 md:mt-12 px-6 py-2 md:px-10 md:py-4 rounded-[30px] bg-[#F06512] hover:bg-[#ff7b2d] transition-all duration-300 flex items-center justify-center font-display text-sm md:text-lg text-[#1B1B1B] tracking-wide transform hover:scale-105 animate-fade-in-up shadow-lg hover:shadow-xl cursor-pointer"
          :style="{ animationDelay: '0.6s' }"
        >
          Заказать съёмку
        </button>
      </div>
    </div>

    <HeroContactModal :is-open="isModalOpen" @close="closeModal" />
  </section>
</template>

<script setup>
const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
}
function closeModal() {
  isModalOpen.value = false
}
</script>

<style scoped>
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
</style>
