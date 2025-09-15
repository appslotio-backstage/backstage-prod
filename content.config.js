import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    globals: defineCollection({
      type: 'data',
      source: 'globals.yml',
    }),
    pricing: defineCollection({
      type: 'data',
      source: 'pricing.yml',
      schema: z.object({
        title: z.string().default('Стоимость услуг'),
        subtitle: z.string().default(''),
        columns: z
          .array(
            z.object({
              title: z.string(),
              items: z.array(
                z.object({
                  name: z.string(),
                  desc: z.string().optional().default(''),
                  price: z.string().optional().default(''),
                }),
              ),
            }),
          )
          .default([]),
      }),
    }),
  },
})
