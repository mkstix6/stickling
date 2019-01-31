<template>
  <ul class="person_attributes">
    <li v-for="item in orderedItems" :key="item.name" class="starstat" :data-val="item.value">
      <span class="text person_attributes" :title="starsTitle">{{item.name}}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import StarsString from '@/components/StarsString.vue';
import { orderBy } from 'lodash';

interface Items {
  name: string;
  value: number;
}

export default Vue.extend({
  components: {
    StarsString
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    orderedItems(): object[] {
      return this.orderBy(this.items, 'value', 'desc');
    }
  },
  methods: {
    orderBy
  }
});
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
