import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Writing from './views/Writing.vue';
import Article from './views/Article.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/writing',
      name: 'writing',
      component: Writing,
    },
    {
      path: '/writing/:id',
      name: 'article',
      props: true,
      component: Article,
    },
  ],
});


