<template>
  <span class="stars">
    {{starsString}}
  </span>
</template>

<script>
  export default {
    props: {
      value: Number,
    },
    computed: {
      starsString() {
        return '★'.repeat(this.value);
      },
    },
  };
</script>

<style scoped>

</style>
