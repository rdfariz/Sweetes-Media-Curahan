<template>
<div>

      <v-container grid-list-xs fluid>
            <v-layout row wrap justify-center>

                <v-flex xs12 md12>
                    <v-layout row wrap>

                        <v-flex xs12 sm12 md6 lg4 pa-1 v-for="(item, i) in items" :key="i">
                            <v-hover v-slot:default="{ hover }">
                                <v-card
                                :elevation="hover ? 12 : 2"
                                 :class="{ 'on-hover': hover }"
                                >
                                <v-img
                                    :src="item.img"
                                    height="225px"
                                >
                                    <v-card-title class="title white--text">
                                    <v-row
                                        class="fill-height flex-column px-4"
                                        justify="space-between"
                                    >
                                        <p class="mt-4 subheading text-left">{{ item.title }}</p>

                                        <div>
                                        <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                                            {{ item.text }}
                                        </p>
                                        <p class="caption font-weight-medium font-italic text-left">
                                            {{ item.subtext }}
                                        </p>
                                        </div>

                                        <div class="align-self-center">
                                        <v-btn
                                            v-for="(icon, index) in icons"
                                            :key="index"
                                            :class="{ 'show-btns': hover }"
                                            color="transparent"
                                            icon
                                        >
                                            <v-icon
                                            :class="{ 'show-btns': hover }"
                                            color="transparent"
                                            >
                                            {{ icon }}
                                            </v-icon>
                                        </v-btn>
                                        </div>
                                    </v-row>
                                    </v-card-title>
                                </v-img>
                                </v-card>
                            </v-hover>
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

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
 }

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>