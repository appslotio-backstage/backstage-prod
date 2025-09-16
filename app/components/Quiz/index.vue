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

    <!-- Contact Modal (collect name and phone after quiz) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showContact" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeContact" />
          <div
            class="relative bg-card rounded-2xl border border-orange-500 p-6 md:p-8 max-w-[520px] w-full"
          >
            <h3 class="font-display text-2xl text-white mb-4 text-center">Оставьте контакты</h3>
            <p class="font-actay text-white/90 mb-6 text-center">
              Укажите имя и номер телефона, мы свяжемся с вами. Ваши ответы будут отправлены вместе
              с контактами.
            </p>
            <form class="space-y-4" @submit.prevent="submitContacts">
              <div>
                <input
                  v-model="contact.name"
                  type="text"
                  placeholder="Имя"
                  required
                  class="w-full px-5 py-4 rounded-full border border-gray-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 font-actay text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>
              <div>
                <input
                  v-model="contact.phone"
                  type="tel"
                  placeholder="Телефон"
                  required
                  class="w-full px-5 py-4 rounded-full border border-gray-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 font-actay text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>
              <div class="mt-2 flex justify-center">
                <UIButton type="submit" :disabled="submitting">
                  <span v-if="!submitting">Отправить</span>
                  <span v-else class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0A12 12 0 000 12h4z"
                      />
                    </svg>
                    Отправка...
                  </span>
                </UIButton>
              </div>
            </form>
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

// Contact modal state
const showContact = ref(false)
const submitting = ref(false)
const contact = reactive({ name: '', phone: '' })

// Apps Script Web App URL (replace with your deployed URL)
const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzpv04Mkiw5Q7Vm_07nG_MiWAn2ZaM7V79_fNBwhwQurRqhoh_OKoM2MX3fmGwUw2U/exec'

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
  // Показать контактную форму вместо мгновенного завершения
  showContact.value = true
}

function closeContact() {
  showContact.value = false
}

function buildAnswersPayload() {
  const result = []
  for (let i = 0; i < props.steps.length; i++) {
    const stepDef = props.steps[i]
    const value = answers[i]
    const label = stepDef.options.find((o) => o.value === value)?.label || ''
    result.push({ index: i + 1, question: stepDef.question, value, label })
  }
  return result
}

async function submitContacts() {
  if (!contact.name.trim() || !contact.phone.trim()) return
  submitting.value = true
  try {
    const payload = {
      timestamp: new Date().toISOString(),
      name: contact.name.trim(),
      phone: contact.phone.trim(),
      answers: buildAnswersPayload(),
    }
    const res = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      redirect: 'follow',
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to submit')
    // success UI
    showContact.value = false
    showSuccess.value = true
  } catch (e) {
    console.error(e)
    // можно добавить уведомление об ошибке
  } finally {
    submitting.value = false
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
