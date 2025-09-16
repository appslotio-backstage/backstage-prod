<template>
  <section class="w-full relative">
    <div class="flex flex-col items-center">
      <h2
        v-if="withHeading"
        class="font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start"
      >
        Закажите свою фотосессию
      </h2>
      <p class="body-text mx-auto mt-3 text-center">
        Оставьте свои контакты и мы свяжемся с вами <br />
        для уточнения деталей съемки
      </p>
      <UIButton class="mt-8" @click="isOpen = true">Заказать съемку</UIButton>
    </div>

    <!-- Contact Modal (reuse header modal styles/logic) -->
    <Teleport to="body">
      <HeroContactModal
        :is-open="isOpen"
        sheet-name="LeadsOrder"
        apps-script-url="https://script.google.com/macros/s/AKfycbzpv04Mkiw5Q7Vm_07nG_MiWAn2ZaM7V79_fNBwhwQurRqhoh_OKoM2MX3fmGwUw2U/exec"
        @close="isOpen = false"
      />
    </Teleport>
  </section>
</template>

<script setup>
import HeroContactModal from '@/components/Hero/ContactModal.vue'

const isOpen = ref(false)
defineProps({
  withHeading: {
    type: Boolean,
    default: true,
  },
})
</script>
