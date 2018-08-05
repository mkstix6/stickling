<template>
  <div class="home">
    <div class="page tac" id="page_home">
      <TopNav></TopNav>
      <div class="flex mt-auto aibase w-100">
        <MagTile class="mephoto" />
        <h1 class="display-font markstickling m-0"><span itemprop="givenName">Mark</span>&nbsp;<span itemprop="familyName">Stickling</span></h1>
      </div>
      <div class="flex column mb-auto">
        <div class="job">Front end web developer</div>
        <div class="dddisplay-font london" itemprop="homeLocation">London</div>
      </div>
      <div class="flex column tac aic mb-pad">
        <SkillsList :items="skillsData" />
      </div>
    </div>
    <div class="page fsx2-lg">
      <h2 class="display-font" style="font-size: 7rem; margin-top: 0.1em; margin-bottom: 0.1em;">Hi!</h2>
      <p class="line-length justify wide-line" style="margin-top: 0.1em;">Primarily working on WordPress and exploring ES6. Shipped a couple of VueJS mini-apps. Keen on <span class="nowrap">WAI-ARIA</span>, semantics, structured-data. 5+ years building responsive HTML & CSS using new techniques whilst supporting the past. Great developers are the people who contribute to teams, ask questions, consider advice, teach.</p>
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
  import TopNav from '@/components/TopNav.vue';

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
      TopNav,
    },
  });
</script>

<style lang="scss" scoped>
  @import '../components/_variables.scss';
  .w-100{
    width: 100%;
  }
  .justify{
    text-align: justify;
  }

  .fsx2 {
    font-size: 2rem;
  }

  .mb-pad {
    margin-bottom: 5vh;
  }

  .fsx2-lg{
    @media (min-width: $media-lg){
      font-size: 2rem;
    }
  }
  .wide-line{
    line-height: 1.8;
    @media (max-width: 700px) {
      // line-height: 9vw;
    }
  }
  .nowrap{
    white-space: nowrap;
  }

  .line-length{
    max-width: 22em;
    padding-left: 1em;
    padding-right: 1em;
  }

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
    min-height: 100vh;
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
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 0.2em;
    flex: 0 0 12vw;
    margin-right: 2.5em;

    @media (max-width: $media-lg){
      margin-right: 0;
      margin-left: 0;
      flex: 45vw;
    }
  }

  .column {
    flex-direction: column;
  }

  $ratio: 0.62;
  $fs-base: 3vw;
  .job {
    font-size: $fs-base * $ratio;

    @media (max-width: 700px) {
      font-size: 1.5rem;
    }
  }

  .london {
    font-size: $fs-base;

    @media (max-width: 700px) {
      font-size: 1.5rem;
    }
  }

  .mt-auto {
    margin-top: auto !important;
  }

  .mb-auto {
    margin-bottom: auto !important;
  }
</style>
