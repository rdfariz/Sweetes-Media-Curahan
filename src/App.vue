<template>
  <div id="app">
    <v-app id="inspire">
      <appbar v-if="this.$route.path != '/login'"/>
      <v-content style="padding-top: 65px; padding-bottom: 40px">
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import {firebase, firestore} from './firebase';
import Appbar from './components/Appbar'

export default {
  name: 'App',
  beforeCreate() {
    if (localStorage.getItem('uid') == null) {
      this.$router.push('/login');
    }else {
      firestore.collection('users').doc(localStorage.getItem('uid')).get()
      .then(snapshot=>{
        if (!snapshot.exists) {
          this.$router.push('/login');   
        }
      })
    }
  },
  components: {
    'appbar': Appbar
  },
  created () {
    this.$store.commit('loginAs');
    this.$vuetify.theme.dark = this.$store.state.darkMode;

    this.$router.beforeEach((to, from, next) => {
      const currentUser = firebase.auth().currentUser;
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
      if (requiresAuth && !currentUser) {
        next('Login');
      }else {
        next();
      }
    })
  }
}
</script>

<style>
html {
  overflow: auto !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.ps {
  width: 100%;
  height: 85vh;
}

.area-full .ps {
  height: 100% !important;
}

.area-xl .ps {
  height: 600px !important;
}

.area-lg .ps {
  height: 500px !important;
}

.area-md .ps {
  height: 400px !important;
}

.area-sm .ps {
  height: 300px !important;
  max-height: 300px !important;
}

.ps__rail-x, .ps__rail-y{
  z-index: 99999;
}

</style>
