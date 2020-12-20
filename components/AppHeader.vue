<template>
  <nav
    class="fixed top-0 z-40 w-full border-b border-gray-800 bg-gray-900"
  >
    <div class="mx-auto flex-1 px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="lg:w-1/5 flex items-center pr-4">
          <NuxtLink
            to="/"
            class="flex-shrink-0 flex-1 font-bold text-xl"
            :aria-label="`${settings.title} Logo`"
          >
            <span v-if="!logo">{{ settings.title }}</span>
            <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>
          </NuxtLink>
        </div>
        <div v-if="settings.layout !== 'single'" class="flex-1 flex justify-start w-4/6">
          <!-- <AppSearchAlgolia v-if="settings.algolia" :options="settings.algolia" :settings="settings" /> -->
          <AppSearch class="hidden lg:block" />
        </div>
        <div
          class="lg:w-1/5 flex items-center pl-4 lg:pl-8"
          :class="{ 'justify-between': settings.layout !== 'single', 'justify-end': settings.layout === 'single' }"
        >
          <div class="flex items-center">
            <a
              href="https://github.com/girardinsamuel/cook"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              name="Github"
              class="text-gray-300 hover:text-primary-500 ml-4"
              :class="{
                'hidden lg:block': settings.layout !== 'single'
              }"
            >
              <IconGithub class="w-5 h-5" />
            </a>

            <button
              v-if="settings.layout !== 'single'"
              class="lg:hidden p-2 rounded-md text-gray-300 focus:outline-none -mr-2"
              aria-label="Menu"
            >
              <IconMenu class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      settings: {
        title: 'cook blog',
        layout: 'default'
      },
      logo: {
        light: '/logo-light.svg',
        dark: '/logo-dark.svg'
      }
    }
  }
}
</script>
