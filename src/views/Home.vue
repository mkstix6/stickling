<template>
  <div class="home">
    <div class="page" id="page_home">
      <div class="center_both threeD">
        <MagTile />
        <h1><span itemprop="givenName">Mark</span>&nbsp;<span itemprop="familyName">Stickling</span></h1>
        <ul class="person_attributes">
          <li itemprop="homeLocation">London</li>
          <li>Front end web developer</li>
          <SkillsList :items="skillsData" />
        </ul>
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
