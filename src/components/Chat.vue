<template>
    <div>
                <v-flex xs12 md12 lg12 v-if="activeChat.status == false">

                    <v-app-bar
                    dark
                    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                    >

                    <v-toolbar-title>My Contacts</v-toolbar-title>

                    <div class="flex-grow-1"></div>

                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>

                    </v-app-bar>

                    <v-sheet
                        id="playground-example"
                        class="overflow-y-auto"
                        min-height="550"
                    >
                        <v-container>
                            <v-list subheader shaped>
                                <v-subheader>Recent chat</v-subheader>

                                <v-list-item
                                    v-for="item in items"
                                    :key="item.title"
                                    @click="toActiveChat(item)"
                                >
                                    <v-list-item-avatar>
                                    <v-img :src="item.avatar"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                    </v-list-item-content>

                                    <v-list-item-icon>
                                    <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                                </v-list>

                                <v-divider></v-divider>

                                <v-list subheader>
                                <v-subheader>Previous chats</v-subheader>

                                <v-list-item
                                    v-for="item in items2"
                                    :key="item.title"
                                    @click=""
                                >
                                    <v-list-item-avatar>
                                    <v-img :src="item.avatar"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-container>
                    </v-sheet>

                </v-flex>

                <v-flex xs12 md12 lg12 v-else>
                    
                    <v-app-bar
                    dark
                    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                    >

                    <v-toolbar-title>{{activeChat.dataUser.title}}</v-toolbar-title>

                    <div class="flex-grow-1"></div>

                    <v-btn icon>
                        <v-icon>video_call</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>call</v-icon>
                    </v-btn>

                    <v-btn icon @click="toCloseChat()">
                        <v-icon>close</v-icon>
                    </v-btn>

                    </v-app-bar>

                    <v-sheet
                        id="playground-example"
                        class="overflow-y-auto"
                        max-height="550"
                    >
                        <v-container style="min-height: 550px;">

                        </v-container>
                    </v-sheet>
                </v-flex>


        <v-bottom-sheet v-model="userDetail.status" inset>
        <template v-slot:activator="{ on }">
          
        </template>
        <v-sheet class="text-center" >
            <v-btn
            class="mt-6"
            text
            color="error"
            @click="userDetail.status = !userDetail.status"
            >close</v-btn>
            <div class="my-3">This is a bottom sheet using the inset prop</div>

            <v-card
                max-width="375"
                class="mx-auto"
            >
                <v-img
                src="https://cdn.vuetifyjs.com/images/lists/ali.png"
                height="300px"
                dark
                >
                <v-row class="fill-height">
                    <v-card-title>
                    <v-btn dark icon>
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>

                    <div class="flex-grow-1"></div>

                    <v-btn dark icon class="mr-4">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>

                    <v-btn dark icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    </v-card-title>

                    <div class="flex-grow-1"></div>

                    <v-card-title class="white--text pl-12 pt-12">
                    <div class="display-1 pl-12 pt-12">Ali Conners</div>
                    </v-card-title>
                </v-row>
                </v-img>

                <v-list two-line>
                <v-list-item @click="">
                    <v-list-item-icon>
                    <v-icon color="indigo">mdi-phone</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>(650) 555-1234</v-list-item-title>
                    <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                    <v-icon>mdi-message-text</v-icon>
                    </v-list-item-icon>
                </v-list-item>

                <v-list-item @click="">
                    <v-list-item-action></v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>(323) 555-6789</v-list-item-title>
                    <v-list-item-subtitle>Work</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                    <v-icon>mdi-message-text</v-icon>
                    </v-list-item-icon>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item @click="">
                    <v-list-item-icon>
                    <v-icon color="indigo">mdi-email</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>aliconnors@example.com</v-list-item-title>
                    <v-list-item-subtitle>Personal</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="">
                    <v-list-item-action></v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>ali_connors@example.com</v-list-item-title>
                    <v-list-item-subtitle>Work</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item @click="">
                    <v-list-item-icon>
                    <v-icon color="indigo">mdi-map-marker</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>1400 Main Street</v-list-item-title>
                    <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
            </v-card>
        </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>
  export default {
    data: () => ({
        userDetail: {
            dataUser: null,
            status: false
        },
        activeChat: {
            dataUser: null,
            status: false
        },
        items: [
            { id: 1, active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
            { id: 2, active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
            { id: 3, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
            { id: 4, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
            { id: 5, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
            { id: 6, active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
            { id: 7, active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
            { id: 8, active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
            { id: 9, active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
            { id: 10, active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },

        ],
        items2: [
            { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        ],
    }),
    methods: {
        toActiveChat(dataUser) {
            this.activeChat.dataUser = dataUser;
            this.activeChat.status = true;
        },
        toCloseChat(){
            this.activeChat.status = false;
            this.activeChat.dataUser = null;
        }
    }
  }
</script>
