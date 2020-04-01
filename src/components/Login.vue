<template>
    <div>
        <v-container grid-list-xs>
            <v-layout row wrap justify-center>
                <v-flex xs12 md6>
                    <v-card :loading="loadingStatus">
                        <v-tabs
                        v-model="tab"
                        color="white"
                        fixed-tabs background-color="indigo" dark>

                        <v-tab
                            v-for="item in items"
                            :key="item"
                            @click="alertContent.show=false"
                        >
                            {{ item }}
                        </v-tab>
                        </v-tabs>

                        <v-alert v-model="alertContent.show" :type="alertContent.type" close-text="Close Alert" dismissible>
                            {{alertContent.text}}
                        </v-alert>

                        <v-tabs-items v-model="tab">
                            <v-tab-item v-for="(item, index) in items" :key="item">

                                <v-card flat v-if="index == 0">
                                    <v-card-text>
                                        <v-text-field
                                            v-model="email"
                                            hint="Input your email address"
                                            label="Email"
                                            @keyup.enter="login"
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="password"
                                            :append-icon="iconShow ? 'visibility' : 'visibility_off'"
                                            :type="iconShow ? 'text' : 'password'"
                                            name="input-10-2"
                                            label="Password"
                                            hint="At least 8 characters"
                                            value=""
                                            class="input-group--focused"
                                            @click:append="iconShow = !iconShow"
                                            @keyup.enter="login"
                                        ></v-text-field>
                                    </v-card-text>                
                                    <v-card-actions>
                                        <v-layout row wrap justify-center>
                                            <v-btn color="primary" @click="login" style="width: 97.5%">
                                            Login
                                            </v-btn>
                                        </v-layout>
                                    </v-card-actions>
                                </v-card>
                                <v-card flat v-else-if="index == 1">
                                    <v-card-text>
                                        <v-text-field
                                            v-model="emailRegister"
                                            hint="Input your email address"
                                            label="Email"
                                            @keyup.enter="register"
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="username"
                                            counter
                                            :maxlength="maxlength"
                                            hint="Input your username"
                                            label="Username"
                                            @keyup.enter="register"
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="passwordRegister"
                                            :append-icon="iconShow ? 'visibility' : 'visibility_off'"
                                            :type="iconShow ? 'text' : 'password'"
                                            name="input-10-2"
                                            label="Password"
                                            hint="At least 8 characters"
                                            class="input-group--focused"
                                            @click:append="iconShow = !iconShow"
                                            @keyup.enter="register"
                                        ></v-text-field>
                                    </v-card-text>                
                                    <v-card-actions>
                                        <v-layout row wrap justify-center>
                                            <v-btn color="error" @click="register" style="width: 97.5%">
                                            Register
                                            </v-btn>
                                        </v-layout>
                                    </v-card-actions>
                                </v-card>
                                
                                <v-card flat v-else-if="index == 2">            
                                    <v-card-text style="text-align: center">
                                        <p>Created by</p>
                                        <a href="https://www.instagram.com/rd_fariz/" target="_blank"><v-btn color="primary">@rdfariz</v-btn></a>
                                    </v-card-text>
                                </v-card>

                            </v-tab-item>
                        </v-tabs-items>
                        
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>
<script>
import {firebase, firestore} from '../firebase'

export default {
    data() {
        return {
            tab: null,
            items: [
            'Login', 'Register', 'About',
            ],
            loadingStatus: false,
            email: 'demo@example.com',
            password: '03072000',
            emailRegister: '',
            passwordRegister: '',
            username: '',
            title: '',
            maxlength: 10,
            alertContent: {
                show: false,
                text: '',
                type: 'success'
            },
            iconShow: false
        }
    },
    methods: {
        alertConf: function (show, text, type) {
            this.alertContent.show = show;
            this.alertContent.text = text;
            this.alertContent.type = type;
        },
        exeRegister: function (input) {
            this.loadingStatus = true;
            if (this.username.length < 10 && this.username.length > 0) {
                firestore.collection('users').where('username','==',input).get()
                .then(snapshot=>{
                    if (snapshot.docs.length === 0) {
                        firebase.auth().createUserWithEmailAndPassword(this.emailRegister, this.passwordRegister)
                        .then((result)=>{
                            firestore.collection('users').doc(result.user.uid).set({
                                username: this.username
                            }).then((act)=>{
                                this.alertConf(true, 'Register Success!', 'success');
                                this.loadingStatus = false;
                            });
                        }).catch((err)=>{
                            this.alertConf(true, err.message, 'error');
                            this.loadingStatus = false;
                        });
                    }else {
                        this.alertConf(true, 'Username already exist!', 'error');
                        this.loadingStatus = false;
                    }
                })
            }else {
                this.alertConf(true, 'Username not able to empty!', 'error');
                this.loadingStatus = false;
            }
        },
        register: function () {
            this.exeRegister(this.username);
        },
        login: function () {
            this.loadingStatus = true;
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((result)=>{
                localStorage.setItem('uid', firebase.auth().currentUser.uid);
                this.$router.push('/timeline');
                this.loadingStatus = false;
            }).catch((err)=>{
                this.alertConf(true, err.message, 'error');
                this.loadingStatus = false;
            })
        }
    }
}
</script>
<style>
.v-application--is-ltr .v-tabs-bar.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows)>.v-slide-group__wrapper>.v-tabs-bar__content>.v-tab:first-child, .v-application--is-ltr .v-tabs-bar.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows)>.v-slide-group__wrapper>.v-tabs-bar__content>.v-tabs-slider-wrapper+.v-tab {
    margin-left: auto !important;
}
</style>

