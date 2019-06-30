<template>
  <div class="about">
    <TopNav></TopNav>
    <h1>Page with writings</h1>
    <nav>
      <ul>
        <li><router-link to="/writing/1">article title</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue';

export default {
  name: 'Writing',

  data() {
    return {};
  }
};
</script>

<style lang="css" scoped>
</style>
