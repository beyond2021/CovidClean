import react from 'react';
import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBFcT2nfjrJ9vjvBpBf_6WVRXpIm0l6MB8",
    authDomain: "covidcare-79c01.firebaseapp.com",
    databaseURL: "https://covidcare-79c01.firebaseio.com",
    projectId: "covidcare-79c01",
    storageBucket: "covidcare-79c01.appspot.com",
    messagingSenderId: "167539698380",
    appId: "1:167539698380:web:7b2fffb68b76f353033069",
    measurementId: "G-BWGBBR3VW5"
};


export async function getLists(postsReceived){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    db = firebase.firestore()
    ref = db
        .collection("users")
        .doc("Pzs8YHxggDcyahrUXKen")
        .collection("lists");
    ref.onSnapshot(querySnapshot => {

        
        const list = [];
        querySnapshot.forEach(doc => {

            console.log("kev d =", doc.data())
          const { title, complete } = doc.data();
          list.push({
            id: doc.id,
            title,
            complete,
          });
        });

        [postsReceived(list)];

    } ); 
    
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