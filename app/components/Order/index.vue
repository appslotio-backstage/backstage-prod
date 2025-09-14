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
      <UIButton class="mt-8">Заказать съемку</UIButton>
    </div>
  </section>
</template>

<script setup>
defineProps({
  withHeading: {
    type: Boolean,
    default: true,
  },
})
</script>
