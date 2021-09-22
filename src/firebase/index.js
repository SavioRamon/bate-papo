import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export const retornaMensagens = (chatID) => {
    
    // retorna uma função que aceita uma função de callback como parâmetro
    // essa função de callback será usada para guardar as mensagens numa react rook

    return function(callback) {
        db.collection("chats").doc(chatID).onSnapshot(doc=>{
            callback(doc.data().mensagens);
        })
    }
}