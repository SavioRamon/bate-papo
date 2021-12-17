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

export const recebeInfoUsuario = ()=>{
    return function(callback, usuarioID) {
        db.collection("usuarios").doc(usuarioID).onSnapshot( async (doc)=>{
            
            const listaChats = [];
            for(let chat of doc.data().chats){
    
                if(chat.idChat === "chatGeral") {
                    
                    listaChats.push(chat);
    
                } else if(chat.idUsuario) {
                    await carregaDadosChatsPrivados({chat}).then(dados=>listaChats.push(dados));
                }
            }

            callback({
                dadosUsuario: {
                    nome: doc.data().nome,
                    id: doc.data().id,
                    imagem: doc.data().imagem
                },
            
                chats: listaChats
            });
        }) 
    
    }
    
}


export const carregaDadosChatsPrivados = ({chat})=>{
    return new Promise(async(resolve, reject)=>{
        const dadosChat = await db.collection("usuarios").doc(chat.idUsuario).get().then(doc=>({
            nome: doc.data().nome,
            id: chat.idUsuario,
            imagem: doc.data().imagem,
            idChat: chat.idChat
        }));
        
        resolve(dadosChat)
    })
}

export const editarImagemPerfil = async ({ usuarioID, imagem }) => {

    if(imagem) {
        const imagemReferencia = storageRef.child(
            `perfil-imagem/${usuarioID}/${imagem.name}${imagem.lastModified}${imagem.size}`
        );

        const imagemJaExiste = await imagemReferencia.getDownloadURL()
            .then((url)=>url)
            .catch(()=>false);

        if(!imagemJaExiste) {

            await imagemReferencia.put(imagem);

            const imgURL = await imagemReferencia.getDownloadURL().then(url=>url).catch(erro=>alert(erro));
            
            db.collection("usuarios").doc(usuarioID).set({
                imagem: imgURL
            }, {merge: true});

        } else if(imagemJaExiste) {
            db.collection("usuarios").doc(usuarioID).set({
                imagem: imagemJaExiste
            }, {merge: true});
        }
    }
}



export const editarDadosUsuario = async (dadosEditados) => {

    const nomeAnalise = analisaInputNome(dadosEditados.nome);
    if(nomeAnalise) {
        await db.collection("usuarios").doc(dadosEditados.id).update({
            nome: dadosEditados.nome
        });
    }

}

export const buscaUsuarioLogado = (callback) => {
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            callback(user.uid);
        } else {
            callback(null);
        }
    })
}

export const fazerLogin = async (email, senha)=>{
    const progresso = await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(()=>true)
        .catch(erro=>alert(erro.message));
        
    return progresso;

}



export const novoUsuario = async (nome, email, senha)=>{

    const nomeAnalise = analisaInputNome(nome);
    if(!nomeAnalise) {
        return false;
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
                    idChat: "chatGeral",
                    nome: "Geral"
                }
            ],
            imagem: imagemPadraoURL
        }
        const progresso = db.collection("usuarios").doc(usuario.uid).set(dadosUsuario)
            .then(()=>true)
            .catch(erro=>alert(erro.message));

        
        return progresso;

    } else {
        return false;
    }
}

export const sairUsuario = ()=>{
    firebase.auth().signOut().catch((error) => {
        alert(error);
      });
}







export const retornaMensagens = (callback, chatID) => {
    
    // retorna uma função que aceita uma função de callback como parâmetro
    // essa função de callback será usada para guardar as mensagens numa react rook

    db.collection("chats").doc(chatID).onSnapshot(doc=>{
        callback(doc.data().mensagens);
    })
    
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

            const midiaRef = storageRef.child(
                `midia/${mensagemUsuario.idUsuario}/${tipo}/${midia.name}${midia.lastModified}${midia.size}`);  
            
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
            if(chat.idChat === chatID || chat.idChat === chatIdAlternativo) {
                existe = true;

                chatExisteId = chat.idChat;

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
                idChat: chatID
            })
        })


        await db.collection("usuarios").doc(segundoUsuario.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                idUsuario: usuarioPrincipal.id,
                idChat: chatID
            })
        })

        return chatID

    } else {
        
        return  chatExisteId
    }

    
    
}