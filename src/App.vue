<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  // @font-face {
  //   font-family: 'Pink Blue';
  //   src: url('./assets/Pink Blue.ttf');
  // }

  @font-face {
    font-family: 'Alike Angular';
    src: url('./assets/AlikeAngular-Regular.ttf');
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .display-font {
    // font-family: 'Pink Blue';
    font-family: 'Alike Angular', serif;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }

  * {
    box-sizing: border-box;
  }

  .m-0 {
    margin: 0 !important;
  }

  .mt-auto {
    margin-top: auto !important;
  }

  .mb-auto {
    margin-bottom: auto !important;
  }

  .aibase{
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  img {
    max-width: 100%;
  }

   :root {
    background: #f0f0f0;
    background-color: black;
    font-family: abel, sans-serif;
    line-height: 1.4;
    background-image: linear-gradient(to bottom right, rgba(47, 228, 189, 0.9) 10%, rgba(50, 200, 230, 0.9), rgba(15, 36, 161, 0.9));
    color: white;
    color: rgba(255, 255, 255, 1);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    letter-spacing: -0.01em;
    font-weight: 400;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }

  .threeD {
    perspective: 400px;
  }

  .flex {
    display: flex;
  }

  .center_both {
    margin: auto;
    margin-top: auto;
    align-items: center;
    justify-content: center;
  }

  @keyframes shiny {
    0% {
      transform: translateX(400px) translateY(400px);
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translateX(-100px) translateY(-100px);
      opacity: 0;
    }
  }

  h1 {
    margin: 1em 0 .5em;
    text-align: center;
  }

  @keyframes in {
    0% {
      transform: scale(0.95) translateZ(-100px);
      opacity: 0.00001;
    }
    40% {
      opacity: 0.0001;
    }
    100% {
      transform: scale(1) translateZ(0px);
      opacity: 1;
    }
  }

  @keyframes rotate-it-x {
    0% {
      transform: rotateX(30deg) translateZ(-50px);
    }
    100% {
      transform: rotateX(0deg) translateZ(-50px);
    }
  }

  .person_attributes {
    list-style: none;
    padding-left: 0;
    text-align: center;
    transform: translateZ(-10px);
    perspective: 400px;
    transform-style: preserve-3d;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 1em 1em;
    align-self: flex-end;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    a {
      margin: 0 0.5em;
    }
  }

  a {
    color: inherit;
    opacity: 0.8;
    text-decoration: none;
  }

  pre {
    font: inherit;
  }

  li {
    transition: transform 150ms;
    transform-style: preserve-3d;
    transform: translateZ(-5px);
    @for $n from 1 through 30 {
      &:nth-child(#{$n}) {
        transform: translateZ(-2px * $n);
      }
    }
    @for $n from 1 through 30 {
      &:hover:nth-child(#{$n}) {
        transform: translateZ(-2px * $n + 5);
      }
    }
  }

  a:hover {
    opacity: 1;
  }

  .starstat {
    display: flex;
    justify-content: center;
    // width: 20em;
    .text {
      flex: 1 1 50%;
      text-align: right;
      margin-right: 0.5em;
    }
    .stars {
      flex: 1 1 50%;
      text-align: left;
    }
  }
</style>
