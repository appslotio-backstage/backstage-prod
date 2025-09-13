<template>
  <section class="w-full relative">
    <h2
      class="mb-8 font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start"
    >
      Выберите свой стиль
    </h2>
    <div
      ref="viewportRef"
      class="relative overflow-x-auto no-scrollbar select-none"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerUp"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
    >
      <div ref="trackRef" class="flex snap-x snap-mandatory w-full">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="snap-center shrink-0 w-full px-4 md:px-6 lg:px-8"
          :aria-label="`slide-${index + 1}`"
        >
          <div class="mx-auto max-w-[1420px]">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div
                v-for="(item, i) in slide"
                :key="`card-${index}-${i}`"
                class="relative overflow-hidden rounded-[30px] bg-card"
                style="aspect-ratio: 460 / 365"
              >
                <div
                  class="absolute inset-0 bg-center bg-cover"
                  :style="{ backgroundImage: `url(${item.src})` }"
                />
                <div class="absolute inset-0 bg-black/25" />

                <div class="absolute left-0 right-0 bottom-0 px-5 py-4">
                  <h3 class="max-w-[70%] subtitle-badge">{{ item.title }}</h3>
                  <p
                    class="flex items-center gap-1 mt-2 font-actay font-normal text-sm text-text leading-tight hover:text-white/70 cursor-pointer transition-all"
                  >
                    {{ item.subtitle }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom arrows (outside of slider) -->
    <div class="w-full mt-8 flex items-center justify-center gap-6">
      <button
        class="rounded-full w-8 h-8 text-text/60 hover:text-text transition-colors flex items-center justify-center"
        aria-label="Previous slide"
        @click="prev"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        class="rounded-full w-8 h-8 text-text/60 hover:text-text transition-colors flex items-center justify-center"
        aria-label="Next slide"
        @click="next"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
const viewportRef = ref(null)
const trackRef = ref(null)

const items = [
  { src: 'images/style/1.png', title: 'Love story', subtitle: 'Романтические кадры для пары' },
  {
    src: 'images/style/2.png',
    title: 'Индивидуальная съемка',
    subtitle: 'Ваша уникальность в каждом кадре',
  },
  { src: 'images/style/3.png', title: 'Fashion-съёмка', subtitle: 'Стильные образы и тренды' },
  { src: 'images/style/1.png', title: 'Love story', subtitle: 'Романтические кадры для пары' },
  {
    src: 'images/style/2.png',
    title: 'Индивидуальная съемка',
    subtitle: 'Ваша уникальность в каждом кадре',
  },
  { src: 'images/style/3.png', title: 'Fashion-съёмка', subtitle: 'Стильные образы и тренды' },
]

const slides = computed(() => {
  const chunked = []
  for (let i = 0; i < items.length; i += 3) {
    chunked.push(items.slice(i, i + 3))
  }
  return chunked
})

let isDragging = false
let startX = 0
let scrollStart = 0
let autoplayTimer = null

function onPointerDown(e) {
  const viewport = viewportRef.value
  if (!viewport) return
  isDragging = true
  startX = e.clientX
  scrollStart = viewport.scrollLeft
  viewport.setPointerCapture(e.pointerId)
  stopAutoplay()
}

function onPointerMove(e) {
  if (!isDragging) return
  const viewport = viewportRef.value
  if (!viewport) return
  const dx = e.clientX - startX
  viewport.scrollLeft = scrollStart - dx
}

function onPointerUp(e) {
  if (!isDragging) return
  const viewport = viewportRef.value
  if (viewport && e?.pointerId) {
    try {
      viewport.releasePointerCapture(e.pointerId)
    } catch {
      // noop
    }
  }
  const dx = (e.clientX || 0) - startX
  const threshold = (viewport?.clientWidth || 0) * 0.1
  isDragging = false
  if (viewport) {
    if (dx <= -threshold) {
      next()
      return
    }
    if (dx >= threshold) {
      prev()
      return
    }
  }
  snapToNearest()
  startAutoplay()
}

function snapToNearest() {
  const viewport = viewportRef.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const index = Math.round(viewport.scrollLeft / slideWidth)
  viewport.scrollTo({ left: index * slideWidth, behavior: 'smooth' })
}

function next(fromAutoplay = false) {
  const viewport = viewportRef.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const maxIndex = slides.value.length - 1
  const currentIndex = Math.round(viewport.scrollLeft / slideWidth)
  const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
  viewport.scrollTo({ left: nextIndex * slideWidth, behavior: 'smooth' })
  if (!fromAutoplay) {
    stopAutoplay()
    startAutoplay()
  }
}

function prev() {
  const viewport = viewportRef.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const maxIndex = slides.value.length - 1
  const currentIndex = Math.round(viewport.scrollLeft / slideWidth)
  const prevIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1
  viewport.scrollTo({ left: prevIndex * slideWidth, behavior: 'smooth' })
  stopAutoplay()
  startAutoplay()
}

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = setInterval(() => next(true), 6000)
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function pauseAutoplay() {
  stopAutoplay()
}
function resumeAutoplay() {
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
  const viewport = viewportRef.value
  if (!viewport) return
  let scrollDebounce
  const onScrollEnd = () => {
    stopAutoplay()
    clearTimeout(scrollDebounce)
    scrollDebounce = setTimeout(() => {
      snapToNearest()
      startAutoplay()
    }, 120)
  }
  viewport.addEventListener('scroll', onScrollEnd)
  onBeforeUnmount(() => {
    viewport.removeEventListener('scroll', onScrollEnd)
  })
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
