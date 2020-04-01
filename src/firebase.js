import * as app from 'firebase/app';
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyCTGgohFd6HtE5C4k8-mJawa6L4cHaKEHU",
    authDomain: "sweetes-37.firebaseapp.com",
    databaseURL: "https://sweetes-37.firebaseio.com",
    projectId: "sweetes-37",
    storageBucket: "",
    messagingSenderId: "9074829483",
    appId: "1:9074829483:web:1df66de36056fb4e"
};

app.initializeApp(config)

export const firebase = app;
export const auth     = app.auth();
export const db       = app.database();
export const firestore= app.firestore();
export const _users   = db.ref('users');
export const _post    = db.ref('post');

// firestore.settings({ timestampsInSnapshots: true })