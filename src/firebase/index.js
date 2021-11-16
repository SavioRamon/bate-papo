import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();

const db = app.firestore();

function retornaHorario() {
    const data = new Date();

    let hora = data.getHours();
    let minuto = data.getMinutes();

    if(hora < 10) {
        hora = `0${hora}`;
    }
    if(minuto < 10) {
        minuto = `0${minuto}`;
    }

    const horario = `${hora}:${minuto}`;

    return horario;
}

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

export const criaOuvinteChats = (usuarioID)=>{
    return function(callback) {        
        db.collection("usuarios").doc(usuarioID).onSnapshot( async (doc)=>{
            const listaChats = [];
            for(let chat of doc.data().chats){

                if(chat.id === "chatGeral") {
                    listaChats.push(chat);

                } else if(chat.idUsuario) {
                    await carregaDadosChatsPrivados({chat}).then(dados=>listaChats.push(dados));
                }
            }
            callback(listaChats);
        })
    }
}


export const carregaDadosChatsPrivados = ({chat})=>{
    return new Promise(async(resolve, reject)=>{
        const dadosChat = await db.collection("usuarios").doc(chat.idUsuario).get().then(doc=>({
            chatNome: doc.data().nome,
            idUsuario: chat.idUsuario,
            imagem: doc.data().imagem,
            id: chat.id
        }));
        const imagemURL = await retornaImagemURL(dadosChat.idUsuario);

        resolve({
            ...dadosChat,
            imagem: imagemURL
        })
    })
}

export const retornaImagemURL = async (usuarioID)=>{
    const imagemPadraoURL = "https://firebasestorage.googleapis.com/v0/b/bate-papo-a748b.appspot.com/o/perfil-imagem%2Fimagem-padrao.png?alt=media&token=0e81c112-493c-4c03-9e8d-386d2db7c268";
    
    const nomeImagemAtual = await db.collection("usuarios").doc(usuarioID).get()
    .then(doc=>doc.data().imagem)
    .catch(()=>imagemPadraoURL);

    const imagemURL = await storageRef.child(`perfil-imagem/${usuarioID}/${nomeImagemAtual}`).getDownloadURL()
        .then(url=>url)
        .catch(()=>imagemPadraoURL);

    return imagemURL;
}


export const editarImagemPerfil = async ({ usuarioID, imagem }) => {
    
    if(imagem) {

        const imagemReferencia = storageRef.child(`perfil-imagem/${usuarioID}/${imagem.name}`);

        const imagemJaExiste = await imagemReferencia.getDownloadURL()
            .then((url)=>url)
            .catch(()=>false);

            
        if(!imagemJaExiste) {

            await imagemReferencia.put(imagem);

            db.collection("usuarios").doc(usuarioID).set({
                imagem: imagem.name
            }, {merge: true});

        } else if(imagemJaExiste) {
            db.collection("usuarios").doc(usuarioID).set({
                imagem: imagem.name
            }, {merge: true});
        }

        

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

    const listaChats = [];
    for(let chat of dadosUsuario.chats){

        if(chat.id === "chatGeral") {
            listaChats.push(chat);

        } else if(chat.idUsuario) {
            await carregaDadosChatsPrivados({chat}).then(dados=>listaChats.push(dados));
        }
    }

    return {        
        dadosUsuario: {
            nome: dadosUsuario.nome,
            id: dadosUsuario.id,
            imagem: dadosUsuario.imagem
        },

        chats: listaChats
    }
    
}

export const autoLogin = ()=>{

    return new Promise((resolve)=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const dadosUsuario = retornaDadosUsuario(user.uid);
                resolve(dadosUsuario);
            } else {
                resolve(null);
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
            imagem: imagemPadraoURL
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



export const sendMensagemTexto = ({ chatID, mensagemUsuario }) => {
    const horario = retornaHorario();

    db.collection("chats").doc(chatID).set({
        mensagens: firebase.firestore.FieldValue.arrayUnion({
            ...mensagemUsuario,
            horarioEnvio:  horario
        })
    }, {merge: true});
}



export const sendMensagemMidia = async ({ chatID, mensagemUsuario }) => {

    const horario = retornaHorario();
    const midia = mensagemUsuario.midia;

    const tiposMidia = [
        "video",
        "image"
    ]

    for(let tipo of tiposMidia) {
        if(midia.type.includes(tipo)) {

            const midiaRef = storageRef.child(`midia/${mensagemUsuario.idUsuario}/${tipo}/${midia.name}`);  
            
            const verificaExistenciaMidia = await midiaRef.getDownloadURL()
                .then((url)=>url)
                .catch(()=>false);

            if(!verificaExistenciaMidia) {
                await midiaRef.put(midia);

                const midiaURL = await midiaRef.getDownloadURL().then(url=>url).catch(()=>false);

                db.collection("chats").doc(chatID).set({
                    mensagens: firebase.firestore.FieldValue.arrayUnion({
                        ...mensagemUsuario,
                        horarioEnvio:  horario,
                        midia: midiaURL,
                        tipoMidia: tipo
                    })
                }, {merge: true});

            } else if(verificaExistenciaMidia) {
                db.collection("chats").doc(chatID).set({
                    mensagens: firebase.firestore.FieldValue.arrayUnion({
                        ...mensagemUsuario,
                        horarioEnvio:  horario,
                        midia: verificaExistenciaMidia,
                        tipoMidia: tipo
                    })
                }, {merge: true});
            }



            break;
        }
    }
    
    
}

export const novoChatPrivado = async ({usuarioPrincipal, segundoUsuario})=>{

    const chatID = `${usuarioPrincipal.id}${segundoUsuario.id}`;
    const chatIdAlternativo = `${segundoUsuario.id}${usuarioPrincipal.id}`;

    let chatExisteId;

    const verificaChatExistencia = await db.collection("usuarios").doc(usuarioPrincipal.id).get().then(doc=>{
        let existe = false;
        for(let chat of doc.data().chats) {
            if(chat.id === chatID || chat.id === chatIdAlternativo) {
                existe = true;

                chatExisteId = chat.id;

                break;
            }
        }
        return existe;
    })

    if(!verificaChatExistencia) {
        
        const novoChat = await db.collection("chats").doc(chatID).set({
            
        }, {merge: true})

        await db.collection("usuarios").doc(usuarioPrincipal.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                idUsuario: segundoUsuario.id,
                id: chatID
            })
        })


        await db.collection("usuarios").doc(segundoUsuario.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                idUsuario: usuarioPrincipal.id,
                id: chatID
            })
        })

        return {
            novoChat: true,
            chatNome: segundoUsuario.nome,
            idUsuario: segundoUsuario.id,
            imagem: segundoUsuario.imagem,
            id: chatID,
        }

    } else {
        return  {
            novoChat: false,
            id: chatExisteId
        }
    }

    
    
}