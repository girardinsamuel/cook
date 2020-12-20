<template>
  <div
    :key="currentCategory"
    class="container mx-auto"
  >
    <div
      class="w-full py-4 lg:pt-8 lg:pb-4 border-gray-800"
    >
      <div class="prose">
        <h1>Recettes de {{ currentCategory }}</h1>
        <ul>
          <li v-for="recipe of recipes" :key="recipe.slug">
            <NuxtLink :to="{ name: 'recipes-slug', params: { slug: recipe.slug } }">
              {{ recipe.title }}
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
    const currentCategory = params.slug
    const recipes = await $content('recipes')
      .where({ category: currentCategory })
      .only(['title', 'slug'])
      .sortBy('title', 'asc')
      .fetch()

    return {
      recipes,
      currentCategory
    }
  }
}
</script>
