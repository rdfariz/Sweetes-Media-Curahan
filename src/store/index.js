import Vue from 'vue'
import Vuex from 'vuex'
import {firebase, firestore} from '../firebase'
import router from '../router'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        darkMode: true,
        bgImage: {
            src: ""
        },
        post: [],
        loginAs: {
            user_id: '',
            data: {
                username: localStorage.getItem('username')
            },
            status: null
        },
        shopping_cart: [],
        priceAll: 0,
        order_list: [
            {
                id: 1,
                invoice: '#5314623',
                orderBy: {
                    name: 'Agus',
                    address: 'JL.Mawar IV no.98 GSI Sumber'
                },
                orderItem: [
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
                ],
                orderPrice: 22000 
            },
            {
                id: 2,
                invoice: '#6341235',
                orderBy: {
                    name: 'Rono',
                    address: 'Sukapura 82, Bojongsoang Bandung'
                },
                orderItem: [
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
                ],
                orderPrice: 20000 
            },
            {
                id: 3,
                invoice: '#3215321',
                orderBy: {
                    name: 'Kiki',
                    address: 'JL. Seloka no. 77 Tukmudal Sumber'
                },
                orderItem: [
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
                ],
                orderPrice: 20000 
            }
        ],
    },
    mutations: {
        addToCart(state, data){
            state.shopping_cart.push(data);
            if (state.priceAll < 0) {
                state.priceAll = 0
            }else {
                state.priceAll += data.price
            }
        },
        deleteItem(state, data){
            state.shopping_cart.splice(data.id,1);
            if (state.priceAll < 0) {
                state.priceAll = 0
            }else {
                state.priceAll -= data.price
            }
        },
        toggleTheme (state) {
            state.darkMode = !state.darkMode;
            // localStorage.setItem('darkMode', state.darkMode);
        },
        toggleBgApp (state) {
            if (state.bgImage.src == "") {
                state.bgImage.src = "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg";
            }else {
                state.bgImage.src = "";
            }
        },
        loginAs (state) {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    firestore.collection('users').doc(user.uid).get().then(result=>{
                        if (localStorage.getItem('uid') != user.uid || localStorage.getItem('uid') == null) {
                            localStorage.setItem('uid', user.uid)
                        }

                        localStorage.setItem('username', result.data().username)
                        
                        state.loginAs.user_id = result.id
                        state.loginAs.data   = result.data()
                        state.loginAs.status = true
                    }).catch(err=>{
                        
                    });
                }else {
                    firebase.auth().signOut()
                    .then((result)=>{
                        state.loginAs.user_id = ''
                        state.loginAs.data   = ''
                        state.loginAs.status = false
                    })
                }
            });
        },
        logout (state) {
            localStorage.removeItem('uid');
            firebase.auth().signOut()
            .then((result)=>{
                state.loginAs.user_id = '';
                state.loginAs.data    = '';
                state.loginAs.status  = false
                router.push('/login');
            })
        },
        createPost (state, postData) {
            firestore.collection('post').add({
                content: postData,
                love: [],
                createdBy: {
                    user_id: firebase.auth().currentUser.uid,
                    username: state.loginAs.data.username
                },
                dateCreate: new Date(),
                createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            }).then(result=>{
                
            })
        },
        deletePost (state, id) {
            let data = firestore.collection('post').doc(id);
            data.get().then(result=>{
                if (result.data().createdBy.user_id == state.loginAs.user_id) {
                    data.delete();
                }
            });
        },
        loveColor (state, status) {
            if (status == 'clicked') {
                return 'red';
            }else {
                return 'white';
            }
        },
        lovePost (state, id) {
            let data = firestore.collection('post').doc(id);
            let user = {
                user_id: state.loginAs.user_id,
                username: state.loginAs.data.username
            }
            
            firestore.collection('post')
            .where(firebase.firestore.FieldPath.documentId(), '==', id)
            .where('love','array-contains', user)
            .get().then(result=>{
                if (result.docs.length === 0) {
                    data.update({
                        love: firebase.firestore.FieldValue.arrayUnion(user)
                    })
                }else {
                    data.update({
                        love: firebase.firestore.FieldValue.arrayRemove(user)
                    })
                }
            });
        }
    },
    actions: {

    }
})