<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const globals = await useGlobals()

useHead({
  title: globals.value.meta.defaultMeta.siteName,
  meta: [
    { name: 'description', content: globals.value.meta.defaultMeta.description },
    { property: 'og:title', content: globals.value.meta.defaultMeta.title },
    { property: 'og:description', content: globals.value.meta.defaultMeta.description },
    { property: 'og:image', content: globals.value.meta.defaultMeta.ogImage },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
</script>
