<template>
<div>

      <v-container grid-list-xs fluid>
            <v-layout row wrap justify-center>

                <v-flex xs12 md12>
                    <v-layout row wrap>

                        <v-flex xs12 pa-1 v-if="loadingPost">
                          <v-card class="mx-auto pa-4" style="display: flex; justify-content: center">
                            <v-progress-circular
                              :size="70"
                              :width="7"
                              color="blue"
                              indeterminate
                            ></v-progress-circular>
                          </v-card>
                        </v-flex>

                        <v-flex xs12 sm12 md12 :key="post.id" pa-1 v-if="!loadingPost && post.length != 0">

                            <v-toolbar class="px-4">
                                <v-btn icon small @click="backPage">
                                    <v-icon>arrow_back</v-icon>
                                </v-btn>

                                <v-toolbar-title>
                                    <router-link style="text-decoration: none !important" to="/timeline">Timeline</router-link> / {{this.$route.params.id}}
                                </v-toolbar-title>
                            </v-toolbar>
                            
                            <v-card class="mx-auto px-4" :id="`post_`+post.id" style="word-wrap: break-word">
                                <v-list-item>
                                <v-list-item-avatar :color="post.createdBy.user_id == loginAs.user_id?'pink':'green'">#</v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="headline">
                                      <router-link style="text-decoration: none !important" :to="`/user/`+post.createdBy.user_id">{{post.createdBy.username}}</router-link>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>{{toDate(post.createdAt)}}</v-list-item-subtitle>
                                </v-list-item-content>
                                </v-list-item>
                                <v-divider/>
                                <v-card-text style="color: white">
                                  <div style="border-left: 3.5px solid #4caf50; padding-left: 7.5px;">
                                    <p>{{post.content}}</p>                                
                                  </div>
                                  <span>Disukai oleh: </span>
                                  <template v-if="post.love.length == 0">
                                      <span>-</span>
                                  </template>
                                  <template v-else v-for="(love, index) in post.love">
                                        <router-link v-if="index < 2" :to="`/user/`+love.user_id">{{love.username}}</router-link>
                                        <span v-if="index < 2">, </span>
                                        <a v-if="index == 2" @click="showLikes(post.love)">Lihat semua</a>
                                    </template>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn :color="loveColor(post.love)" icon small @click="lovePost(post.id)">
                                      <v-icon dark>favorite</v-icon>
                                    </v-btn>
                                    {{post.love.length}}
                                    <v-btn icon small v-if="post.createdBy.user_id == loginAs.user_id" @click="deletePost(post.id)">
                                        <v-icon dark>delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                        </v-flex>
                    </v-layout>
                </v-flex>

            </v-layout>

        </v-container>

        <v-bottom-sheet v-model="sheetLoveDetail" scrollable>  
      <v-sheet class="text-center overflow-auto">

          <v-flex xs12 lg6 justify-center class="mx-auto">
          
              <v-card flat>

              <v-list two-line subheader>

                <v-list-item
                    v-for="(user, index) in loveDetail"
                    :key="index"
                    :to="`/user/`+user.user_id"
                >
                    <v-list-item-avatar>
                        <!-- <v-icon :class="item.iconClass">{{item.icon}}</v-icon> -->
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title v-text="user.username"></v-list-item-title>
                    <v-list-item-subtitle v-text="user.user_id"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                    <!-- <v-btn icon @click="deleteItem(item)">
                        <v-icon>delete</v-icon>
                    </v-btn> -->
                    </v-list-item-action>
                </v-list-item>

              </v-list>
              
          </v-card>
          </v-flex>
      
      </v-sheet>
      
    </v-bottom-sheet>

</div>
</template>

<script>
import {firebase, firestore} from '../firebase'
import moment from 'moment'

export default {
    data: () => ({
        loadingPost: false,
        sheetLoveDetail: false,
        loveDetail: [],
        users: [],
        post: [],
    }),
    methods: {
        toProfil: function (id) {
            this.$router.push('/user/'+id)
        },
        toDate: function (date) {
          return moment(date, "MMMM Do YYYY, h:mm:ss a").fromNow();
        },
        deletePost: function (id) {
            // document.getElementById('post_'+index).classList.add('v-card--disabled');
            this.loadingPost = true;
            this.$store.commit('deletePost', id);
            setTimeout(() => {
                this.$router.push('/');
            }, 1000);
            // document.getElementById('post_'+index).classList.remove('v-card--disabled');
        },
        showLikes(data){
          this.loveDetail = data;
          this.sheetLoveDetail = !this.sheetLoveDetail
        },
        lovePost: function (id) {
            // document.getElementById('post_'+index).classList.add('v-card--disabled');
            this.$store.commit('lovePost', id);
            // document.getElementById('post_'+index).classList.remove('v-card--disabled');
        },
        loveColor (loveList) {
          var iterator = 0;
          loveList.forEach(list=>{
            if (list.user_id == this.loginAs.user_id) {
              iterator += 1;
            }
          });

          if (iterator > 0) {
            return 'red';
          }else {
            return 'white';
          }
        },
        backPage(){
            this.$router.go(-1);
        }
    },
    created() {

    },
    computed: {
      loginAs () {
        return this.$store.state.loginAs
      },
    },
    mounted: function() {
        this.loadingPost = true;
        this.$bind('post', firestore.collection('post').doc(this.$route.params.id))
        .then(result => {
              this.loadingPost = false;
        })
    },
  }
</script>