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
    letter-spacing: -1px;
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

  .center_both {
    margin: auto;
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

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

  .card {
    animation: in .6s 1 ease-out;
    position: relative;
    max-width: 100%;
    perspective: 400px;
    border-radius: 4px;
    margin: 20px;
    padding-bottom: 20px;
    transition: transform 150ms;
    perspective: 400px;
    transform-style: preserve-3d;
  }

  .card_person {
    border-top-left-radius: 200px;
    border-top-right-radius: 200px;
    border-radius: 200px;
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

  pre{
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
