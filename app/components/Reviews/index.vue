<template>
  <section class="w-full relative">
    <h2
      class="mb-8 font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start"
    >
      Отзывы
    </h2>

    <div
      ref="viewportRef"
      class="relative overflow-x-auto no-scrollbar select-none"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <div ref="trackRef" class="flex snap-x snap-mandatory w-full gap-5">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="snap-start shrink-0"
          :style="{ width: calcWidth }"
        >
          <div class="space-y-9">
            <div class="rounded-[30px] overflow-hidden border border-[#F0651280]">
              <div class="w-full" style="aspect-ratio: 460 / 365">
                <img
                  :src="item.image"
                  alt=""
                  class="w-full h-full object-cover"
                  draggable="false"
                />
              </div>
            </div>
            <div class="max-w-[70%] mx-auto flex flex-col items-center gap-4">
              <h3 class="subtitle-badge">{{ item.name }}</h3>
              <p class="body-text" v-html="item.text" />
            </div>
          </div>
        </div>
      </div>
    </div>

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

const visible = ref(1)
const gapPx = 20
const calcWidth = computed(
  () => `calc((100% - ${(visible.value - 1) * gapPx}px) / ${visible.value})`,
)

const items = [
  {
    image: 'images/slider/1/1.png',
    name: 'Ирина Апостолова',
    text: 'Благодарю Вас за волшебную фотосессию! Это было чудесно, много эмоций и улыбок...<br/>💚 Спасибо Вам, что приехали в Москву, в тот день, когда я хотела, это ценно!',
  },
  {
    image: 'images/slider/1/2.png',
    name: 'Марк Фоткин',
    text: 'Спасибо за чудесные кадры и атмосферу. Фотографии получились именно такими, как мечтали!',
  },
  {
    image: 'images/slider/1/3.png',
    name: 'Митя Петров',
    text: 'Фотографы — волшебники. Тепло, нежно, искренне. Вернёмся ещё! ✨',
  },
  {
    image: 'images/slider/1/4.png',
    name: 'Алиса',
    text: 'Очень понравилась подготовка и помощь со стилем. Кадры — бомба! 🔥',
  },
  {
    image: 'images/slider/1/5.png',
    name: 'Кирилл',
    text: 'Понравилась работа со светом и минимум ретуши — всё естественно и стильно.',
  },
]

let isDragging = false
let startX = 0
let scrollStart = 0
let autoplayTimer = null
let scrollDebounce

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
      // ignore
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
  const step = getStep()
  const index = Math.round(viewport.scrollLeft / step)
  viewport.scrollTo({ left: index * step, behavior: 'smooth' })
}

function next() {
  const viewport = viewportRef.value
  const track = trackRef.value
  if (!viewport || !track) return
  const step = getStep()
  const max = track.scrollWidth - viewport.clientWidth
  let target = viewport.scrollLeft + step
  if (target > max - 1) target = 0
  viewport.scrollTo({ left: target, behavior: 'smooth' })
  resetAutoplay()
}

function prev() {
  const viewport = viewportRef.value
  const track = trackRef.value
  if (!viewport || !track) return
  const step = getStep()
  const max = track.scrollWidth - viewport.clientWidth
  let target = viewport.scrollLeft - step
  if (viewport.scrollLeft < step / 2) target = max
  viewport.scrollTo({ left: target, behavior: 'smooth' })
  resetAutoplay()
}

function getStep() {
  const viewport = viewportRef.value
  const track = trackRef.value
  if (!viewport || !track) return 0
  const first = track.children[0]
  const childWidth = first
    ? first.getBoundingClientRect().width
    : viewport.clientWidth / visible.value
  const styles = getComputedStyle(track)
  const gap = parseFloat(styles.columnGap || styles.gap || '0') || gapPx
  return childWidth + gap
}

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = setInterval(() => next(), 5000)
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function resetAutoplay() {
  stopAutoplay()
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
  const viewport = viewportRef.value
  if (!viewport) return
  const apply = () => {
    visible.value = window.matchMedia('(min-width: 768px)').matches ? 3 : 1
  }
  apply()
  window.addEventListener('resize', apply)
  const onScroll = () => {
    stopAutoplay()
    clearTimeout(scrollDebounce)
    scrollDebounce = setTimeout(() => {
      snapToNearest()
      startAutoplay()
    }, 120)
  }
  viewport.addEventListener('scroll', onScroll)
  onBeforeUnmount(() => {
    viewport.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', apply)
  })
})

onBeforeUnmount(() => stopAutoplay())
</script>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
