<template>
<div>

  <v-container grid-list-xs fluid>
        <v-layout row wrap justify-center>

            <!-- <v-flex xs12 md11 pa-1 v-if="!loadingPost">
                <v-card height="150" style="display: flex; justify-content: center; align-items: center" color="error">
                  <h1 class="display-1 text-center font-weight-thin mb-3">Yukk curhat disini..</h1>
                </v-card>
            </v-flex> -->

            <v-flex xs12 md12>
                <v-layout row wrap>

                    <!-- <v-flex xs12 pa-1>
                      <v-text-field
                          flat
                          solo-inverted
                          hide-details
                          prepend-inner-icon="search"
                          label="Search"
                          class="hidden-sm-and-down"
                      ></v-text-field>
                    </v-flex> -->

                    <v-flex xs12 pa-1 v-if="!loadingPost">
                      <v-alert v-model="alertContent.show" :type="alertContent.type" close-text="Close Alert" dismissible>
                        {{alertContent.text}}
                      </v-alert>
                        <v-card class="pa-5">
                        <v-text-field @keydown.enter="addPost" v-model="content_post" :append-outer-icon="'send'" @click:append-outer="addPost" counter :maxlength="maxLength" label="Ketikan sesuatu yang kamu rasakan.." clearable>
                        </v-text-field>
                        </v-card>
                    </v-flex>

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

                    <v-flex xs12 sm12 md6 lg4 v-for="(p, index) of post" :key="p.id" pa-1 v-if="!loadingPost">
                      
                        <v-card class="mx-auto" :id="`post_`+index" style="word-wrap: break-word">
                            <v-list-item>
                              <v-list-item-avatar :color="p.createdBy.user_id == loginAs.user_id?'pink':'green'">#</v-list-item-avatar>
                              <v-list-item-content>
                                  <v-list-item-title class="headline">
                                    <router-link style="text-decoration: none !important" :to="`/user/`+p.createdBy.user_id">{{p.createdBy.username}}</router-link>
                                  </v-list-item-title>
                                  <v-list-item-subtitle>{{toDate(p.createdAt)}}</v-list-item-subtitle>
                              </v-list-item-content>
                              <v-spacer></v-spacer>

                              <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                  <v-btn icon small v-on="on">
                                      <v-icon>more_vert</v-icon>
                                  </v-btn>
                                </template>
                                <v-list>
                                  <v-list-item>
                                    <v-list-item-title>Delete</v-list-item-title>
                                  </v-list-item>
                                </v-list>
                              </v-menu>

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
        loadingPost: false,
        sheetLoveDetail: false,
        loveDetail: [],
        users: [],
        post: [],
        content_post: '',
        maxLength: 40,
        alertContent: {
          show: true,
          text: 'Yukk curhat di Sweetes..',
          type: 'info'
        },
    }),
    methods: {
        toProfil: function (id) {
            this.$router.push('/user/'+id)
        },
        toDate: function (date) {
          return moment(date, "MMMM Do YYYY, h:mm:ss a").fromNow();
        },
        alertConf: function (show, text, type) {
            this.alertContent.show = show;
            this.alertContent.text = text;
            this.alertContent.type = type;
        },
        addPost: function () {
            let content_post = this.content_post;
            this.content_post = '';
            if (content_post.length != 0 && content_post.length <= 40) {
              this.$store.commit('createPost', content_post);
              this.alertConf(true, 'Curahan berhasil diposting!', 'success');
            }else {
              this.alertConf(true, 'Curahan tidak boleh kosong!', 'error');
            }
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
        this.$bind('post', firestore.collection('post').orderBy('dateCreate', "desc"))
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