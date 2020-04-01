<template>
<div>

  <v-container grid-list-xs fluid>
        <v-layout row wrap justify-center>

            <v-flex xs12 md12>
                <v-layout row wrap>

                    <v-flex xs12 sm12 md12 lg7 pa-1 >
                        <v-card>

                            <v-app-bar dark color="pink" :src="$store.state.bgImage.src">

                            <v-toolbar-title>Order List</v-toolbar-title>

                            <div class="flex-grow-1"></div>

                            </v-app-bar>

                            <v-list two-line subheader>

                            <v-list-item
                                v-for="(order, index) in order_list"
                                :key="index"
                                @click="orderDetail(order)"
                            >
                                <v-list-item-avatar class="primary">
                                    {{index+1}}
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title v-text="order.invoice"></v-list-item-title>
                                <v-list-item-subtitle v-text="`Rp. ` + order.orderPrice"></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-btn icon>
                                        <v-icon>check</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>

                            </v-list>
                            
                        </v-card>
                    </v-flex>

                    <v-flex xs12 sm12 md12 lg5 pa-1 v-if="order_active != null">
                        <v-card class="mx-auto pa-4" style="display: flex; justify-content: center" v-if="loadingPost">
                            <v-progress-circular
                            :size="70"
                            :width="7"
                            color="blue"
                            indeterminate
                            ></v-progress-circular>
                        </v-card>
                        <v-card v-else>

                            <v-app-bar dark color="pink" :src="$store.state.bgImage.src">
                                <v-toolbar-title>{{order_active.invoice}}</v-toolbar-title>
                                <div class="flex-grow-1"></div>
                                <v-btn icon>
                                    <v-icon>call</v-icon>
                                </v-btn>
                                <v-btn icon @click="order_active = null">
                                    <v-icon>close</v-icon>
                                </v-btn>
                            </v-app-bar>

                            <v-list two-line subheader>
                            <v-subheader>Order By</v-subheader>

                            <v-list-item @click="">
                                <v-list-item-avatar>
                                    <v-icon class="primary">person</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title v-text="order_active.orderBy.name"></v-list-item-title>
                                <v-list-item-subtitle v-text="order_active.orderBy.address"></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>

                                </v-list-item-action>
                            </v-list-item>

                            <v-subheader>Order Item</v-subheader>

                            <v-list-item
                                v-for="(item, index) in order_active.orderItem"
                                :key="index"
                                @click=""
                            >
                                <v-list-item-avatar>
                                    <v-icon :class="item.iconClass">{{item.icon}}</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                                <v-list-item-subtitle v-text="`Rp. `+order_active.orderPrice"></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>

                                </v-list-item-action>
                            </v-list-item>

                            <v-divider/>

                            <v-list-item>
                                <v-list-item-avatar>
                                <v-icon
                                >attach_money</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title>Total</v-list-item-title>
                                <v-list-item-subtitle v-text="`Rp. `+order_active.orderPrice"></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                <v-btn icon>
                                    <v-icon>info</v-icon>
                                </v-btn>
                                </v-list-item-action>
                            </v-list-item>

                            </v-list>
                            
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

export default {
    data: () => ({
        shopping_cart: [],
        order_list: [],
        order_active: null,
        priceAll: 0,
        loadingPost: false
    }),
    created(){
        this.order_list = this.$store.state.order_list;
        this.shopping_cart = this.$store.state.shopping_cart;
        this.calculatePrice();
    },
    methods: {
      orderDetail(data){
        this.loadingPost = true;
        this.order_active = data;
        setTimeout(() => {
            this.loadingPost = false;
        }, 300);
      },
      calculatePrice(){
          this.priceAll = 0;
          this.$store.state.shopping_cart.forEach(data => {
              this.priceAll += data.price
          })
      },
    }
  }
</script>