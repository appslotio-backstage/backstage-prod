<template>
  <section class="w-full relative">
    <h2
      class="mb-8 font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start"
    >
      Выберите свой стиль
    </h2>
    <!-- Mobile: one-card slider with arrows; no autoplay -->
    <ClientOnly>
      <div class="md:hidden">
        <div
          ref="viewportRefM"
          class="relative overflow-x-auto no-scrollbar select-none snap-x snap-mandatory"
        >
          <div ref="trackRefM" class="flex w-full">
            <div
              v-for="(item, i) in items"
              :key="`style-m-${i}`"
              class="snap-center snap-always shrink-0 w-full px-4"
              :aria-label="item.alt || item.title"
            >
              <div
                class="relative overflow-hidden rounded-[30px] bg-card mx-auto w-full"
                style="aspect-ratio: 343 / 300; max-width: 460px"
                @pointerdown.stop
                @click="openDetails(item)"
              >
                <div
                  class="absolute inset-0 bg-center bg-cover"
                  :style="{ backgroundImage: `url(${item.src})` }"
                />
                <div class="absolute inset-0 bg-black/25" />

                <div class="absolute left-0 right-0 bottom-0 px-5 py-4">
                  <h3 class="max-w-[80%] subtitle-badge">{{ item.title }}</h3>
                  <p
                    class="flex items-center gap-1 mt-2 font-actay font-normal text-sm text-text leading-tight"
                  >
                    {{ item.subtitle }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full mt-4 flex items-center justify-center gap-10">
          <button
            class="rounded-full w-8 h-8 text-text/60 hover:text-text transition-colors flex items-center justify-center"
            aria-label="Previous slide"
            @click="prevM"
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
            @click="nextM"
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
    </ClientOnly>

    <!-- Desktop/Tablet: original 3-cards grid slider -->
    <div
      ref="viewportRef"
      class="relative overflow-x-auto no-scrollbar select-none hidden md:block"
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
          class="snap-center shrink-0 w-full px-6 lg:px-8"
          :aria-label="`slide-${index + 1}`"
        >
          <div class="mx-auto max-w-[1420px]">
            <div class="grid grid-cols-3 gap-5">
              <div
                v-for="(item, i) in slide"
                :key="`card-${index}-${i}`"
                class="relative overflow-hidden rounded-[30px] bg-card"
                style="aspect-ratio: 460 / 365"
                :aria-label="item.alt || item.title"
                @pointerdown.stop
                @click="openDetails(item)"
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
    <!-- Bottom arrows (outside of slider) - hidden on mobile -->
    <div class="w-full mt-8 hidden md:flex items-center justify-center gap-6">
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
          <div class="relative w-[694px] rounded-[30px] border border-[#F0651280] overflow-hidden">
            <div
              class="absolute inset-0 bg-center bg-cover"
              :style="{ backgroundImage: `url(${detailsItem.src})` }"
            />
            <div class="absolute inset-0 bg-black/60" />
            <div class="relative z-10 p-6 md:p-8 text-white flex flex-col">
              <h3 class="font-actayWide font-bold text-[28px] leading-tight">
                {{ detailsItem.title }}
              </h3>
              <p
                v-if="detailsItem.description"
                class="mt-3 font-actay text-[16px] leading-snug text-white/90"
              >
                {{ detailsItem.description }}
              </p>
              <div v-if="detailsItem.includes?.length" class="mt-4">
                <p class="font-actayWide text-[16px] mb-2">Что входит:</p>
                <ul class="space-y-1 text-[14px]">
                  <li
                    v-for="(inc, idx) in detailsItem.includes"
                    :key="idx"
                    class="flex items-start gap-2"
                  >
                    <span class="mt-[6px] inline-block w-1.5 h-1.5 rounded-full bg-white/80" />
                    <span class="font-actay text-white/90">{{ inc }}</span>
                  </li>
                </ul>
              </div>
              <div class="mt-8 flex justify-center">
                <UIButton @click="contactOpen = true">Заказать съемку</UIButton>
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
        sheet-name="LeadsSelectStyle"
        apps-script-url="https://script.google.com/macros/s/AKfycbzpv04Mkiw5Q7Vm_07nG_MiWAn2ZaM7V79_fNBwhwQurRqhoh_OKoM2MX3fmGwUw2U/exec"
        @close="onContactClosed"
      />
    </Teleport>
  </section>
</template>

<script setup>
import HeroContactModal from '@/components/Hero/ContactModal.vue'

const viewportRefM = ref(null)
const trackRefM = ref(null)

const viewportRef = ref(null)
const trackRef = ref(null)

const stylesData = await useStyles()
const items = computed(() => {
  const dataRoot = stylesData?.value?.meta || stylesData?.value || {}
  const arrayItems = Array.isArray(dataRoot?.items) ? dataRoot.items : []
  const blockKeys = Array.from({ length: 10 }, (_, i) => `item${i + 1}`)
  const blockItems = blockKeys
    .map((key) => dataRoot?.[key])
    .filter((v) => v && typeof v === 'object')

  const source = arrayItems.length ? arrayItems : blockItems

  return source
    .map((it) => ({
      src: it?.src || '',
      alt: it?.alt || it?.title || '',
      title: it?.title || '',
      subtitle: it?.subtitle || '',
      description: it?.description || it?.subtitle || '',
      includes: [
        it?.includes1,
        it?.includes2,
        it?.includes3,
        it?.includes4,
        it?.includes5,
        it?.includes6,
      ].filter((s) => !!(s && String(s).trim())),
    }))
    .filter((it) => it.src || it.title || it.subtitle || it.alt)
})

const slides = computed(() => {
  const chunked = []
  const source = items.value || []
  for (let i = 0; i < source.length; i += 3) {
    chunked.push(source.slice(i, i + 3))
  }
  return chunked
})

// Mobile-only navigation (no autoplay)
function snapToNearestM() {
  const viewport = viewportRefM.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const index = Math.max(
    0,
    Math.min(Math.round(viewport.scrollLeft / slideWidth), (items.value?.length || 0) - 1),
  )
  const targetLeft = index * slideWidth
  if (Math.abs(viewport.scrollLeft - targetLeft) > 1) {
    const prevSnapType = viewport.style.scrollSnapType
    viewport.style.scrollSnapType = 'none'
    viewport.scrollTo({ left: targetLeft, behavior: 'auto' })
    requestAnimationFrame(() => {
      viewport.style.scrollSnapType = prevSnapType || ''
    })
  }
}

function nextM() {
  const viewport = viewportRefM.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const idx = Math.round(viewport.scrollLeft / slideWidth)
  const nextIndex = Math.min(idx + 1, (items.value?.length || 0) - 1)
  viewport.scrollTo({ left: nextIndex * slideWidth, behavior: 'smooth' })
}

function prevM() {
  const viewport = viewportRefM.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const idx = Math.round(viewport.scrollLeft / slideWidth)
  const prevIndex = Math.max(idx - 1, 0)
  viewport.scrollTo({ left: prevIndex * slideWidth, behavior: 'smooth' })
}

onMounted(() => {
  const viewport = viewportRefM.value
  if (!viewport) return
  let scrollDebounce
  const onScroll = () => {
    clearTimeout(scrollDebounce)
    scrollDebounce = setTimeout(() => {
      snapToNearestM()
    }, 120)
  }
  viewport.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => {
    viewport.removeEventListener('scroll', onScroll)
  })
})

// Details modal state
const showDetails = ref(false)
const detailsItem = ref({ src: '', title: '', description: '', includes: [] })
function openDetails(item) {
  detailsItem.value = item
  showDetails.value = true
}

// Contact modal
const contactOpen = ref(false)
function onContactClosed() {
  contactOpen.value = false
  showDetails.value = false
}

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
