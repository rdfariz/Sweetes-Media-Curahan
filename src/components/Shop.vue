<template>
<div>

  <v-container grid-list-xs fluid>
        <v-layout row wrap justify-center>

            <v-flex xs12 md12>
                <v-layout row wrap>

                    <v-flex xs12 sm12 md6 lg4 pa-1 v-for="(product, index) in products" :key="index">
                        
                        <v-hover v-slot:default="{ hover }">
                          <v-card
                            class="mx-auto"
                            max-width="600"
                          >
                            <v-img
                              :aspect-ratio="16/9"
                              :src="product.img"
                            >
                              <v-expand-transition>
                                <div
                                  v-if="hover"
                                  class="d-flex transition-fast-in-fast-out pink darken-2 v-card--reveal display-3 white--text"
                                  style="height: 100%;"
                                >
                                  Rp. {{product.price}}
                                </div>
                              </v-expand-transition>
                            </v-img>
                            <v-card-text
                              style="position: relative;"
                            >
                              <v-btn
                                absolute
                                :color="product.iconClass"
                                class="white--text"
                                fab
                                right
                                top
                                @click="addToCart(product)"
                              >
                                <v-icon>add_shopping_cart</v-icon>
                              </v-btn>
                              <div class="mb-2">
                                <v-btn
                                  color="pink"
                                  class="white--text"
                                  :to="`/shop/`+product.by.id"
                                >
                                  <v-icon>restaurant</v-icon>{{product.by.name}}
                                </v-btn>
                                <!-- <router-link style="text-decoration: none !important" :to="`/shop/`+product.by.id"></router-link> -->
                              </div>
                              <h3 class="display-1 font-weight-light">{{product.title}}</h3>
                              <div class="font-weight-light mb-2 grey--text">
                                {{product.desc}}
                              </div>
                            </v-card-text>
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

  export default {
    data: () => ({
      colors: [
          'primary',
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
      products: [
        {
          title: 'Nasi Goreng',
          desc: 'Nasi Goreng Mas Udin',
          by: {
            id: 7683571,
            name: 'Udin sedunia'
          },
          price: 14000,
          iconClass: 'amber white--text',
          icon: 'fastfood',
          img: 'https://www.masakapahariini.com/wp-content/uploads/2019/01/nasi-goreng-spesial-620x440.jpg',
        },
        {
          title: 'Bubble Tea',
          desc: 'Bubble Tea Wenak',
          by: {
            id: 1664131,
            name: 'JonoTea'
          },
          price: 8000,
          iconClass: 'blue white--text',
          icon: 'local_drink',
          img: 'https://awsimages.detik.net.id/community/media/visual/2019/06/17/2d3655c7-ccaa-4c2f-9b66-f6c4d00311ce_169.jpeg?w=700&q=90',
        },
        {
          title: 'Ramen',
          desc: 'Ramen Complete Topping',
          by: {
            id: 8492785,
            name: 'FunJapan'
          },
          price: 20000,
          iconClass: 'amber white--text',
          icon: 'fastfood',
          img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190208-delish-ramen-horizontal-093-1550096715.jpg?crop=1xw:0.9995002498750624xh;center,top&resize=480:*',
        },
      ]
    }),
    methods: {
      addToCart(newData){
        this.$store.commit('addToCart', newData);
      }
    }
  }
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .6;
  position: absolute;
  width: 100%;
}
</style>