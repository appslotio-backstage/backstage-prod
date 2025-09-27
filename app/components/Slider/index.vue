<template>
  <section class="w-full relative">
    <div>
      <h2
        class="font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start"
      >
        {{ portfolioData?.meta?.body?.title }}
      </h2>
      <p
        class="mt-3 !text-accent text-center mb-8 font-actay font-normal text-2xl leading-none tracking-normal"
      >
        {{ portfolioData?.meta?.body?.subtitle }}
      </p>
    </div>
    <ClientOnly>
      <div
        ref="viewportRef"
        class="relative overflow-x-auto no-scrollbar select-none snap-x snap-mandatory scroll-smooth touch-auto overscroll-x-contain"
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
            class="snap-start snap-always shrink-0 w-full"
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
                          :alt="slide.altTopLeft240x231 || ''"
                          class="absolute inset-0 w-full h-full object-cover"
                          draggable="false"
                        />
                      </div>
                      <div class="relative bg-card overflow-hidden h-full rounded-[30px]">
                        <img
                          :src="slide.topRight440x231"
                          :alt="slide.altTopRight440x231 || ''"
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
                          :alt="slide.altBottomLeft403x231 || ''"
                          class="absolute inset-0 w-full h-full object-cover"
                          draggable="false"
                        />
                      </div>
                      <div class="relative bg-card overflow-hidden h-full rounded-[30px]">
                        <img
                          :src="slide.bottomRight277x231"
                          :alt="slide.altBottomRight277x231 || ''"
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
                      :alt="slide.altRightTall460x482 || ''"
                      class="absolute inset-0 w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <div
                    class="col-span-1 row-span-2 relative bg-card overflow-hidden rounded-[30px]"
                  >
                    <img
                      :src="slide.rightTall220x482"
                      :alt="slide.altRightTall220x482 || ''"
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
                      :alt="slide.altTopLeft240x231 || ''"
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
                      :alt="slide.altTopRight440x231 || ''"
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
                      :alt="slide.altBottomLeft403x231 || ''"
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

        <UIButton class="mx-auto hidden md:inline-flex" @click="showDetails = true"
          >Подробнее</UIButton
        >
      </div>

      <!-- Mobile CTA -->
      <div class="mt-5 md:hidden flex justify-center">
        <UIButton @click="showDetails = true">Подробнее</UIButton>
      </div>
    </ClientOnly>

    <!-- Details Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showDetails" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60" @click="showDetails = false" />
          <div
            class="relative w-full max-w-[694px] rounded-[30px] border border-[#F0651280] overflow-hidden bg-card"
          >
            <div class="relative z-10 p-6 md:p-8 text-white flex flex-col">
              <h3 class="font-actayWide font-bold text-[28px] leading-tight">
                {{ detailsTitle }}
              </h3>
              <p
                v-if="detailsText"
                class="mt-3 font-actay text-[16px] leading-snug text-white/90 whitespace-pre-line"
              >
                {{ detailsText }}
              </p>
              <div class="mt-8 flex justify-center gap-3">
                <UIButton @click="openContact()">Заказать съемку</UIButton>
                <UIButton class="!bg-white !text-black" @click="showDetails = false"
                  >Закрыть</UIButton
                >
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Contact Modal -->
    <Teleport to="body">
      <HeroContactModal
        :is-open="contactOpen"
        sheet-name="LeadsPortfolio"
        apps-script-url="https://script.google.com/macros/s/AKfycbzpv04Mkiw5Q7Vm_07nG_MiWAn2ZaM7V79_fNBwhwQurRqhoh_OKoM2MX3fmGwUw2U/exec"
        @close="onContactClosed"
      />
    </Teleport>
  </section>
</template>

<script setup>
import HeroContactModal from '@/components/Hero/ContactModal.vue'

const viewportRef = ref(null)
const trackRef = ref(null)

const portfolioData = await usePortfolio()

function pick(arr, idx) {
  return arr[idx] || { src: '', alt: '' }
}

const slides = computed(() => {
  const root = portfolioData?.value?.meta || portfolioData?.value || {}
  const items = Array.from({ length: 30 }, (_, i) => root[`item${i + 1}`])
    .filter((v) => v && typeof v === 'object')
    .map((it) => ({ src: it?.src || '', alt: it?.alt || '' }))
    .filter((it) => it.src)

  // desktop slide requires 6 images; mobile slide uses 3 (TL, TR, BL)
  const desktopSlides = []
  for (let i = 0; i + 5 < items.length; i += 6) {
    const [a, b, c, d, e, f] = [
      pick(items, i),
      pick(items, i + 1),
      pick(items, i + 2),
      pick(items, i + 3),
      pick(items, i + 4),
      pick(items, i + 5),
    ]
    // if we don't have full 6, skip
    if (!(a.src && b.src && c.src && d.src && e.src && f.src)) continue
    desktopSlides.push({
      topLeft240x231: a.src,
      altTopLeft240x231: a.alt,
      topRight440x231: b.src,
      altTopRight440x231: b.alt,
      bottomLeft403x231: c.src,
      altBottomLeft403x231: c.alt,
      bottomRight277x231: d.src,
      altBottomRight277x231: d.alt,
      rightTall460x482: e.src,
      altRightTall460x482: e.alt,
      rightTall220x482: f.src,
      altRightTall220x482: f.alt,
    })
  }
  return desktopSlides
})

