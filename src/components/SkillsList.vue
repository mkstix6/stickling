<template>
  <ul class="person_attributes">
    <li v-for="item in orderedItems" :key="item.name" class="starstat" :data-val="item.value">
      <span class="text person_attributes" :title="starsTitle">{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
  import StarsString from '@/components/StarsString.vue';
  import orderBy from 'lodash';

  export default {
    components: {
      StarsString,
    },
    props: {
      items: Array,
    },
    computed: {
      starsTitle: (num) => '★'.repeat(num),
      orderedItems() { return _.orderBy(this.items, 'value', 'desc'); },
    },
  };
</script>

<style lang="scss" scoped>
  @import '_variables.scss';

  $sizeRate: 1.5;
  @for $i from 1 through 5 {
    [data-val="#{$i}"] {
      font-size: $sizeRate * $i * 0.1rem + 1rem;
    }
  }

  .person_attributes {
    display: flex;
    flex-wrap: wrap;
    max-width: 50%;
    width: 50%;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    @media (max-width: $media-lg) {
      max-width:90%;
      width: auto;
    }
  }

  .starstat {
    margin: 0.4vh 1vw;
  }
</style>
