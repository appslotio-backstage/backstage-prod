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
    <ClientOnly>
      <div
        ref="viewportRef"
        class="relative overflow-x-auto no-scrollbar select-none snap-x snap-mandatory"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @pointerleave="onPointerUp"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
      >
        <div ref="trackRef" class="flex w-full">
          <div
            v-for="(slide, index) in effectiveSlides"
            :key="index"
            class="snap-center snap-always shrink-0 w-full"
            :aria-label="`slide-${index + 1}`"
          >
            <div class="w-full">
              <!-- Desktop layout -->
              <div class="relative w-full hidden md:block" style="aspect-ratio: 1400 / 482">
                <div
                  class="absolute inset-0 grid"
                  style="
                    grid-template-columns: 50fr 33.824fr 16.176fr;
                    grid-template-rows: 1fr 1fr;
                    gap: 20px;
                  "
                >
                  <!-- Left area: nested grids for two rows -->
                  <div
                    class="grid h-full row-span-2"
                    style="grid-template-rows: 1fr 1fr; gap: 20px"
                  >
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
                  <div
                    class="col-span-1 row-span-2 relative bg-card overflow-hidden rounded-[30px]"
                  >
                    <img
                      :src="slide.rightTall460x482"
                      alt=""
                      class="absolute inset-0 w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <div
                    class="col-span-1 row-span-2 relative bg-card overflow-hidden rounded-[30px]"
                  >
                    <img
                      :src="slide.rightTall220x482"
                      alt=""
                      class="absolute inset-0 w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                </div>
              </div>

              <!-- Mobile layout -->
              <div class="relative w-full md:hidden" style="aspect-ratio: 343 / 300">
                <div class="absolute inset-0 grid grid-cols-2 gap-3">
                  <div
                    class="relative bg-card overflow-hidden rounded-[20px]"
                    style="aspect-ratio: 168 / 110"
                  >
                    <img
                      :src="slide.topLeft240x231"
                      alt=""
                      class="absolute inset-0 w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <div
                    class="relative bg-card overflow-hidden rounded-[20px]"
                    style="aspect-ratio: 168 / 110"
                  >
                    <img
                      :src="slide.topRight440x231"
                      alt=""
                      class="absolute inset-0 w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <div
                    class="relative bg-card overflow-hidden rounded-[20px] col-span-2"
                    style="aspect-ratio: 343 / 180"
                  >
                    <img
                      :src="slide.bottomLeft403x231"
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
    </ClientOnly>

    <!-- controls -->
    <ClientOnly>
      <div class="w-full mt-9 flex flex-col items-center gap-4">
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

          <div class="h-2 w-32 md:w-56 rounded-full overflow-hidden items-center px-1 flex">
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

        <UIButton class="mx-auto hidden md:inline-flex">Подробнее</UIButton>
      </div>

      <!-- Mobile CTA -->
      <div class="mt-5 md:hidden flex justify-center">
        <UIButton>Подробнее</UIButton>
      </div>
    </ClientOnly>
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

// Responsive slides: desktop uses original slides; mobile splits each into two
const isMobile = ref(false)
const effectiveSlides = computed(() => {
  if (!isMobile.value) return slides.value
  // Split each desktop slide into two mobile slides (first: TL + TR + BL; second: BR + RightTall460 + RightTall220)
  const result = []
  for (const s of slides.value) {
    result.push({
      topLeft240x231: s.topLeft240x231,
      topRight440x231: s.topRight440x231,
      bottomLeft403x231: s.bottomLeft403x231,
      // placeholders to keep object shape for template
      bottomRight277x231: s.bottomRight277x231,
      rightTall460x482: s.rightTall460x482,
      rightTall220x482: s.rightTall220x482,
      __mobileHalf: 1,
    })
    result.push({
      topLeft240x231: s.bottomRight277x231,
      topRight440x231: s.rightTall460x482,
      bottomLeft403x231: s.rightTall220x482,
      bottomRight277x231: s.bottomRight277x231,
      rightTall460x482: s.rightTall460x482,
      rightTall220x482: s.rightTall220x482,
      __mobileHalf: 2,
    })
  }
  return result
})

let isDragging = false
let startX = 0
let scrollStart = 0
let autoplayTimer = null
const currentIndex = ref(0)
const segmentsCount = computed(() => effectiveSlides.value.length)
let scrollRaf = null

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
  const index = Math.max(
    0,
    Math.min(Math.round(viewport.scrollLeft / slideWidth), segmentsCount.value - 1),
  )
  const targetLeft = index * slideWidth
  if (Math.abs(viewport.scrollLeft - targetLeft) > 1) {
    // Temporarily disable CSS scroll-snap to avoid double snapping/jitter
    const prevSnapType = viewport.style.scrollSnapType
    viewport.style.scrollSnapType = 'none'
    viewport.scrollTo({ left: targetLeft, behavior: 'auto' })
    requestAnimationFrame(() => {
      viewport.style.scrollSnapType = prevSnapType || ''
    })
  }
  currentIndex.value = index
}

function next(fromAutoplay = false) {
  const viewport = viewportRef.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const maxIndex = segmentsCount.value - 1
  const currentSlideIndex = Math.round(viewport.scrollLeft / slideWidth)
  const nextIndex = currentSlideIndex >= maxIndex ? 0 : currentSlideIndex + 1
  viewport.scrollTo({ left: nextIndex * slideWidth, behavior: 'smooth' })
  // keep indicator in sync immediately
  currentIndex.value = nextIndex
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
  const maxIndex = segmentsCount.value - 1
  const currentSlideIndex = Math.round(viewport.scrollLeft / slideWidth)
  const prevIndex = currentSlideIndex <= 0 ? maxIndex : currentSlideIndex - 1
  viewport.scrollTo({ left: prevIndex * slideWidth, behavior: 'smooth' })
  // Reset autoplay timer on manual navigation
  stopAutoplay()
  startAutoplay()
  // keep indicator in sync immediately
  currentIndex.value = prevIndex
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

// Update indicator during scroll (throttled with rAF)
function updateCurrentIndexFromScroll() {
  const viewport = viewportRef.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  if (!slideWidth) return
  const idx = Math.round(viewport.scrollLeft / slideWidth)
  currentIndex.value = Math.max(0, Math.min(idx, segmentsCount.value - 1))
}

onMounted(() => {
  const updateIsMobile = () => {
    isMobile.value = window.matchMedia('(max-width: 767px)').matches
  }
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)

  startAutoplay()
  const viewport = viewportRef.value
  if (!viewport) return
  let scrollDebounce
  const onScroll = () => {
    // show correct indicator live and pause autoplay while scrolling
    stopAutoplay()
    if (!scrollRaf) {
      scrollRaf = requestAnimationFrame(() => {
        updateCurrentIndexFromScroll()
        scrollRaf = null
      })
    }
    clearTimeout(scrollDebounce)
    scrollDebounce = setTimeout(() => {
      snapToNearest()
      startAutoplay()
    }, 160)
  }
  viewport.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => {
    viewport.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', updateIsMobile)
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
