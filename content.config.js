import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    globals: defineCollection({
      type: 'data',
      source: 'globals.yml',
    }),
    pricing: defineCollection({
      type: 'data',
      source: 'pricing.yml',
    }),
  },
})
