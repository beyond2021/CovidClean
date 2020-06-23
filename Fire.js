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



class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        });
    }

    getLists(callback) {
        let ref = firebase
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("lists");

            // console.log(ref)

        this.unsubscribe = ref.onSnapshot(snapshot => {
            
            
            
            lists = [];

            snapshot.forEach(doc => {
                // console.log(doc.data());
                lists.push({ id: doc.id, ...doc.data() });
                
            });
            
            callback(lists);
        });
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire;