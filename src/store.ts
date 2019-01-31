import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    skills: [
      {
        name: 'HTML',
        value: 4,
        group: 'html'
      },
      {
        name: 'CSS',
        value: 5,
        group: 'css'
      },
      {
        name: 'Scss',
        value: 4,
        group: 'css'
      },
      {
        name: 'JS',
        value: 3,
        group: 'js'
      },
      {
        name: 'ES6',
        value: 3,
        group: 'js'
      },
      {
        name: 'Vue',
        value: 3,
        group: 'js'
      },
      {
        name: 'Nuxt',
        value: 3,
        group: 'js'
      },
      {
        name: 'Bulma',
        value: 3,
        group: 'css'
      },
      {
        name: 'jQuery',
        value: 4,
        group: 'js'
      },
      {
        name: 'GSAP',
        value: 3,
        group: 'js'
      },
      {
        name: 'TypeScript',
        value: 1,
        group: 'js'
      },
      {
        name: 'ScrollMagic',
        value: 3,
        group: 'js'
      },
      {
        name: 'npm',
        value: 3,
        group: 'js'
      },
      {
        name: 'yarn',
        value: 3,
        group: 'js'
      },
      {
        name: 'Git',
        value: 4,
        group: 'git'
      },
      {
        name: 'Gulp',
        value: 3,
        group: 'tool'
      },
      {
        name: 'Webpack',
        value: 3,
        group: 'tool'
      },
      {
        name: 'Rollup',
        value: 3,
        group: 'tool'
      },
      {
        name: 'Docker',
        value: 2,
        group: 'tool'
      },
      {
        name: 'React',
        value: 1,
        group: 'js'
      },
      {
        name: 'Bootstrap',
        value: 4,
        group: 'css'
      },
      {
        name: 'Zurb Foundation',
        value: 3,
        group: 'css'
      },
      {
        name: 'Photography',
        value: 3,
        group: 'hobby'
      },
      {
        name: 'PhotoShop',
        value: 3,
        group: 'editing'
      },
      {
        name: 'Illustrator',
        value: 3,
        group: 'editing'
      },
      {
        name: 'Sketch',
        value: 3,
        group: 'editing'
      },
      {
        name: 'Cypress.js',
        value: 2,
        group: 'testing'
      },
      {
        name: 'Ava.js',
        value: 2,
        group: 'testing'
      }
    ],
    links: [
      {
        url: `https://projects.lukehaas.me/runjs/`,
        name: `RunJS`,
        kind: 'tool'
      },
      {
        url: `https://css-tricks.com/`,
        name: `CSS-Tricks`,
        kind: 'blog'
      },
      {
        url: `https://github.com/sindresorhus/awesome#front-end-development`,
        name: `Sindresorhus — Curated list of awesome lists`
      },
      {
        url: `http://responsivedesignweekly.com`,
        name: `Responsive Design Newsletter`,
        kind: 'newsletter'
      },
      {
        url: `https://patternlab.io`,
        name: `Pattern Lab`,
        kind: 'learning'
      }
    ]
  },
  mutations: {},
  actions: {}
});
