<template>
  <ul class="person_attributes">
    <li v-for="item in items" :key="item.name" class="starstat">
      <span class="text">{{item.name}}</span>
      <StarsString :value="item.value" />
    </li>
  </ul>
</template>

<script>
  import StarsString from '@/components/StarsString.vue';

  export default {
    components: {
      StarsString,
    },
    props: {
      items: Array,
    },
  };
</script>

<style scoped>

</style>
