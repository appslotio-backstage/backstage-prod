<template>
  <section class="w-full">
    <h2
      class="mb-8 font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start"
    >
      {{ productsData?.meta?.body?.title || 'Мы можем' }}
    </h2>
    <!-- Mobile slider -->
    <ClientOnly>
      <div class="md:hidden">
        <div ref="viewportRef" class="relative overflow-x-auto select-none snap-x snap-mandatory">
          <div ref="trackRef" class="flex w-full">
            <div
              v-for="(item, i) in displayedItems"
              :key="`card-m-${i}`"
              class="snap-center snap-always shrink-0 w-full"
            >
              <div
                class="relative overflow-hidden rounded-[30px] bg-card mx-auto w-full"
                style="aspect-ratio: 343 / 300; max-width: 460px"
              >
                <div
                  class="absolute inset-0 bg-center bg-cover"
                  :style="{ backgroundImage: `url(${item.src})` }"
                />
                <div class="absolute inset-0 bg-black/25" />

                <div class="absolute left-0 right-0 bottom-0 px-5 py-4">
                  <h3 class="max-w-[80%] subtitle-badge">
                    {{ item.title }}
                  </h3>
                  <p
                    class="flex items-center gap-1 mt-3 font-actay font-normal text-sm text-text leading-tight hover:text-white/70 cursor-pointer transition-all"
                  >
                    Подробнее
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="mt-[2px]"
                    >
                      <path
                        d="M10.195 13.83L15 8.99998L10.195 4.16998C10.1516 4.11299 10.0965 4.066 10.0333 4.03217C9.9702 3.99834 9.90053 3.97848 9.82904 3.97391C9.75756 3.96935 9.68593 3.98021 9.61901 4.00573C9.55208 4.03126 9.49142 4.07087 9.44114 4.12188C9.39085 4.17289 9.35211 4.23411 9.32754 4.30139C9.30297 4.36867 9.29315 4.44045 9.29873 4.51186C9.30431 4.58327 9.32517 4.65265 9.35989 4.7153C9.39462 4.77795 9.4424 4.8324 9.5 4.87498L13.095 8.49998L3.53 8.49998C3.39739 8.49998 3.27021 8.55266 3.17645 8.64643C3.08268 8.74019 3.03 8.86737 3.03 8.99998C3.03 9.13259 3.08268 9.25977 3.17645 9.35353C3.27021 9.4473 3.39739 9.49998 3.53 9.49998L13.095 9.49998L9.5 13.125C9.40651 13.2191 9.35425 13.3466 9.35472 13.4792C9.35519 13.6119 9.40835 13.739 9.5025 13.8325C9.59665 13.926 9.72409 13.9782 9.85677 13.9778C9.98945 13.9773 10.1165 13.9241 10.21 13.83L10.195 13.83Z"
                        fill="currentColor"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- mobile arrows -->
        <div class="w-full mt-4 flex items-center justify-center gap-10">
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
      </div>
    </ClientOnly>

    <div class="mx-auto hidden md:block">
      <div class="flex flex-wrap justify-center gap-5">
        <div
          v-for="(item, i) in displayedItems"
          :key="`card-${i}`"
          class="relative overflow-hidden rounded-[30px] bg-card w-full md:basis-[calc(50%-20px)] lg:basis-[calc(33.333%-20px)] max-w-[460px] cursor-pointer"
          style="aspect-ratio: 460 / 365"
          :aria-label="item.alt || item.title"
          @click="openDetails(item)"
        >
          <div
            class="absolute inset-0 bg-center bg-cover"
            :style="{ backgroundImage: `url(${item.src})` }"
          />
          <div class="absolute inset-0 bg-black/25" />

          <div class="absolute left-0 right-0 bottom-0 px-5 py-4">
            <h3 class="max-w-[70%] subtitle-badge">
              {{ item.title }}
            </h3>
            <p
              class="flex items-center gap-1 mt-3 font-actay font-normal text-sm text-text leading-tight hover:text-white/70 cursor-pointer transition-all"
            >
              Подробнее
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mt-[2px]"
              >
                <path
                  d="M10.195 13.83L15 8.99998L10.195 4.16998C10.1516 4.11299 10.0965 4.066 10.0333 4.03217C9.9702 3.99834 9.90053 3.97848 9.82904 3.97391C9.75756 3.96935 9.68593 3.98021 9.61901 4.00573C9.55208 4.03126 9.49142 4.07087 9.44114 4.12188C9.39085 4.17289 9.35211 4.23411 9.32754 4.30139C9.30297 4.36867 9.29315 4.44045 9.29873 4.51186C9.30431 4.58327 9.32517 4.65265 9.35989 4.7153C9.39462 4.77795 9.4424 4.8324 9.5 4.87498L13.095 8.49998L3.53 8.49998C3.39739 8.49998 3.27021 8.55266 3.17645 8.64643C3.08268 8.74019 3.03 8.86737 3.03 8.99998C3.03 9.13259 3.08268 9.25977 3.17645 9.35353C3.27021 9.4473 3.39739 9.49998 3.53 9.49998L13.095 9.49998L9.5 13.125C9.40651 13.2191 9.35425 13.3466 9.35472 13.4792C9.35519 13.6119 9.40835 13.739 9.5025 13.8325C9.59665 13.926 9.72409 13.9782 9.85677 13.9778C9.98945 13.9773 10.1165 13.9241 10.21 13.83L10.195 13.83Z"
                  fill="currentColor"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
    <UIButton v-if="items.length > 5" class="mx-auto mt-8 !block" @click="toggleShowAll">
      {{ showAll ? 'Скрыть' : 'Показать ещё' }}
    </UIButton>

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
        sheet-name="LeadsProducts"
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

