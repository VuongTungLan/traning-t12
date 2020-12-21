<template>
  <div>
    <default-header />
    <Nuxt />
  </div>
</template>

<script>
import DefaultHeader from '@/components/Header/DefaultHeader'
export default {
  components: {
    DefaultHeader,
  },
}
</script>

<style lang="scss">
header {
  background: #000;
  color: #fff;
  height: 60px;
  nav,
  ul {
    height: inherit;
    width: 100%;
  }
  ul {
    align-items: center;
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      margin: 0 1.5rem;
      a {
        color: #fff;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
