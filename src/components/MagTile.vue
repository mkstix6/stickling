<template>
  <div>
    <div id="mecard" class="card card_person" itemscope itemtype="https://schema.org/Person">
      <div class="person">
        <span id="shimmer"></span>
        <img src="../assets/me.jpg" alt="Mark Stickling" itemprop="image">
      </div>
    </div>
  </div>
</template>

<script>
  import cardAttract from '../modules/cardattract.js';

  export default {
    mounted: () => {
      cardAttract();
    },
  };
</script>

<style scoped>

</style>
