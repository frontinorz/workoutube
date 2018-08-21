import Vue from 'vue';
import Router from 'vue-router';
import card from '@/components/card';
import List from '@/components/List';
import VideoCapture from '@/components/VideoCapture';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'card',
      component: card,
    },
    {
      path: '/List',
      name: 'List',
      component: List,
    },
    {
      path: '/VideoCapture',
      name: 'VideoCapture',
      component: VideoCapture,
    },
  ],
});

