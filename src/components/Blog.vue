<template>
<div>

      <v-container grid-list-xs fluid>
            <v-layout row wrap justify-center>

                <v-flex xs12 md12>
                    <v-layout row wrap>

                        <v-flex xs12 sm12 md6 lg4 pa-1 v-for="i in 8" :key="i">
                            <v-card>
                                <v-list-item>
                                <v-list-item-avatar color="pink"></v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
                                    <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
                                </v-list-item-content>
                                </v-list-item>

                                <v-img
                                src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                                height="194"
                                ></v-img>

                                <v-card-text>
                                Visit ten places on our planet that are undergoing the biggest changes today.
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn color="primary">Read</v-btn>
                                    <v-btn color="orange">Bookmark</v-btn>
                                <div class="flex-grow-1"></div>
                                <v-btn icon>
                                    <v-icon>love</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>share</v-icon>
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>

                    </v-layout>
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
      icons: ['fast_rewind', 'play_arrow', 'fast_forward'],
      items: [
        {
          title: 'New Releases',
          text: "It's New Release Friday",
          subtext: 'Newly released songs. Updated daily.',
          img: 'http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg',
        },
        {
          title: 'Rock',
          text: 'Greatest Rock Hits',
          subtext: 'Lose yourself in rock tunes.',
          img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        },
        {
          title: 'Mellow Moods',
          text: 'Ambient Bass',
          subtext: 'Chill beats to mellow you out.',
          img: 'http://lorempixel.com/output/abstract-q-c-640-480-6.jpg',
        },
        {
          title: 'AKB48',
          text: "It's New Release Friday",
          subtext: 'Newly released songs. Updated daily.',
          img: 'https://img.youtube.com/vi/UO6FY4kJ4Y4/hqdefault.jpg',
        },
      ],
      transparent: 'rgba(255, 255, 255, 0)',
    }),
  }
</script>