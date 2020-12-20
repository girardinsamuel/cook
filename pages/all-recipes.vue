<template>
  <div
    class="container mx-auto"
  >
    <div
      class="w-full py-4 lg:pt-8 lg:pb-4 border-gray-800"
    >
      <div class="prose">
        <h1>All recipes</h1>
        <ul>
          <li v-for="article of articles" :key="article.slug">
            <NuxtLink :to="{ name: 'recipes-slug', params: { slug: article.slug } }">
              {{ article.title }}
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
    const articles = await $content('recipes')
      .only(['title', 'img', 'slug'])
      .sortBy('title', 'asc')
      .fetch()

    return {
      articles
    }
  }
}
</script>