const productsData = (await useProducts())?.value?.meta || {}

const items = computed(() => {
  const keys = Array.from({ length: 11 }, (_, i) => `item${i + 1}`)
  return keys
    .map((k) => productsData?.[k])
    .filter((v) => v && typeof v === 'object')
    .map((it) => ({
      src: it?.src || '',
      title: it?.title || '',
      description: it?.description || '',
      includes: [
        it?.includes1,
        it?.includes2,
        it?.includes3,
        it?.includes4,
        it?.includes5,
        it?.includes6,
      ].filter((s) => !!(s && String(s).trim())),
    }))
    .filter((it) => it.src || it.title)
})

const showAll = ref(false)
const displayedItems = computed(() => (showAll.value ? items.value : items.value.slice(0, 5)))
function toggleShowAll() {
  showAll.value = !showAll.value
}

const currentIndex = ref(0)

function snapToNearest() {
  const viewport = viewportRef.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const index = Math.max(
    0,
    Math.min(Math.round(viewport.scrollLeft / slideWidth), (displayedItems.value?.length || 0) - 1),
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
  currentIndex.value = index
}

function next() {
  const viewport = viewportRef.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const idx = Math.round(viewport.scrollLeft / slideWidth)
  const nextIndex = Math.min(idx + 1, (displayedItems.value?.length || 0) - 1)
  viewport.scrollTo({ left: nextIndex * slideWidth, behavior: 'smooth' })
  currentIndex.value = nextIndex
}

function prev() {
  const viewport = viewportRef.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const idx = Math.round(viewport.scrollLeft / slideWidth)
  const prevIndex = Math.max(idx - 1, 0)
  viewport.scrollTo({ left: prevIndex * slideWidth, behavior: 'smooth' })
  currentIndex.value = prevIndex
}

onMounted(() => {
  const viewport = viewportRef.value
  if (!viewport) return
  let scrollDebounce
  const onScroll = () => {
    clearTimeout(scrollDebounce)
    scrollDebounce = setTimeout(() => {
      snapToNearest()
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
// Contact modal reuse
const contactOpen = ref(false)
function onContactClosed() {
  contactOpen.value = false
  showDetails.value = false
}
</script>

<!-- Contact Modal reuse -->
<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
