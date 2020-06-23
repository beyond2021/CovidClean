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
}



class Fire{
    constructor(callback) {
        this.init(callback)
    }
    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {

            if (user) {
                callback(null, user);

            } else {

                firebase.auth().signInAnonymously().catch( error => {
                    firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {});
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


    this.unsubscribe = ref.onSnapshot(snapshot => {

        
        lists = [];

        snapshot.forEach(doc => {

            lists.push({ id: doc.id, ...doc.data() });
           
            
        });
        
        // console.log(snapshot)

        callback(lists);
    });        

    }
    
    get userId() {
        return firebase.auth().currentUser.uid;
    }
}



export default Fire;