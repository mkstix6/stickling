<template>
  <div class="threeD flex">
    <div id="mecard" class="card card_person" itemscope itemtype="https://schema.org/Person">
      <div class="person">
        <span id="shimmer"></span>
        <img src="../assets/me.jpg" alt="Mark Stickling" itemprop="image">
      </div>
    </div>
  </div>
</template>

<script>
  import cardAttract from '../modules/cardattract.ts';

  export default {
    mounted: () => {
      document.addEventListener('DOMContentLoaded', () => {
        cardAttract.init();
        // console.log('init');
      });
    },
  };
</script>

<style lang="scss" scoped>
  @import '_variables.scss';

  #shimmer {
    display: block;
    position: absolute;
    top: -10%;
    left: -20%;
    right: -20%;
    bottom: -10%;
    border-radius: inherit;
    z-index: 2;
    transform: translateZ(0px) translateY(-2em);
    background: radial-gradient(rgba(white, 0.4), rgba(white, 0.0001), rgba(white, 0.0001));
    will-change: transform;
    transition: transform 150ms;
  }

  .person {
    border-radius: 200px;
    position: relative;
    animation: rotate-it-x .6s 1 ease-out;
    overflow: hidden;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.2);
    transform: translateZ(-50px);
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      z-index: 2;
    }
    &::before {
      content: "";
      background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.5) 22%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0));
      display: block;
      position: absolute;
      top: -200px;
      left: -200px;
      right: -200px;
      bottom: -200px;
      animation: shiny .6s 1 linear;
      animation-fill-mode: forwards;
      border-radius: 200px;
    }
    img {
      border-radius: 200px;
      display: block;
    }
  }

  .card {
    animation: in .6s 1 ease-out;
    position: relative;
    max-width: 100%;
    border-radius: 4px;
    transition: transform 150ms;
    perspective: 400px;
    transform-style: preserve-3d;
  }

  .card_person {
    border-top-left-radius: 200px;
    border-top-right-radius: 200px;
    border-radius: 200px;

    @media (max-width: $media-lg) {
      max-width: 45vw;
    }
  }

  .threeD {
    perspective: 2000px;
  }
</style>
