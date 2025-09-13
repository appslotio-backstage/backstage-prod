<template>
  <section class="w-full">
    <h2
      class="mb-8 font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start"
    >
      Мы можем
    </h2>
    <div class="mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        <div
          v-for="(item, i) in items"
          :key="`card-${i}`"
          class="relative overflow-hidden rounded-[30px] bg-card mx-auto w-full"
          :class="[
            i < 3 ? 'lg:col-span-4' : '',
            i === 3 ? 'lg:col-span-4 lg:col-start-3' : '',
            i === 4 ? 'lg:col-span-4 lg:col-start-7' : '',
          ]"
          style="aspect-ratio: 460 / 365; max-width: 460px"
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
    <UIButton class="mx-auto mt-8">Полный печерень услуг</UIButton>
  </section>
</template>

<script setup>
const items = [
  { src: 'images/products/1.png', title: 'Провести индивидуальную или групповую фотосъемку' },
  { src: 'images/products/2.png', title: 'Подобрать идеальный образ для фотосессий' },
  { src: 'images/products/3.png', title: 'Подобрать локацию для съемок' },
  { src: 'images/products/4.png', title: 'Организовать видеосъемку с возможностью создания Reels' },
  { src: 'images/products/5.png', title: 'Профессионально обработать ваши фото и видео' },
]
</script>
