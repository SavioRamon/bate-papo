import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();

const db = app.firestore();

export const retornaImagem = async (usuarioID)=>{
    const idImagem = usuarioID? usuarioID : "imagem-padrao.png";
    const imagemURL = await storageRef.child(`perfil-imagem/${idImagem}`).getDownloadURL();
    return imagemURL;
}


export const editarImagemPerfil = async ({ usuarioID, imagem }) => {
    const addImagemUrl = (imagem)=>{
        db.collection("usuarios").doc(usuarioID).set({
            imagem
        }, {merge: true})
    }
    
    const imagemReferencia = storageRef.child(`perfil-imagem/${usuarioID}`);
    if(imagem) {
        await imagemReferencia.put(imagem);
        
        const imagemURL = await retornaImagem(usuarioID);
        addImagemUrl(imagemURL)

    } else {
        const imagemURL = await retornaImagem();
          
        await imagemReferencia.put(imagemURL);
        addImagemUrl(imagemURL);
    }


}



export const retornaDadosUsuario = usuarioID => {
    const usuarioDados = db.collection("usuarios").doc(usuarioID).get()
        .then(async doc => {
            let { nome, id, imagem } = doc.data();

            // aqui é verificado se a imagem existe, se não existir, irá buscá-la no storage
            const imagemReq = await fetch(imagem);
            if(imagemReq.status !== 200) {
                imagem = await retornaImagem(usuarioID);
            }

            return {
                nome,
                id,
                imagem
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
            id: usuario.uid,
            chats: [
                "chatGeral"
            ]
        });

        return usuario.uid;

    }
}

export const sairUsuario = ()=>{
    firebase.auth().signOut().catch((error) => {
        alert(error);
      });
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

export const sendMensagem = ({ chatID, mensagemUsuario }) => {
    db.collection("chats").doc(chatID).set({
        mensagens: firebase.firestore.FieldValue.arrayUnion(mensagemUsuario)
    }, {merge: true})
}