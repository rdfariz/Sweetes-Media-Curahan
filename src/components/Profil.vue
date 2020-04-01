<template>
<div>   

    <v-container grid-list-xs fluid>
        <v-layout row wrap justify-center>
            <v-flex xs12 md12>
                <v-layout row wrap>

                    <v-flex xs12 pa-1 v-if="loadingPost">
                        <v-card class="mx-auto pa-4" style="display: flex; justify-content: center; align-items: center"
                        height="150">
                        <v-progress-circular
                            :size="70"
                            :width="7"
                            color="blue"
                            indeterminate
                        ></v-progress-circular>
                        </v-card>
                    </v-flex>

                    <v-flex xs21 sm12 md12 pa-1 v-if="!loadingPost">

                        <v-toolbar class="px-4">
                            <v-btn icon small @click="backPage">
                                <v-icon>arrow_back</v-icon>
                            </v-btn>

                            <v-toolbar-title>
                                Profil / {{this.$route.params.id}}
                            </v-toolbar-title>
                        </v-toolbar>
                        
                        <v-card class="mx-auto px-4">
                            <v-list-item>
                            <v-list-item-avatar :color="user.username != loginAs.data.username?'green':'pink'">#</v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="headline">{{user.username}}</v-list-item-title>
                                <v-list-item-subtitle>Curahan: {{post.length}}</v-list-item-subtitle>
                            </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-flex>

                    <v-flex xs12 sm12 md12 lg12 v-for="(p, index) of post" :key="p.id" pa-1 v-if="!loadingPost">
                        <v-card class="mx-auto px-4" :id="`post_`+index" style="word-wrap: break-word">
                            <v-list-item>
                            <v-list-item-avatar :color="p.createdBy.user_id == loginAs.user_id?'pink':'green'">#</v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="headline">{{p.createdBy.username}}</v-list-item-title>
                                <v-list-item-subtitle>{{toDate(p.createdAt)}}</v-list-item-subtitle>
                            </v-list-item-content>
                            </v-list-item>

                            <v-card-text style="color: white">
                                <div style="border-left: 3.5px solid #4caf50; padding-left: 7.5px;">
                                <p>{{p.content}}</p>                                
                                </div>
                                <span>Disukai oleh: </span>
                                <template v-if="p.love.length == 0">
                                    <span>-</span>
                                </template>
                                <template v-else v-for="(love, index) in p.love">
                                    <router-link v-if="index < 2" :to="`/user/`+love.user_id">{{love.username}}</router-link>
                                    <span v-if="index < 2">, </span>
                                    <a v-if="index == 2" @click="showLikes(p.love)">Lihat semua</a>
                                </template>
                            </v-card-text>
                            <v-divider/>
                            <v-card-actions>
                                <v-btn icon small :to="`/timeline/`+p.id">
                                  <v-icon dark>launch</v-icon>
                                </v-btn>
                                <v-btn :color="loveColor(p.love)" icon small @click="lovePost(p.id, index)">
                                  <v-icon dark>favorite</v-icon>
                                </v-btn>
                                {{p.love.length}}
                                <v-btn icon small v-if="p.createdBy.user_id == loginAs.user_id" @click="deletePost(p.id, index)">
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
import router from '../router'
import moment from 'moment'

export default {
    data: () => ({
        sheetLoveDetail: false,
        loveDetail: [],
        user: [],
        post: [],
        loadingPost: false
    }),
    methods: {
        backPage(){
            this.$router.go(-1);
        },
        toDate: function (date) {
          return moment(date, "MMMM Do YYYY, h:mm:ss a").fromNow();
        },
        showLikes(data){
          this.loveDetail = data;
          this.sheetLoveDetail = !this.sheetLoveDetail
        },
        deletePost: function (id, index) {
            document.getElementById('post_'+index).classList.add('v-card--disabled');
            this.$store.commit('deletePost', id);
            // document.getElementById('post_'+index).classList.remove('v-card--disabled');
        },
        lovePost: function (id, index) {
            document.getElementById('post_'+index).classList.add('v-card--disabled');
            this.$store.commit('lovePost', id);
            document.getElementById('post_'+index).classList.remove('v-card--disabled');
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
        logout: function () {
            this.$store.commit('logout');
        },
        initialize(id){
            this.sheetLoveDetail = false;
            this.$store.commit('loginAs');
            this.loadingPost = true;
            this.$bind('user', firestore.collection('users').doc(id))
            this.$bind('post', firestore.collection('post').where('createdBy.user_id', '==', id))
            .then(result => {
                this.loadingPost = false
            })
        }
    },
    watch: {
        '$route.params.id': function (id) {
            this.initialize(id);
        }
    },
    mounted: function() {
        this.initialize(this.$route.params.id);
    },
    computed: {
      loginAs () {
        return this.$store.state.loginAs
      },
    },
}
</script>