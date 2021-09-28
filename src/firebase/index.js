import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export const retornaDadosUsuario = usuarioID => {
    const usuarioDados = db.collection("usuarios").doc(usuarioID).get()
        .then(doc => {    
            const { nome, id } = doc.data();
            return {
                nome,
                id
            }
        });

    return usuarioDados;

}

export const autoLogin = ()=>{

    return new Promise((resolve, reject)=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                resolve(uid);
            }
        })
    })
    
}

export const fazerLogin = async (email, senha)=>{
    const usuario = await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(dados => dados.user)
        .catch(erro=>{
            alert(erro.message);
        })

    if(usuario) {
        return usuario.uid;
    }
}



export const novoUsuario = async (nome, email, senha)=>{
    
    const usuario = await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(dados => dados.user)
        .catch(erro=>{
            alert(erro.message);
        })

    if(usuario) {
        db.collection("usuarios").doc(usuario.uid).set({
            nome,
            id: usuario.uid
        });

        return usuario.uid;

    }
}



export const retornaMensagens = (chatID) => {
    
    // retorna uma função que aceita uma função de callback como parâmetro
    // essa função de callback será usada para guardar as mensagens numa react rook

    return function(callback) {
        db.collection("chats").doc(chatID).onSnapshot(doc=>{
            callback(doc.data().mensagens);
        })
    }
}