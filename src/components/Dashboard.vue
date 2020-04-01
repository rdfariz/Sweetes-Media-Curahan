<template>
<div>

      <v-container grid-list-xs fluid>
            <v-layout row wrap justify-center>

                <v-flex xs12 md11 pa-1 v-if="!loadingPost">
                    
                </v-flex>

            </v-layout>
        </v-container>

</div>
</template>

<script>
import {firebase, firestore} from '../firebase'
import router from '../router'
import moment from 'moment'

  export default {
    data: () => ({
        loadingPost: false,
        users: [],
        post: [],
        content_post: '',
        maxLength: 80,
        alertContent: {
          show: true,
          text: 'Yukk curhat di Sweetes..',
          type: 'info'
        },
    }),
    methods: {
        
    },
    created() {
      this.$store.commit('loginAs');
    },
    computed: {
      loginAs () {
        return this.$store.state.loginAs
      },
    },
    mounted: function() {
        this.loadingPost = true;
        this.$bind('post', firestore.collection('post').orderBy('createdAt', "desc"))
        .then(result => {
              this.loadingPost = false;
        })
    },
  }
</script>

<style>
.profile {
  position: absolute;
  z-index: 1;
}
</style>