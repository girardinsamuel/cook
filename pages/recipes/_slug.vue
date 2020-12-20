<template>
  <div
    class="container mx-auto"
  >
    <div
      class="w-full py-4 lg:pt-8 lg:pb-4 border-gray-800"
      :class="{
        'lg:border-l lg:border-r': settings.layout !== 'single'
      }"
    >
      <article class="prose max-w-none lg:px-8">
        <h1 class="flex items-center justify-between">
          {{ recipe.title }}
          <NuxtLink v-if="recipe.category" :to="{ name: 'recipes-category-slug', params: { slug: recipe.category } }">
            <Badge>
              {{ recipe.category }}
            </Badge>
          </NuxtLink>
        </h1>
        <ingredients :list="recipe.ingredients" :parts="recipe.parts" :qty="recipe.qty" :title="recipe.title" />
        <nav>
          <ul>
            <li v-for="(link, index) of recipe.toc" :key="link.id">
              <NuxtLink :to="`#${link.id}`">
                {{ index + 1 }}. {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- <div v-if="recipe.subtitle" class="-mt-4">
          <p class="text-gray-600 dark:text-gray-400">
            {{ recipe.subtitle }}
          </p>
        </div> -->
        <img v-if="recipe.img" :src="require(`~/assets/recipes/${recipe.img}`)" alt="Photo recette réalisée">
        <NuxtContent :document="recipe" />
        </recipe>

        <div class="pt-4 pb-4 lg:px-8 flex justify-between text-gray-600 text-sm">
          <a
            :href="editLink"
            target="_blank"
            rel="noopener"
            class="font-medium hover:underline flex items-center"
          >
            Éditer sur GitHub
            <IconExternalLink class="w-4 h-4 ml-1" />
          </a>
          <span>Mis à jour le : {{ formatDate(recipe.updatedAt) }}</span>
        </div>

        <AppPrevNext :prev="prev" :next="next" />
      </article>
    </div>
  </div>
</template>

<script>
// import AppCopyButton from '~/components/app/AppCopyButton'

export default {
  async asyncData ({ $content, params }) {
    const recipe = await $content('recipes', params.slug).fetch()
    const [prev, next] = await $content('recipes', { deep: true })
      .only(['title', 'path'])
      .sortBy('position', 'asc')
      .surround(params.slug, { before: 1, after: 1 })
      // .surround(recipe.path, { before: 1, after: 1 })
      .fetch()
    return { recipe, prev, next }
  },
  data () {
    return {
      settings: {
        layout: 'single'
      }
    }
  },
  // TODO: use here schema Recipe
  // head () {
  //   return {
  //     title: this.document.title,
  //     meta: [
  //       { hid: 'description', name: 'description', content: this.document.description },
  //       // Open Graph
  //       { hid: 'og:title', property: 'og:title', content: this.document.title },
  //       { hid: 'og:description', property: 'og:description', content: this.document.description },
  //       // Twitter Card
  //       { hid: 'twitter:title', name: 'twitter:title', content: this.document.title },
  //       { hid: 'twitter:description', name: 'twitter:description', content: this.document.description }
  //     ]
  //   }
  // },
  computed: {
    editLink () {
      return [
        'girardinsamuel/cook',
        'edit',
        'master',
        '',
        `content${this.recipe.path}${this.recipe.extension}`
      ].filter(path => !!path).join('/')
    }
  },
  mounted () {
    // if (this.document.version) {
    //   localStorage.setItem(`document-${this.document.slug}-version`, this.document.version)
    // }

    // setTimeout(() => {
    //   const blocks = document.getElementsByClassName('nuxt-content-highlight')

    //   for (const block of blocks) {
    //     const CopyButton = Vue.extend(AppCopyButton)
    //     const component = new CopyButton().$mount()
    //     block.appendChild(component.$el)
    //   }
    // }, 100)
  },
  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('fr', options)
    }
  }
}
</script>
