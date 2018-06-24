<template>
  <div class="home">
    <div class="page tac" id="page_home">
      <div class="flex mt-auto aibase">
        <MagTile class="mephoto" />
        <h1 class="display-font markstickling m-0"><span itemprop="givenName">Mark</span>&nbsp;<span itemprop="familyName">Stickling</span></h1>
      </div>
      <div class="flex column mb-auto">
        <div class="job">Front end web developer</div>
        <div class="dddisplay-font london" itemprop="homeLocation">London</div>
      </div>
      <div class="flex column tac aic">
        <SkillsList :items="skillsData" />
      </div>
    </div>
    <div class="footer">
      <!-- <a href="#">photography</a> -->
      <!-- <a href="#">social</a> -->
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import MagTile from '@/components/MagTile.vue';
  import SkillsList from '@/components/SkillsList.vue';
  import store from '@/store.ts';

  export default Vue.extend({
    name: 'home',
    computed: {
      skillsData() {
        return store.state.skills;
      },
    },
    components: {
      MagTile,
      SkillsList,
    },
  });
</script>

<style lang="scss" scoped>
  .tac {
    text-align: center;
  }

  .aic {
    align-items: center;
  }

  .jcc {
    justify-content: center;
  }

  .page {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .markstickling {
    font-size: 10vw;
  }

  MagTile,
  .mephoto {
    width: 12.6vw;
    display: inline-flex;
    position: relative;
    top: 0.2em;
  }

  .column {
    flex-direction: column;
  }

  $ratio: 0.62;
  $fs-base: 3vw;
  .london {
    font-size: $fs-base;
  }

  .job {
    font-size: $fs-base * $ratio;
  }

  .home {}

  .mt-auto {
    margin-top: auto !important;
  }

  .mb-auto {
    margin-bottom: auto !important;
  }
</style>
