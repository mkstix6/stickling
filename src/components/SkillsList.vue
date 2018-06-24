<template>
  <ul class="person_attributes">
    <li v-for="item in items" :key="item.name" class="starstat" :data-val="item.value">
      <span class="text" :title="starsTitleperson_attributes">{{item.name}}</span>
      <!-- <StarsString :value="item.value" /> -->
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
    computed: {
      starsTitle: (num) => {
        return '★'.repeat(num);
      },
    },
  };
</script>

<style lang="scss" scoped>
  $sizeRate: 0.96;
  @for $i from 1 through 5 {
    [data-val="#{$i}"] {
      font-size: $sizeRate * $i * 0.2rem + 1rem;
    }
  }

  .person_attributes {
    display: flex;
    flex-wrap: wrap;
    max-width: 50%;
    width: 50%;
    align-items: center;
    justify-content: center;
  }

  .starstat {
    margin: 0.4vh 1vw;
  }
</style>
