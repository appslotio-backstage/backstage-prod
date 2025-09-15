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
    styles: defineCollection({
      type: 'data',
      source: 'styles.yml',
    }),
    products: defineCollection({
      type: 'data',
      source: 'products.yml',
    }),
    portfolio: defineCollection({
      type: 'data',
      source: 'portfolio.yml',
    }),
  },
})
