<template>
  <div
    v-if="prev || next"
    class="grid grid-cols-2 gap-2 lg:px-8 pt-4 border-t border-gray-800"
    :class="{
      'lg:border-t-0': settings.layout === 'single'
    }"
  >
    <NuxtLink
      v-if="prev"
      :to="{ name: 'recipes-slug', params: { slug: prev.slug } }"
      class="text-primary-500 font-bold hover:underline flex items-center justify-start"
    >
      <IconArrowLeft class="w-4 h-4 mr-1 flex-shrink-0" />
      <span class="truncate">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else>&nbsp;</span>

    <NuxtLink
      v-if="next"
      :to="{ name: 'recipes-slug', params: { slug: next.slug } }"
      class="text-primary-500 font-bold hover:underline flex items-center justify-end"
    >
      <span class="truncate">{{ next.title }}</span>
      <IconArrowRight class="w-4 h-4 ml-1 flex-shrink-0" />
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      settings: {
        layout: 'default'
      }
    }
  },
  computed: {
    // ...mapGetters([
    //   'settings'
    // ])
  }
}
</script>
