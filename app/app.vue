<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const globals = await useGlobals()

useHead({
  title: globals.value.meta.title,
  meta: [
    { name: 'description', content: globals.value.meta.seo.description },
    { property: 'og:title', content: globals.value.meta.seo.ogTitle },
    { property: 'og:description', content: globals.value.meta.seo.ogDescription },
    { property: 'og:image', content: globals.value.meta.seo.ogImage },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
</script>
