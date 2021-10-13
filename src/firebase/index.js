import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();

const db = app.firestore();


function analisaInputNome(nome) {
    if(nome.length > 10) {
        alert("Nome de usuário não pode exceder 10 caracteres")
        return false;

    } else if(nome.length === 0) {
        alert("campo de nome de usuário não pode ser vazio");
        return false;
    }

    return true;

}


export const retornaImagemURL = async (usuarioID)=>{
    const imagemPadraoURL = "https://firebasestorage.googleapis.com/v0/b/bate-papo-a748b.appspot.com/o/perfil-imagem%2Fimagem-padrao.png?alt=media&token=0e81c112-493c-4c03-9e8d-386d2db7c268";
    
    const imagemURL = await storageRef.child(`perfil-imagem/${usuarioID}`).getDownloadURL()
        .then(url=>url)
        .catch(()=>imagemPadraoURL);

    return imagemURL;
}


export const editarImagemPerfil = async ({ usuarioID, imagem }) => {
    
    if(imagem) {
        
        const imagemReferencia = storageRef.child(`perfil-imagem/${usuarioID}`);
        await imagemReferencia.put(imagem);
        
        return retornaDadosUsuario(usuarioID);
    }
}



export const editarDadosUsuario = async (dadosEditados) => {

    const nomeAnalise = analisaInputNome(dadosEditados.nome);
    if(!nomeAnalise) {
        return false;
    }

    const situacao = await db.collection("usuarios").doc(dadosEditados.id).update({
        nome: dadosEditados.nome
    }).then( () => true);

    return situacao;
}


export const retornaDadosUsuario = async usuarioID => {
    const imagemURL = await retornaImagemURL(usuarioID);
    
    const dadosUsuario = await db.collection("usuarios").doc(usuarioID).get().then(doc=>({
        nome: doc.data().nome,
        id: doc.data().id,
        chats: doc.data().chats,
        imagem: imagemURL
    }));

    return {        
        dadosUsuario: {
            nome: dadosUsuario.nome,
            id: dadosUsuario.id,
            imagem: dadosUsuario.imagem
        },

        chats: dadosUsuario.chats
    }
    
}

export const autoLogin = ()=>{

    return new Promise((resolve, reject)=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const dadosUsuario = retornaDadosUsuario(user.uid);
                resolve(dadosUsuario);
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
        const dadosUsuario = retornaDadosUsuario(usuario.uid)
        return dadosUsuario;
    }
}



export const novoUsuario = async (nome, email, senha)=>{

    const nomeAnalise = analisaInputNome(nome);
    if(!nomeAnalise) {
        return null;
    }

    const usuario = await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(dados => dados.user)
        .catch(erro=>{
            alert(erro.message);
        })

    if(usuario) {
        const imagemPadraoURL = "https://firebasestorage.googleapis.com/v0/b/bate-papo-a748b.appspot.com/o/perfil-imagem%2Fimagem-padrao.png?alt=media&token=0e81c112-493c-4c03-9e8d-386d2db7c268";
        const dadosUsuario = {
            nome,
            id: usuario.uid,
            chats: [
                {
                    id: "chatGeral",
                    chatNome: "Geral"
                }
            ],
        }
        db.collection("usuarios").doc(usuario.uid).set(dadosUsuario);

        return {

            dadosUsuario: {
                nome: dadosUsuario.nome,
                id: dadosUsuario.id,
                imagem: imagemPadraoURL
            },

            chats: dadosUsuario.chats
        };

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


export const novoChatPrivado = async ({usuarioPrincipal, segundoUsuario})=>{

    const chatID = `${usuarioPrincipal.id}${segundoUsuario.id}`;
    const novoChat = await db.collection("chats").doc(chatID).set({
        
    }, {merge: true})

    await db.collection("usuarios").doc(usuarioPrincipal.id).update({
        chats: firebase.firestore.FieldValue.arrayUnion({
            chatNome: segundoUsuario.nome,
            imagem: segundoUsuario.imagem,
            id: chatID
        })
    })

    await db.collection("usuarios").doc(segundoUsuario.id).update({
        chats: firebase.firestore.FieldValue.arrayUnion({
            chatNome: usuarioPrincipal.nome,
            imagem: usuarioPrincipal.imagem,
            id: chatID
        })
    })

    return {
        chatNome: segundoUsuario.nome,
        imagem: segundoUsuario.imagem,
        id: chatID
    }
    
}