<template>
  <section class="w-full">
    <h2
      class="font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start mb-9"
    >
      Ответьте на вопросы и получите скидку <span class="text-accent">10%</span> <br />
      на организацию фотосессии «под ключ»
    </h2>
    <div class="bg-card/80 border border-[#F0651280] rounded-[30px] p-7 backdrop-blur-[12px]">
      <Transition name="fade-slide" mode="out-in">
        <div :key="step" class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <!-- Image -->
          <div class="rounded-[25px] overflow-hidden">
            <div class="w-full" style="aspect-ratio: 670 / 370">
              <img :src="current.image" alt="" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Questions -->
          <div class="flex flex-col h-full">
            <h3 class="subtitle-badge mb-9 max-w-[350px]">{{ current.question }}</h3>
            <div class="flex-1 space-y-4">
              <UIBaseRadio
                v-for="(opt, idx) in current.options"
                :key="opt.value"
                :name="`q-${step}`"
                :value="opt.value"
                :checked="answers[step] === opt.value || (!answers[step] && idx === 0)"
                @update:model-value="(val) => selectAnswer(val)"
              >
                {{ opt.label }}
              </UIBaseRadio>
            </div>

            <div class="mt-6 flex justify-end">
              <UIButton :disabled="busy" variant="fit" @click="next">
                <span class="inline-flex items-center gap-[10px]">
                  <span>{{ isLast ? 'Отправить' : 'Далее' }}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.195 13.83L15 8.99998L10.195 4.16998"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3 9H15"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
              </UIButton>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Success Modal using ContactModal styles -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showSuccess = false" />
          <div
            class="relative bg-card rounded-2xl border border-orange-500 p-6 md:p-8 max-w-[520px] w-full text-center"
          >
            <h3 class="font-display text-2xl text-white mb-4">Спасибо!</h3>
            <p class="font-actay text-white/90 mb-6">
              Мы получили ваши ответы и скоро свяжемся с вами.
            </p>
            <UIButton @click="showSuccess = false">Закрыть</UIButton>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
const props = defineProps({
  steps: {
    type: Array,
    default: () => [
      {
        image: '/images/style/1.png',
        question: 'Какой стиль фотосессий вам интересен?',
        options: [
          { label: 'Love story', value: 'love' },
          { label: 'Семейная', value: 'family' },
          { label: 'Деловая', value: 'business' },
          { label: 'Fashion', value: 'fashion' },
        ],
      },
      {
        image: '/images/style/2.png',
        question: 'Где хотите провести съемку?',
        options: [
          { label: 'Студия', value: 'studio' },
          { label: 'Улица', value: 'outdoor' },
          { label: 'Дом/офис', value: 'home' },
        ],
      },
      {
        image: '/images/style/3.png',
        question: 'Когда планируете съемку?',
        options: [
          { label: 'В ближайшую неделю', value: 'soon' },
          { label: 'В этом месяце', value: 'month' },
          { label: 'Позже', value: 'later' },
        ],
      },
    ],
  },
})

const step = ref(0)
const busy = ref(false)
const showSuccess = ref(false)
const answers = reactive({})

const isLast = computed(() => step.value === props.steps.length - 1)
const current = computed(() => props.steps[step.value])

function selectAnswer(val) {
  answers[step.value] = val
}

async function next() {
  // Автосет первого варианта, если ничего не выбрано
  if (!answers[step.value]) {
    const first = current.value.options[0]?.value
    answers[step.value] = first
  }

  if (!isLast.value) {
    step.value += 1
    return
  }

  // submit
  busy.value = true
  try {
    // эмуляция отправки
    await new Promise((r) => setTimeout(r, 800))
    showSuccess.value = true
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 300ms ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
