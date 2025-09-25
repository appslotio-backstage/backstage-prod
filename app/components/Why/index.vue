/* eslint-disable */
<!-- eslint-disable linebreak-style -->
<template>
  <div id="why" class="w-full flex flex-col items-center">
    <h2
      class="font-gilroy font-semibold text-3xl leading-none tracking-normal text-text self-start md:hidden"
    >
      Почему <span class="text-accent">стоит доверить</span> организацию
      <span class="text-accent">Backstage</span>
    </h2>
    <h2
      class="font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start hidden md:block"
    >
      Почему <span class="text-accent">стоит доверить</span> <br />
      организацию <span class="text-accent">Backstage</span>
    </h2>
    <p class="body-text mx-auto mt-3 text-center">
      Мы создаем не просто фотосессии, а уникальные истории, <br class="hidden lg:block" />
      где каждая деталь отражает вашу индивидуальность
    </p>

    <!-- Desktop stacked cards -->
    <div class="relative mt-8 hidden md:flex w-full justify-center">
      <div
        class="relative"
        :style="{ width: containerWidth + 'px', height: containerHeight + 'px' }"
      >
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          class="group absolute left-1/2 -translate-x-1/2 rounded-[20px] overflow-hidden border border-accent/40 shadow-[0_8px_30px_rgba(0,0,0,0.3)] cursor-pointer"
          :style="cardStyle(index)"
          @mouseenter="hovered = index"
        >
          <div class="absolute inset-0">
            <img
              :src="card.image"
              :alt="card.title"
              class="w-full h-full object-cover"
              :style="{ filter: `blur(${imageBlur(index)}px)` }"
            />
            <div
              class="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"
            ></div>
          </div>

          <div class="relative z-10 h-full w-full flex" :style="contentStyle(index)">
            <div :class="textBoxClass(index)" :style="textBoxStyle(index)">
              <div class="drop-shadow" :style="titleStyle" v-html="card.title"></div>
              <div
                class="drop-shadow opacity-90 max-w-[520px]"
                :style="subtitleStyle"
                v-html="card.subtitle"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile: simple vertical list without overlap -->
    <div class="mt-7 grid grid-cols-1 gap-4 w-full md:hidden">
      <div
        v-for="card in cards"
        :key="'m-' + card.id"
        class="rounded-[15px] overflow-hidden border border-accent/40"
      >
        <div class="relative h-44">
          <img
            :src="card.image"
            :alt="card.title"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black/40"></div>
          <div class="relative z-10 h-full w-full flex items-end p-5 text-white">
            <div>
              <div class="font-gilroy text-xl font-semibold">{{ card.title }}</div>
              <div class="opacity-90 text-sm mt-1" v-html="card.subtitle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// Placeholder data (images from project). Replace texts/images later.
const cards = ref([
  {
    id: 1,
    title: 'Все под ключ',
    subtitle: 'От подбора локации <br> до обработки фото',
    image: '/images/why/1.png',
  },
  {
    id: 2,
    title: 'Индивидуальный подход <br> к каждому клиенту',
    subtitle: 'Создаем атмосферу, где <br> вы чувствуете себя собой',
    image: '/images/why/2.png',
  },
  {
    id: 3,
    title: 'Идеальные кадры',
    subtitle: 'Лучшее качество <br> обработки и ретуши ',
    image: '/images/why/3.png',
  },
  {
    id: 4,
    title: 'Команда профи',
    subtitle: 'Самые лучшие <br> мастера города',
    image: '/images/why/4.png',
  },
  {
    id: 5,
    title: 'Внимание к деталям',
    subtitle: 'Реализуем любой стиль <br> и идею',
    image: '/images/why/5.png',
  },
  {
    id: 6,
    title: 'Забота о клиентах',
    subtitle: 'Приятные мелочи <br> складываются в большой результат',
    image: '/images/why/6.png',
  },
])

// Focused card index
const hovered = ref(0)

// Base sizes for the focused card and steps per distance
const maxWidth = 1420
const maxHeight = 209
const stepWidth = 56
const stepHeight = 8.4

// Vertical offsets to create the cascade. Later cards sit lower.
const baseTop = 0
const stepTop = maxHeight - 30 // overlap ~30px between rows

// Container width must accommodate the largest card
const containerWidth = computed(() => maxWidth)
const containerHeight = computed(() => baseTop + (cards.value.length - 1) * stepTop + maxHeight)

function dimensionByDistance(distance) {
  const width = Math.max(1136, Math.round(maxWidth - distance * stepWidth))
  const height = Math.max(167, Math.round(maxHeight - distance * stepHeight))
  return { width, height }
}

function imageBlur(index) {
  const distance = Math.abs(index - hovered.value)
  if (distance === 0) return 0
  if (distance === 1) return 2.25
  if (distance === 2) return 2.4
  return 2.5
}

function cardStyle(index) {
  const distance = Math.abs(index - hovered.value)
  const { width, height } = dimensionByDistance(distance)
  const top = baseTop + index * stepTop
  const distanceForZ = Math.abs(index - hovered.value)
  const z = 1000 - distanceForZ * 10

  return {
    width: width + 'px',
    height: height + 'px',
    top: top + 'px',
    transition:
      'width 300ms ease, height 300ms ease, filter 300ms ease, transform 300ms ease, box-shadow 300ms ease, padding 300ms ease',
    zIndex: z,
  }
}

// Dynamic inner paddings and text styles

const titleStyle = {
  color: '#D4D4D4',
  fontFamily: 'Actay Wide, sans-serif',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: 'normal',
}

const subtitleStyle = {
  marginTop: '9px',
  color: '#D4D4D4',
  fontFamily: 'Actay, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 'normal',
}

function contentStyle(index) {
  const _distance = Math.abs(index - hovered.value)
  return {
    filter: `blur(${imageBlur(index)}px)`,
  }
}

function textBoxClass(index) {
  // even index (0-based) -> left/top, odd -> right/bottom
  const horizontal = index % 2 === 0 ? 'text-left' : 'text-right ml-auto'
  return horizontal
}

function textBoxStyle(index) {
  const isEven = index % 2 === 0
  return {
    alignSelf: isEven ? 'flex-start' : 'flex-end',
    paddingLeft: isEven ? '20px' : undefined,
    paddingTop: isEven ? '20px' : undefined,
    paddingRight: !isEven ? '20px' : undefined,
    paddingBottom: !isEven ? '20px' : undefined,
  }
}
</script>

<style scoped>
.drop-shadow {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
}
</style>
