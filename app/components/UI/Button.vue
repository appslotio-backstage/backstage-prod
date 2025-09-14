<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center rounded-[30px] bg-accent text-bg gap-[10px] transition-colors duration-200 hover:bg-text focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-60 disabled:cursor-not-allowed font-actay font-normal not-italic text-[16px] leading-none tracking-normal',
      variant === 'fit' ? 'w-fit px-10 py-5' : 'w-[260px] h-[51px] px-10 py-5',
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'default' },
})
</script>
