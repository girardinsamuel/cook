<template>
  <span>
    {{ ing.qty }} {{ ing.unit }} {{ name }}
    <span v-if="isEgg">
      (~ {{ eggWeight }} g d'oeufs)
    </span>
  </span>
</template>

<script>
const eggWheight = 60
export default {
  name: 'IngredientItem',
  props: {
    ingredient: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isEgg () {
      return this.ingredient.name.search('oeuf') && !!this.ingredient.unit
    },
    eggWeight () {
      return this.ingredient.qty * eggWheight
    },
    name () {
      return this.ingredient.name.toLowerCase()
    },
    qty () {
      return parseFloat(this.ingredient.qty.toFixed(1))
    }
  }
}
</script>

<style>

</style>
