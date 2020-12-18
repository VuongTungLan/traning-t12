<template>
  <div>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        id: {{ recipe.id }}, name: {{ recipe.name }},<button @click="stop(recipe.id)">
          stop
        </button>
        <nuxt-link :to="'/boobs/' + recipe.id">cac</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    recipes: {
      type: Array,
      default: () => {},
    },
  },
  methods: {
    stop(item) {
      this.$emit("countId", item);
    },
  },
};
</script>
