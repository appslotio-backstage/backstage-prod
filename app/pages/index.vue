<template>
  <div>
    <Hero />
    <!-- content -->
    <div class="max-w-[1420px] mx-auto px-8">
      <section
        id="services"
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { delay: 100, duration: 600, easing: 'easeOut' },
        }"
      >
        <Why />
      </section>

      <section
        id="portfolio"
        v-motion
        class="mt-16 md:mt-24"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { delay: 150, duration: 600, easing: 'easeOut' },
        }"
      >
        <Slider />
      </section>

      <section
        id="styles"
        v-motion
        class="mt-16 md:mt-24"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { delay: 200, duration: 600, easing: 'easeOut' },
        }"
      >
        <Products />
      </section>

      <section
        v-motion
        class="mt-16 md:mt-24"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { delay: 250, duration: 600, easing: 'easeOut' },
        }"
      >
        <SelectStyle />
      </section>

      <Marquee
        v-motion
        class="mt-8 md:mt-16"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { delay: 275, duration: 600, easing: 'easeOut' },
        }"
      />

      <section
        id="pricing"
        v-motion
        class="mt-16 md:mt-24"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { delay: 300, duration: 600, easing: 'easeOut' },
        }"
      >
        <Price />
      </section>

      <section
        v-motion
        class="mt-16 md:mt-24"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { delay: 350, duration: 600, easing: 'easeOut' },
        }"
      >
        <Order />
      </section>

      <section
        v-motion
        class="mt-16 md:mt-24"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { delay: 400, duration: 600, easing: 'easeOut' },
        }"
      >
        <Quiz />
      </section>

      <section
        id="reviews"
        v-motion
        class="mt-16 md:mt-24"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { delay: 450, duration: 600, easing: 'easeOut' },
        }"
      >
        <Reviews />
      </section>

      <section
        v-motion
        class="mt-8"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { delay: 500, duration: 600, easing: 'easeOut' },
        }"
      >
        <Order :with-heading="false" />
      </section>
    </div>
    <Footer />
  </div>
</template>