// Responsive slides: desktop uses original slides; mobile splits each into two
const isMobile = ref(false)
const effectiveSlides = computed(() => {
  if (!isMobile.value) return slides.value
  // Mobile slide needs 3 images per slide: TL, TR, BL from desktop mapping
  const imgs = slides.value.flatMap((s) => [
    { src: s.topLeft240x231, alt: s.altTopLeft240x231 },
    { src: s.topRight440x231, alt: s.altTopRight440x231 },
    { src: s.bottomLeft403x231, alt: s.altBottomLeft403x231 },
    { src: s.bottomRight277x231, alt: s.altBottomRight277x231 },
    { src: s.rightTall460x482, alt: s.altRightTall460x482 },
    { src: s.rightTall220x482, alt: s.altRightTall220x482 },
  ])
  const result = []
  for (let i = 0; i + 2 < imgs.length; i += 3) {
    result.push({
      topLeft240x231: imgs[i].src,
      altTopLeft240x231: imgs[i].alt,
      topRight440x231: imgs[i + 1].src,
      altTopRight440x231: imgs[i + 1].alt,
      bottomLeft403x231: imgs[i + 2].src,
      altBottomLeft403x231: imgs[i + 2].alt,
      bottomRight277x231: '',
      rightTall460x482: '',
      rightTall220x482: '',
    })
  }
  return result
})

let isDragging = false
let isPointerDown = false
let isHorizontalDrag = false
let startX = 0
let startY = 0
let scrollStart = 0
let autoplayTimer = null
const currentIndex = ref(0)
const segmentsCount = computed(() => effectiveSlides.value.length)
let scrollRaf = null

// Details modal content and state
const showDetails = ref(false)
const contactOpen = ref(false)
const detailsTitle = computed(() => {
  const root =
    portfolioData?.value?.meta?.body || portfolioData?.value?.meta || portfolioData?.value || {}
  return root.detailsTitle || root.title || 'Подробнее о портфолио'
})
const detailsText = computed(() => {
  const root =
    portfolioData?.value?.meta?.body || portfolioData?.value?.meta || portfolioData?.value || {}
  return root.detailsText || ''
})

function openContact() {
  showDetails.value = false
  contactOpen.value = true
}

function onContactClosed() {
  contactOpen.value = false
}

function onPointerDown(e) {
  const viewport = viewportRef.value
  if (!viewport) return
  isPointerDown = true
  isDragging = false
  isHorizontalDrag = false
  startX = e.clientX
  startY = e.clientY
  scrollStart = viewport.scrollLeft
  // Pause autoplay while user interacts
  stopAutoplay()
}

function onPointerMove(e) {
  if (!isPointerDown) return
  const viewport = viewportRef.value
  if (!viewport) return
  const dx = e.clientX - startX
  const dyVal = e.clientY - startY
  if (!isDragging) {
    const absX = Math.abs(dx)
    const absY = Math.abs(dyVal)
    const threshold = 6
    if (absX < threshold && absY < threshold) return
    if (absY > absX) {
      // vertical intent → release and let page scroll
      isPointerDown = false
      isDragging = false
      isHorizontalDrag = false
      return
    }
    // horizontal intent
    isDragging = true
    isHorizontalDrag = true
    try {
      viewport.setPointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }
  if (!isHorizontalDrag) return
  // Use direct set with no smooth to avoid fighting CSS snap
  viewport.scrollLeft = scrollStart - dx
}

function onPointerUp(e) {
  if (!isPointerDown && !isDragging) return
  const viewport = viewportRef.value
  if (viewport && e?.pointerId) {
    try {
      viewport.releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }
  // Decide slide based on drag distance with low threshold
  if (isHorizontalDrag) {
    const dx = (e.clientX || 0) - startX
    const threshold = (viewport?.clientWidth || 0) * 0.06
    if (viewport) {
      if (dx <= -threshold) {
        next()
      } else if (dx >= threshold) {
        prev()
      }
    }
  }
  // Do not snap immediately here; let momentum finish and onScroll handler snap once
  isPointerDown = false
  isDragging = false
  isHorizontalDrag = false
}

function _snapToNearest() {
  const viewport = viewportRef.value
  const track = trackRef.value
  if (!viewport || !track) return
  const slideWidth = viewport.clientWidth
  const index = Math.max(
    0,
    Math.min(Math.round(viewport.scrollLeft / slideWidth), segmentsCount.value - 1),
  )
  // Let CSS scroll-snap finalize position; just reflect index
  currentIndex.value = index
}

function next(fromAutoplay = false) {
  const viewport = viewportRef.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const maxIndex = segmentsCount.value - 1
  const currentSlideIndex = Math.round(viewport.scrollLeft / slideWidth)
  const nextIndex = currentSlideIndex >= maxIndex ? 0 : currentSlideIndex + 1
  viewport.scrollTo({ left: nextIndex * slideWidth, behavior: 'auto' })
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
  viewport.scrollTo({ left: prevIndex * slideWidth, behavior: 'auto' })
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
    // Use requestIdleCallback/rAF to avoid layout thrash while scrolling
    const schedule = window.requestIdleCallback || window.requestAnimationFrame
    if (!scrollRaf) {
      scrollRaf = schedule(() => {
        updateCurrentIndexFromScroll()
        scrollRaf = null
      })
    }
    clearTimeout(scrollDebounce)
    scrollDebounce = setTimeout(() => {
      // Resume autoplay after user/momentum scroll finishes
      startAutoplay()
    }, 260)
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
