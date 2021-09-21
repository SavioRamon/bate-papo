import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export const retornaMensagens = async (chatID) => {
    const mensagens = await db.collection("chats").doc(chatID).get().then(doc=>doc.data().mensagens);
    return mensagens;
}