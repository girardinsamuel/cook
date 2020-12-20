<template>
  <div
    class="container mx-auto"
  >
    <div
      class="w-full py-4 lg:pt-8 lg:pb-4 border-gray-800"
    >
      <div class="prose">
        <h2>Recettes</h2>
        <ul>
          <li v-for="recipe of recipes" :key="recipe.slug">
            <NuxtLink :to="{ name: 'recipes-slug', params: { slug: recipe.slug } }">
              {{ recipe.title }}
            </NuxtLink>
          </li>
        </ul>
        <h2>Préparations de bases</h2>
        <ul>
          <li v-for="technic of technics" :key="`technic_${technic.slug}`">
            <NuxtLink :to="{ name: 'recipes-slug', params: { slug: technic.slug } }">
              {{ technic.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const recipes = await $content('recipes', params.slug)
      .where({ base: false })
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch()

    const technics = await $content('recipes', params.slug)
      .where({ base: true })
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return {
      recipes,
      technics
    }
  }
}
</script>

<style>

</style>
