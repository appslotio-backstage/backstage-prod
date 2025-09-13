<template>
  <section class="w-full relative">
    <div>
      <h2
        class="mb-8 font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start"
      >
        Стоимость услуг
      </h2>
      <p class="body-text mx-auto mt-3 text-center">
        В стоимость входит организация вашей съемки «под ключ» <br />
        от выбора стиля до получения готовых фото и видео
      </p>
    </div>

    <div
      ref="viewportRef"
      class="relative overflow-x-auto no-scrollbar select-none pr-[60px] mt-4"
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
          v-for="(col, index) in flatColumns"
          :key="index"
          class="snap-start shrink-0 mr-5"
          :style="{ width: `calc(100% / ${visible})` }"
          :aria-label="`col-${index + 1}`"
        >
          <div class="bg-card rounded-[20px] p-4 h-full">
            <h3 class="mb-4 font-actayWide font-bold text-3xl text-text text-center">
              {{ col.title }}
            </h3>
            <div
              v-for="(item, ii) in col.items"
              :key="ii"
              class="rounded-[30px] border border-[#F0651280] p-6 mb-5 last:mb-0"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="w-full max-w-[80%]">
                  <p class="subtitle-badge h-10">{{ item.name }}</p>
                  <div
                    v-if="item.desc"
                    class="mt-4 text-[14px] text-subtext leading-tight whitespace-pre-line"
                  >
                    {{ item.desc }}
                  </div>
                </div>
                <p class="font-actayWide font-bold text-xl text-text whitespace-nowrap self-center">
                  {{ item.price }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- arrows under slider -->
    <div class="w-full mt-6 flex items-center justify-center gap-6">
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

const visible = 2.5 // сколько колонок видно одновременно

const slides = ref([
  {
    columns: [
      {
        title: 'Фото',
        items: [
          {
            name: 'Индивидуальная фотосессия',
            desc: '1 час съёмки\n20 обработанных фото',
            price: 'ОТ 5000 ₽',
          },
          {
            name: 'Семейная фотосессия',
            desc: '2 часа съёмки\n40 обработанных фото',
            price: 'ОТ 5000 ₽',
          },
          { name: 'Услуга 3', desc: 'Описание\nОписание', price: 'ОТ 6000 ₽' },
        ],
      },
      {
        title: 'Видео',
        items: [
          {
            name: 'Индивидуальная видеосъемка',
            desc: '1 час съёмки\n20 обработанных видео',
            price: 'ОТ XXXX ₽',
          },
          {
            name: 'Семейная съёмка',
            desc: '2 часа съёмки\n40 обработанных видео',
            price: 'ОТ XXXX ₽',
          },
          { name: 'Услуга 3', desc: 'Описание\nОписание', price: 'ОТ XXXX ₽' },
        ],
      },
      {
        title: 'Доп. услуги',
        items: [
          { name: 'Визажист', desc: 'Описание\nОписание', price: 'ОТ XXXX ₽' },
          { name: 'Визажист', desc: 'Описание\nОписание', price: 'ОТ XXXX ₽' },
          { name: 'Визажист', desc: 'Описание\nОписание', price: 'ОТ XXXX ₽' },
        ],
      },
    ],
  },
  {
    columns: [
      {
        title: 'Фото',
        items: [
          { name: 'Съёмка мероприятия', desc: '3 часа\n50+ фото', price: 'ОТ 9000 ₽' },
          { name: 'Контент-день', desc: '3 локации\n30 фото', price: 'ОТ 7000 ₽' },
        ],
      },
      {
        title: 'Видео',
        items: [
          { name: 'Рилс/Shorts', desc: 'до 60 сек\nмонтаж', price: 'ОТ 4000 ₽' },
          { name: 'Рекламный ролик', desc: 'концепт\nсъёмка\nмонтаж', price: 'ОТ XXXX ₽' },
        ],
      },
      {
        title: 'Доп. услуги',
        items: [
          { name: 'Ретушь доп. фото', desc: '1 фото', price: 'ОТ 200 ₽' },
          { name: 'МUAH', desc: 'По запросу', price: 'ОТ XXXX ₽' },
        ],
      },
    ],
  },
])

const flatColumns = computed(() => slides.value.flatMap((s) => s.columns))

let isDragging = false
let startX = 0
let scrollStart = 0

function onPointerDown(e) {
  const viewport = viewportRef.value
  if (!viewport) return
  isDragging = true
  startX = e.clientX
  scrollStart = viewport.scrollLeft
  viewport.setPointerCapture(e.pointerId)
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
}

function snapToNearest() {
  const viewport = viewportRef.value
  if (!viewport) return
  const slideWidth = viewport.clientWidth
  const index = Math.round(viewport.scrollLeft / slideWidth)
  viewport.scrollTo({ left: index * slideWidth, behavior: 'smooth' })
}

function next() {
  const viewport = viewportRef.value
  if (!viewport) return
  const step = viewport.clientWidth / visible
  viewport.scrollTo({ left: viewport.scrollLeft + step, behavior: 'smooth' })
}

function prev() {
  const viewport = viewportRef.value
  if (!viewport) return
  const step = viewport.clientWidth / visible
  viewport.scrollTo({ left: viewport.scrollLeft - step, behavior: 'smooth' })
}

function pauseAutoplay() {}
function resumeAutoplay() {}
</script>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
