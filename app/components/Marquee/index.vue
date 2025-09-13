<template>
  <section
    class="relative w-[100vw] ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y border-[#464646] overflow-hidden py-3"
  >
    <div class="marquee" @mouseenter="paused = true" @mouseleave="paused = false">
      <div class="marquee-content" :class="{ paused }" :style="trackStyle">
        <span
          v-for="i in repeat"
          :key="'a' + i"
          class="text-lg md:text-[24px] leading-[28px] uppercase text-[#464646] font-semibold whitespace-nowrap mx-4 md:mx-8"
        >
          {{ text }}
        </span>
      </div>
      <div class="marquee-content" :class="{ paused }" :style="trackStyle">
        <span
          v-for="i in repeat"
          :key="'b' + i"
          class="text-lg md:text-[24px] leading-[28px] uppercase text-[#464646] font-semibold whitespace-nowrap mx-4 md:mx-8"
        >
          {{ text }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  text: { type: String, default: 'BACKSTAGE' },
  repeat: { type: Number, default: 10 },
  speed: { type: Number, default: 20 }, // seconds per loop
})

const paused = ref(false)
const trackStyle = computed(() => ({ '--duration': `${props.speed}s` }))
</script>

<style scoped>
.marquee {
  position: relative;
  display: flex;
}
.marquee-content {
  display: flex;
  will-change: transform;
  animation: marquee var(--duration) linear infinite;
}
.paused {
  animation-play-state: paused;
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
