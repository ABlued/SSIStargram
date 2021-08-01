import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';
import  'firebase/analytics'
const firebaseConfig = {
    apiKey: "AIzaSyAmqFNuNMnOykhBTJBvyICDDMYk4i4kAgI",
    authDomain: "image-community-86bc5.firebaseapp.com",
    projectId: "image-community-86bc5",
    storageBucket: "image-community-86bc5.appspot.com",
    messagingSenderId: "645060144852",
    appId: "1:645060144852:web:3f0975ffafd57b530e1541",
    measurementId: "G-RD87YVRE9P"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();       // 인증 모듈
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();
const analytics = firebase.analytics();
export {auth, apiKey, firestore, storage, realtime, analytics};