<template>
  <div>
    <div class="flex flex-wrap sm:flex-no-wrap sm:justify-end">
      <button class="btn" :class="copied && 'btn-active'" @click="getShoppingList">
        <IconClipboardCopy class="-ml-0.5 mr-2 h-4 w-4" /> {{ copied ? 'Copié !' : 'Copier liste' }}
      </button>
      <button class="btn">
        Imprimer (TO DO)
      </button>
    </div>
    <p><span class="font-medium text-base">Proportions : </span> <Badge>{{ qty.value }} {{ qty.unit }}</Badge></p>
    <div class="flex items-center">
      <button
        v-for="factor in factors"
        :key="factor.value"
        class="btn"
        :class="{'btn-active': btnActive(factor.value)}"
        @click="multiplyQty(factor.value)"
      >
        {{ factor.label }}
      </button>
      <button class="btn" @click="reset">
        <svg class="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        RAZ
      </button>
      <input v-model="newQty" type="number" class="block w-20 py-2 truncate px-3 leading-5 placeholder-gray-500 border border-transparent text-white focus:text-white focus:border-gray-700 rounded-md focus:outline-none focus:bg-gray-900 bg-gray-800">
    </div>

    <ul class="parts">
      <li v-for="(label, key) in parts" :key="key">
        <span class="font-medium text-base">{{ label }}</span>
        <ul>
          <li v-for="ing in quantitiesGrouped(key)" :key="`${key}-${ing.name}`" class="text-xs text-gray-500">
            {{ ing.qty }} {{ ing.unit }} {{ ing.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    parts: {
      type: Object,
      default: () => {}
    },
    qty: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      newQty: this.qty.value,
      selectedRatio: 1,
      factors: [
        {
          label: 'X 2',
          value: 2
        },
        {
          label: 'X 4',
          value: 4
        },
        {
          label: '1/2',
          value: 0.5
        },
        {
          label: '1/3',
          value: 0.33
        },
        {
          label: '1/4',
          value: 0.25
        }
      ],
      copied: false
    }
  },
  computed: {
    ratio () {
      return this.newQty / this.qty.value
    },
    quantities () {
      return this.list.map((i) => { return { ...i, qty: i.qty * this.ratio } })
    }
  },
  methods: {
    quantitiesGrouped (part) {
      return this.quantities.filter(i => i.part === part)
    },
    reset () {
      this.newQty = this.qty.value
      this.selectedRatio = 1
    },
    multiplyQty (ratio) {
      this.reset()
      this.selectedRatio = ratio
      this.newQty = this.qty.value * ratio
    },
    divideQty (ratio) {
      this.reset()
      this.selectedRatio = ratio
      this.newQty = this.qty.value / ratio
    },
    btnActive (value) {
      return value === this.selectedRatio
    },
    getShoppingList () {
      // compute
      const shoppingList = {}
      this.quantities.forEach((q) => {
        const { name, ...ingredient } = q
        if (name in shoppingList) {
          shoppingList[name].qty += ingredient.qty
        } else {
          shoppingList[name] = ingredient
        }
      })
      // format
      let shoppingListText = `${this.title} (${this.qty.value} ${this.qty.unit}) :\n`
      Object.entries(shoppingList).forEach(([name, ing]) => {
        shoppingListText += `- ${name} : ${ing.qty} ${ing.unit}\n`
      })
      this.$copyText(shoppingListText).then((e) => {
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      }, function (e) {
        console.log('cannot copy')
      })
    }
  }
}
</script>

<style scoped>

.parts > li::before {
  width: 0;
}
.parts > li {
  padding-left: 0;
}
.parts > li > ul{
  margin-top: 0;
}
.btn {
  margin-right: 10px;
}
</style>
