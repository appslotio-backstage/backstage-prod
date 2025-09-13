<template>
  <section class="w-full relative">
    <div>
      <h2
        class="font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start"
      >
        Портфолио
      </h2>
      <p
        class="mt-3 !text-accent text-center mb-8 font-actay font-normal text-2xl leading-none tracking-normal"
      >
        Love story
      </p>
    </div>
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
          class="snap-center shrink-0 w-full"
          :aria-label="`slide-${index + 1}`"
        >
          <div class="w-full">
            <div class="relative w-full" style="aspect-ratio: 1400 / 482">
              <div
                class="absolute inset-0 grid"
                style="
                  grid-template-columns: 50fr 33.824fr 16.176fr;
                  grid-template-rows: 1fr 1fr;
                  gap: 20px;
                "
              >
                <!-- Left area: nested grids for two rows -->
                <div class="grid h-full row-span-2" style="grid-template-rows: 1fr 1fr; gap: 20px">
                  <!-- Top row: 240x231 + 440x231 -->
                  <div
                    class="grid h-full"
                    style="grid-template-columns: 35.294fr 64.706fr; gap: 20px"
                  >
                    <div class="relative bg-card overflow-hidden h-full rounded-[30px]">
                      <img
                        :src="slide.topLeft240x231"
                        alt=""
                        class="absolute inset-0 w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>
                    <div class="relative bg-card overflow-hidden h-full rounded-[30px]">
                      <img
                        :src="slide.topRight440x231"
                        alt=""
                        class="absolute inset-0 w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>
                  </div>
                  <!-- Bottom row: 403x231 + 277x231 -->
                  <div
                    class="grid h-full"
                    style="grid-template-columns: 59.265fr 40.735fr; gap: 20px"
                  >
                    <div class="relative bg-card overflow-hidden h-full rounded-[30px]">
                      <img
                        :src="slide.bottomLeft403x231"
                        alt=""
                        class="absolute inset-0 w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>
                    <div class="relative bg-card overflow-hidden h-full rounded-[30px]">
                      <img
                        :src="slide.bottomRight277x231"
                        alt=""
                        class="absolute inset-0 w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>
                  </div>
                </div>

                <!-- Right tall area: two columns (460x482 and 220x482) spanning both rows -->
                <div class="col-span-1 row-span-2 relative bg-card overflow-hidden rounded-[30px]">
                  <img
                    :src="slide.rightTall460x482"
                    alt=""
                    class="absolute inset-0 w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
                <div class="col-span-1 row-span-2 relative bg-card overflow-hidden rounded-[30px]">
                  <img
                    :src="slide.rightTall220x482"
                    alt=""
                    class="absolute inset-0 w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- controls -->
    <div class="grid grid-cols-3 w-full mt-9">
      <div></div>
      <UIButton class="mx-auto">Подробнее</UIButton>
      <div class="w-full flex items-center justify-center">
        <div class="flex items-center gap-6">
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

          <div class="h-2 w-56 rounded-full overflow-hidden flex items-center px-1">
            <div class="flex w-full gap-1">
              <span
                v-for="(_, i) in segmentsCount"
                :key="i"
                class="h-1 flex-1 transition-colors"
                :class="i === currentIndex ? 'bg-white' : 'bg-white/35'"
              />
            </div>
          </div>

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
      </div>
    </div>
  </section>
</template>

<script setup>
const viewportRef = ref(null)
const trackRef = ref(null)

const slides = ref([
  {
    topLeft240x231: 'images/slider/1/1.png',
    topRight440x231: 'images/slider/1/2.png',
    bottomLeft403x231: 'images/slider/1/3.png',
    bottomRight277x231: 'images/slider/1/4.png',
    rightTall460x482: 'images/slider/1/5.png',
    rightTall220x482: 'images/slider/1/6.png',
  },
  {
    topLeft240x231: 'images/slider/1/1.png',
    topRight440x231: 'images/slider/1/2.png',
    bottomLeft403x231: 'images/slider/1/3.png',
    bottomRight277x231: 'images/slider/1/4.png',
    rightTall460x482: 'images/slider/1/5.png',
    rightTall220x482: 'images/slider/1/6.png',
  },
])

let isDragging = false
let startX = 0
let scrollStart = 0
let autoplayTimer = null
const currentIndex = ref(0)
const segmentsCount = computed(() => slides.value.length)

function onPointerDown(e) {
  const viewport = viewportRef.value
  if (!viewport) return
  isDragging = true
  startX = e.clientX
  scrollStart = viewport.scrollLeft
  viewport.setPointerCapture(e.pointerId)
  // Pause autoplay while user interacts
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
      // ignore
    }
  }
  // Decide slide based on drag distance with low threshold
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
  // Resume autoplay after user finishes dragging
  startAutoplay()
}

function snapToNearest() {
  const viewport = viewportRef.value
  const track = trackRef.value
  if (!viewport || !track) return
  const slideWidth = viewport.clientWidth
  const index = Math.round(viewport.scrollLeft / slideWidth)
  viewport.scrollTo({ left: index * slideWidth, behavior: 'smooth' })
  currentIndex.value = index
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
    // Reset autoplay timer on manual navigation
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
  // Reset autoplay timer on manual navigation
  stopAutoplay()
  startAutoplay()
}

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    next(true)
  }, 5000)
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
    // Reset autoplay whenever user scrolls manually
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
