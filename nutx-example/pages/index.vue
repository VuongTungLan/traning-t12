<template>
  <div>
    <h1>{{ message }}</h1>
    <recipe :recipes="this.recipes" @countId = "yolo"/>
    <nuxt-link to="yolo">yolo</nuxt-link>
    
  </div>
</template>

<script>
import Recipe from '@/components/recipe.vue';
export default {
  data() {
    return {
      message: 1,
      recipes: [
        {id: 1, name: "ga chien"},
        {id: 2, name: "ga boc bot"},
        {id: 3, name: "ga ran"}
      ]
    };
  },
  methods: {
    yolo(item) {
      this.message = item
    }
  },
  computed: {
    count() {
      return function (param) {
        setInterval(() => {
          this.message += param;
        }, 2000);
      };
    },
  },
  mounted() {
    this.count(5);
  },
  components: {
    Recipe
  }
};
</script>

<style></style>
