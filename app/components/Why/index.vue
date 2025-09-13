<template>
  <div id="why" class="w-full flex flex-col items-center">
    <h2
      class="font-gilroy font-semibold text-4xl leading-none tracking-normal text-text self-start"
    >
      Почему <span class="text-accent">стоит доверить</span> <br />
      организацию <span class="text-accent">Backstage</span>
    </h2>
    <p class="body-text mx-auto mt-3">
      Мы создаем не просто фотосессии, а уникальные истории, <br />
      где каждая деталь отражает вашу индивидуальность
    </p>
    <div class="mt-7">
      <NuxtImg
        src="/images/why/image.png"
        alt="Почему стоит выбрать Backstage"
        class="w-full h-auto object-cover hidden md:block"
        format="webp,jpg"
        quality="85"
        loading="eager"
        preload
      />
    </div>
  </div>
</template>
