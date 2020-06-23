import react from 'react';
import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB1tWZlrsXIdnN--geIofLv4zf5EV5pDf4",
    authDomain: "covid-clean-6130a.firebaseapp.com",
    databaseURL: "https://covid-clean-6130a.firebaseio.com",
    projectId: "covid-clean-6130a",
    storageBucket: "covid-clean-6130a.appspot.com",
    messagingSenderId: "173106121170",
    appId: "1:173106121170:web:e262837dde6ca4fe57a00b",
    measurementId: "G-9SNK3NZGSN"
};


export async function getPosts(postsReceived){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }


    var postList = [];
    var snapshot = await firebase.firestore()
    .collection('lists')
    .orderBy('timestamp')
    .get()

    snapshot.forEach((doc) => {
        postList.push(doc.data());
    });
    console.log(postList)
   
    // 
    
    [postsReceived(postList)];
    
}

export async function getUsers(usersReceived){
    var userList = [];
    var snapshot = await firebase.firestore()
    .collection('users')
    .orderBy('uid')
    .get()

    snapshot.forEach((doc) => {
        postList.push(doc.data());
    });

    [postsReceived(userList)];
    
}