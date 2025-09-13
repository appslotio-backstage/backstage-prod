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
        <h1 class="text-center h1-block max-w-full px-2 animate-fade-in-down">BACKSTAGE</h1>

        <p
          class="md:mt-[-20px] text-center subtitle-1-block max-w-full md:max-w-4xl px-4 animate-fade-in-up"
          :style="{ animationDelay: '0.3s' }"
        >
          Организация съёмок «под ключ»
        </p>

        <UIButton class="md:mt-[68px] mt-12" @click="openModal">Заказать съёмку</UIButton>
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
