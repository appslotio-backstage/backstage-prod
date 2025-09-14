<template>
  <label class="flex items-center gap-3 cursor-pointer select-none">
    <input
      class="sr-only"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      @change="$emit('update:modelValue', value)"
    />
    <span
      class="relative inline-flex items-center justify-center w-5 h-5 rounded-full border transition-colors"
      :class="checked ? 'border-text' : 'border-text'"
    >
      <span
        class="block w-[10px] h-[10px] rounded-full transition-transform"
        :class="checked ? 'bg-accent scale-100' : 'scale-0 bg-transparent'"
      />
    </span>
    <span class="text-text text-sm">
      <slot />
    </span>
  </label>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  value: { type: [String, Number], required: true },
  modelValue: { type: [String, Number], default: '' },
  checked: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>
