import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();



export const fazerLogin = async (email, senha)=>{
    const usuario = await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(dados => dados.user)

    const usuarioDados = await db.collection("usuarios").doc(usuario.uid).get().then(doc=>{
        const { nome, id } = doc.data();

        return {
            nome,
            id
        }
    })

}



export const novoUsuario = async (nome, email, senha)=>{
    
    const usuario = await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(dados => dados.user)


    const usuarioDados = {
        nome,
        id: usuario.uid
    }

    const adicionaUsuarioNoBanco = db.collection("usuarios").doc(usuarioDados.id).set({
        nome: usuarioDados.nome,
        id: usuarioDados.id
    })
    
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