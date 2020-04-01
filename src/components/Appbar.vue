<template>
    <div>
        <v-navigation-drawer
        v-model="drawer"
        app
        :clipped="clipped"
        :left="clipped"
        :expand-on-hover="expand"
        >

        <v-list dense shaped>

            <v-list-item two-line @click="pushTo('profil')">
                <v-list-item-avatar color="pink">#</v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{this.$store.state.loginAs.data.username}}</v-list-item-title>            
                    <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider class="mt-2 mb-2"></v-divider>

            <template v-for="item in items">
                
                <v-list-item
                v-if="item.child.length == 0"
                :key="item.text"
                :class="item.text === $route.name ? 'v-list-item--active': ''"
                @click="pushTo(item.act)"
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                        {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group
                    v-else
                    v-model="item.active"
                    :key="item.text"
                    :prepend-icon="item.icon"
                    no-action
                >
                
                    <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                    </template>

                    <v-list-item
                    v-for="subItem in item.child"
                    :key="subItem.text"
                    :to="subItem.act"
                    >
                    <v-list-item-action>
                        <v-icon>{{ subItem.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.text"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-group>

            </template>
            
        </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="pink darken-2" dark :clipped-left="clipped" :src="bgImage.src">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Sweetes</v-toolbar-title>
            
            <v-spacer></v-spacer>

            <div class="flex-grow-1"></div>

            <v-btn icon @click="sheet = !sheet">
                <v-icon>settings</v-icon>
            </v-btn>

            
            <v-btn icon @click="sheetMusic = !sheetMusic">
                <v-icon>music_note</v-icon>
            </v-btn>

            <v-btn icon @click="sheetCart = !sheetCart">
                <v-badge color="grey">
                    <template v-slot:badge>
                    <span>{{$store.state.shopping_cart.length}}</span>
                    </template>
                    <v-icon>shopping_cart</v-icon>
                </v-badge>
            </v-btn>

            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-app-bar>



        <v-bottom-sheet v-model="sheet" scrollable>
            <v-sheet class="text-center">

                <v-btn class="mt-6" flat color="red" @click="sheet = !sheet">close</v-btn>
                <v-btn class="mt-6" flat color="primary" @click="toggleBgApp">Toggle Background App</v-btn>
                
                <v-flex xs12 lg6 justify-center class="mx-auto" v-if="shopping_cart.length != 0">
                    <v-card>

                        <v-list two-line subheader>
                            <!-- <v-subheader>Settings Drawer</v-subheader> -->

                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-icon>web_asset</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title v-text="">Status Drawer</v-list-item-title>
                                    <v-list-item-subtitle v-text="">Deactive/Active</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-switch v-model="drawer"></v-switch>
                                </v-list-item-action>
                            </v-list-item>
                            
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-icon>web</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title v-text="">Clipped Drawer</v-list-item-title>
                                    <v-list-item-subtitle v-text="">Deactive/Active</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                     <v-switch v-model="clipped"></v-switch>
                                </v-list-item-action>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-icon>web_asset</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title v-text="">On hover Drawer</v-list-item-title>
                                    <v-list-item-subtitle v-text="">Deactive/Active</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                     <v-switch v-model="expand"></v-switch>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                        
                    </v-card>
                </v-flex>

            </v-sheet>
        </v-bottom-sheet>

        <v-bottom-sheet v-model="sheetCart" scrollable>
            
            <v-sheet class="text-center overflow-auto">
                <v-btn class="mt-6" color="error" @click="sheetCart = !sheetCart">close</v-btn>

                <v-btn class="mt-6" color="primary" to="/cart" @click="sheetCart = !sheetCart" v-if="shopping_cart.length != 0">To Payment</v-btn>

                <v-flex xs12 lg6 justify-center class="mx-auto" v-if="shopping_cart.length != 0">
                    <v-card>

                        <v-list two-line subheader>
                        <v-subheader>List Cart</v-subheader>

                        <v-list-item
                            v-for="(item, index) in shopping_cart"
                            :key="index"
                            @click=""
                        >
                            <v-list-item-avatar>
                                <v-icon :class="item.iconClass">{{item.icon}}</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                            <v-list-item-subtitle v-text="`Rp. `+item.price"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                            <v-btn icon @click="deleteItem(item)">
                                <v-icon>delete</v-icon>
                            </v-btn>
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
                            <v-list-item-subtitle v-text="`Rp. `+priceAll"></v-list-item-subtitle>
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

                 <v-flex xs12 text-center mt-5 v-else>
                    <p>Belum ada barang yang ditambahkan<br><br></p>
                </v-flex>
            
            </v-sheet>            
        </v-bottom-sheet>

        <v-bottom-sheet v-model="sheetMusic" scrollable>
            <v-card tile>
                <v-progress-linear
                :value="50"
                class="my-0"
                height="3"
                ></v-progress-linear>

                <v-list>
                <v-list-item>
                    <v-list-item-content>
                    <v-list-item-title>The Walker</v-list-item-title>
                    <v-list-item-subtitle>Fitz & The Trantrums</v-list-item-subtitle>
                    </v-list-item-content>

                    <div class="flex-grow-1"></div>

                    <v-list-item-icon>
                    <v-btn icon>
                        <v-icon>fast_rewind</v-icon>
                    </v-btn>
                    </v-list-item-icon>

                    <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
                    <v-btn icon>
                        <v-icon>pause</v-icon>
                    </v-btn>
                    </v-list-item-icon>

                    <v-list-item-icon
                    class="ml-0"
                    :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
                    >
                    <v-btn icon>
                        <v-icon>fast_forward</v-icon>
                    </v-btn>
                    </v-list-item-icon>
                </v-list-item>
                </v-list>
            </v-card>
        </v-bottom-sheet>

    </div>
</template>

<script>
export default {
    data: () => ({
        sheet: false,
        sheetCart: false,
        sheetMusic: false,
        drawer: null,
        clipped: true,
        expand: null,
        bgApp: false,
        items: [
            // { icon: 'dashboard', text: 'Dashboard', act: 'dashboard', child: [] },
            // { icon: 'settings', text: 'Settings', act: 'settings', child: [] },
            { icon: 'timeline', text: 'Timeline', act: 'timeline', child: [] },
            // { icon: 'chat_bubble', text: 'Chat', act: 'chat', child: [] },
            { icon: 'description', text: 'Blog', act: 'blog', child: [] },
            // { icon: 'music_note', text: 'Music', act: 'music', child: [] },
            { icon: 'shopping_cart', text: 'Market', active: true, child: [
                {icon: 'fastfood', text: 'Food Market', act: 'shop'},
                {icon: 'list', text: 'Order List', act: 'orderlist'},
                {icon: 'shopping_cart', text: 'Cart', act: 'cart'}
            ]},
            { icon: 'view_list', text: 'CRUD', act: 'crud', child: [] },
            // { icon: 'fastfood', text: 'Food Market', act: 'shop', child: [] },
            // { icon: 'list', text: 'Order List', act: 'orderlist', child: [] },
            { icon: 'logout', text: 'Logout', act: 'logout', child: [] },
        ],
        initializeCart: [
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
            }
        ]
    }),
    created(){
        this.initializeCart.forEach(item => {
            this.addToCart(item);
        })
    },
    computed: {
        bgImage() {
            return this.$store.state.bgImage;
        },
        shopping_cart(){
            return this.$store.state.shopping_cart;
        },
        priceAll(){
            return this.$store.state.priceAll;
        }
    },
    methods: {
        toggleBgApp () {
            this.$store.commit('toggleBgApp')
        },
        pushTo (act) {
            if (act == 'logout') {
                this.$store.commit('logout');
            }else if (act == 'profil') {
                this.$router.push('/user/'+this.$store.state.loginAs.user_id);
            }else{
                this.$router.push('/'+act);
            }
        },
        addToCart(newData){
            this.$store.commit('addToCart', newData);
        },
        deleteItem(data){
            this.$store.commit('deleteItem', data);
        }
    }
}
</script>

<style>
    .v-list-group__items a.v-list-item--active {
        color: #f0f0f0 !important;
    }
</style>