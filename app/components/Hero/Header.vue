<template>
  <header
    role="banner"
    :class="[
      'w-full py-3 px-4 sm:px-6 lg:px-8 z-50 fixed transition-all duration-300',
      scrolled ? 'bg-black/70 backdrop-blur-sm py-2' : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div
        class="font-inter font-semibold text-base sm:text-lg md:text-xl uppercase text-text transition-all hover:text-accent"
      >
        BACKSTAGE
      </div>

      <nav class="hidden md:flex items-center space-x-6 lg:space-x-8">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="relative h-[18px] flex items-center justify-center pb-[7px] font-actay font-light text-sm lg:text-base text-text hover:text-white transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="hidden md:flex flex-col items-end">
        <p class="font-actay font-light text-sm lg:text-base text-text">+7(000)000-00-00</p>
        <button
          class="font-actay font-light text-sm lg:text-base text-accent underline hover:no-underline transition-all cursor-pointer"
          @click="$emit('open-modal')"
        >
          Заказать звонок
        </button>
      </div>

      <div class="flex md:hidden items-center space-x-3 sm:space-x-4">
        <a href="tel:+70000000000" class="p-1 sm:p-2 hover:scale-110 transition-transform">
          <svg
            width="24"
            height="24"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 sm:w-7 sm:h-7 text-text"
          >
            <g clip-path="url(#clip0)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.00565 1.08585C4.37747 0.714584 4.82395 0.426582 5.31549 0.240924C5.80704 0.0552668 6.33243 -0.0238066 6.85684 0.00894436C7.38126 0.0416953 7.89273 0.185523 8.35736 0.430895C8.82198 0.676268 9.22916 1.01758 9.5519 1.43222L13.3663 6.33247C14.0654 7.23135 14.3119 8.40222 14.0356 9.50722L12.8733 14.161C12.8136 14.402 12.8171 14.6544 12.8833 14.8937C12.9496 15.1331 13.0764 15.3513 13.2515 15.5273L18.4726 20.7485C18.6489 20.924 18.8675 21.051 19.1072 21.1173C19.347 21.1835 19.5998 21.1868 19.8411 21.1267L24.4928 19.9643C25.0381 19.8288 25.6071 19.8186 26.157 19.9345C26.7069 20.0505 27.2233 20.2895 27.6675 20.6337L32.5678 24.446C34.3294 25.8166 34.4909 28.4197 32.9142 29.9943L30.7169 32.1916C29.1444 33.7641 26.7941 34.4547 24.6033 33.6833C18.9947 31.7126 13.9029 28.5021 9.70702 24.2908C5.49607 20.0956 2.28557 15.0045 0.314524 9.39672C-0.454726 7.20797 0.235899 4.8556 1.8084 3.2831L4.00565 1.08585Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="34" height="34" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </a>

        <button
          class="p-1 sm:p-2 hover:scale-110 transition-transform focus:outline-none"
          aria-label="Меню"
          @click="toggleMenu"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7 sm:w-9 sm:h-9 text-text"
          >
            <path
              d="M8.00001 36C7.43334 36 6.95867 35.808 6.57601 35.424C6.19334 35.04 6.00134 34.5653 6.00001 34C5.99867 33.4347 6.19067 32.96 6.57601 32.576C6.96134 32.192 7.43601 32 8.00001 32H40C40.5667 32 41.042 32.192 41.426 32.576C41.81 32.96 42.0013 33.4347 42 34C41.9987 34.5653 41.8067 35.0407 41.424 35.426C41.0413 35.8113 40.5667 36.0027 40 36H8.00001ZM8.00001 26C7.43334 26 6.95867 25.808 6.57601 25.424C6.19334 25.04 6.00134 24.5653 6.00001 24C5.99867 23.4347 6.19067 22.96 6.57601 22.576C6.96134 22.192 7.43601 22 8.00001 22H40C40.5667 22 41.042 22.192 41.426 22.576C41.81 22.96 42.0013 23.4347 42 24C41.9987 24.5653 41.8067 25.0407 41.424 25.426C41.0413 25.8113 40.5667 26.0027 40 26H8.00001ZM8.00001 16C7.43334 16 6.95867 15.808 6.57601 15.424C6.19334 15.04 6.00134 14.5653 6.00001 14C5.99867 13.4347 6.19067 12.96 6.57601 12.576C6.96134 12.192 7.43601 12 8.00001 12H40C40.5667 12 41.042 12.192 41.426 12.576C41.81 12.96 42.0013 13.4347 42 14C41.9987 14.5653 41.8067 15.0407 41.424 15.426C41.0413 15.8113 40.5667 16.0027 40 16H8.00001Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[400px] opacity-100"
      leave-from-class="max-h-[400px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-show="isMenuOpen" class="md:hidden overflow-hidden">
        <nav
          class="py-4 px-3 mx-2 bg-black/90 backdrop-blur-md rounded-lg mt-3 border border-gray-700/50"
        >
          <div class="flex flex-col space-y-1">
            <a
              v-for="item in navItems"
              :key="item.href"
              :href="item.href"
              class="font-actay font-light text-sm text-white py-3 px-4 rounded-lg hover:bg-[#F06512] transition-all duration-300 flex items-center border border-transparent hover:border-[#F06512]/30"
              @click="isMenuOpen = false"
            >
              {{ item.label }}
            </a>

            <div class="pt-4 mt-2 border-t border-gray-600/50">
              <p class="font-actay font-light text-sm text-white px-4 py-2 mb-2">
                +7(000)000-00-00
              </p>
              <button
                class="font-actay font-light text-sm text-[#F06512] px-4 py-3 rounded-lg hover:bg-[#F06512]/10 transition-all cursor-pointer w-full text-left border border-[#F06512]/30 hover:border-[#F06512]"
                @click="
                  () => {
                    isMenuOpen = false
                    $emit('open-modal')
                  }
                "
              >
                Заказать звонок
              </button>
            </div>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
defineEmits(['open-modal'])

const isMenuOpen = ref(false)
const scrolled = ref(false)

const navItems = [
  { label: 'Главная', href: '#hero' },
  { label: 'Услуги', href: '#services' },
  { label: 'Стили', href: '#styles' },
  { label: 'Прайс', href: '#pricing' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Отзывы', href: '#reviews' },
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function handleScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
