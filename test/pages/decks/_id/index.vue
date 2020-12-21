<template>
  <section>
    <div class="r">
      <div class="ct text_center">
        <h3>Deck: Learn chicken</h3>
        <div class="tools">
          <button class="btn btn_success">Start now</button>
          <button class="btn btn_primary">Create a card</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  validate({ params }) {
    return true
  },
}
</script>

<style lang="scss">
section {
  padding-top: 3rem;
}
</style>
