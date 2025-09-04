<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isOpen"
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            @click="handleClose"
          />
        </Transition>

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isOpen"
            class="relative w-full max-w-[90vw] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] mx-auto"
          >
            <div
              class="relative bg-card rounded-2xl border border-orange-500 p-4 sm:p-6 md:p-8 pt-10 sm:pt-12 md:pt-16 pb-4 sm:pb-6 md:pb-8 overflow-hidden"
            >
              <div class="absolute inset-0 opacity-50">
                <img src="/images/rew.png" alt="" class="w-full h-full object-cover" />
              </div>

              <div class="absolute -left-32 -top-4 opacity-50">
                <svg
                  width="350"
                  height="200"
                  viewBox="0 0 350 200"
                  fill="none"
                  class="transform rotate-90"
                >
                  <path
                    d="M300 -28C200 20 100 150 150 180C220 220 240 160 180 150C140 145 50 170 0 250"
                    stroke="#F06512"
                    :stroke-opacity="0.5"
                    stroke-width="3"
                    stroke-dasharray="10 10"
                  />
                </svg>
              </div>

              <button
                @click="handleClose"
                class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-orange-500 transition-colors z-10"
                aria-label="Закрыть"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="sm:w-6 sm:h-6"
                >
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>

              <div class="relative z-10">
                <h2
                  class="font-display text-xl sm:text-2xl md:text-[32px] font-semibold text-white leading-none mb-3 sm:mb-4 md:mb-6"
                >
                  Свяжитесь с нами
                </h2>

                <p
                  class="font-actay text-sm sm:text-base md:text-xl text-white leading-tight mb-4 sm:mb-6 md:mb-8 max-w-[280px] sm:max-w-[320px] md:max-w-[380px]"
                >
                  Оставьте свои контакты и мы свяжемся с вами для уточнения деталей съемки
                </p>

                <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-5">
                  <div class="relative">
                    <input
                      type="text"
                      v-model="formData.name"
                      placeholder="Имя"
                      required
                      class="w-full px-4 py-3 sm:px-5 sm:py-5 rounded-full border border-gray-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 font-actay text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    />
                  </div>

                  <div class="relative">
                    <input
                      type="tel"
                      v-model="formData.phone"
                      placeholder="Телефон"
                      required
                      class="w-full px-4 py-3 sm:px-5 sm:py-5 rounded-full border border-gray-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 font-actay text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full mt-6 sm:mt-8 px-6 py-4 sm:px-10 sm:py-5 bg-accent text-white font-actay text-sm sm:text-base font-normal rounded-full hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg transform hover:scale-105 disabled:transform-none"
                  >
                    <span v-if="!isSubmitting">Заказать съемку</span>
                    <span v-else class="flex items-center justify-center">
                      <svg
                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Отправка...
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>

  <!-- Success Notification -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div v-if="showSuccessNotification" class="fixed top-4 right-4 z-[60] max-w-sm">
        <div
          class="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg border border-green-400 flex items-start space-x-3"
        >
          <svg
            class="w-6 h-6 text-green-100 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <div class="flex-1">
            <p class="font-medium font-actay">Заявка отправлена!</p>
            <p class="text-sm text-green-100 font-actay mt-1">
              Мы свяжемся с вами в ближайшее время
            </p>
          </div>
          <button
            @click="showSuccessNotification = false"
            class="text-green-100 hover:text-white ml-2 flex-shrink-0"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref } from 'vue'

defineProps({
  isOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const formData = reactive({ name: '', phone: '' })
const isSubmitting = ref(false)
const showSuccessNotification = ref(false)

function handleClose() {
  emit('close')
}

async function handleSubmit() {
  if (!formData.name.trim() || !formData.phone.trim()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // eslint-disable-next-line no-console
    console.log('Form submitted:', { ...formData })

    // Reset form
    formData.name = ''
    formData.phone = ''

    // Close modal
    emit('close')

    // Show success notification after a short delay
    setTimeout(() => {
      showSuccessNotification.value = true

      // Auto hide notification after 5 seconds
      setTimeout(() => {
        showSuccessNotification.value = false
      }, 5000)
    }, 300)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
