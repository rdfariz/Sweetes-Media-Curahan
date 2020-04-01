import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Chat from '@/components/Chat'
import TimelineDetail from '@/components/TimelineDetail'
import Timeline from '@/components/Timeline'
import Profil from '@/components/Profil'
import CRUD from '@/components/CRUD'
import Music from '@/components/Music'
import Shop from '@/components/Shop'
import Cart from '@/components/Cart'
import Blog from '@/components/Blog'
import OrderList from '@/components/OrderList'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Timeline,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/:id',
      name: 'Profil',
      component: Profil,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: Timeline,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/timeline/:id',
      name: 'Timeline Detail',
      component: TimelineDetail,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/crud',
      name: 'CRUD',
      component: CRUD,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/music',
      name: 'Music',
      component: Music,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orderlist',
      name: 'OrderList',
      component: OrderList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router;
