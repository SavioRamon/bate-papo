export const Types = {
    ATUALIZA_TODOS_CHATS: "ATUALIZA_TODOS_CHATS_ASYNC",
    EDITAR_IMAGEM: "EDITAR_IMAGEM_ASYNC",
    EDITAR_USUARIO: "EDITAR_USUARIO_ASYNC",

    REGISTRAR_USUARIO: "REGISTRAR_USUARIO_ASYNC",
    LOGIN_USUARIO: "LOGIN_USUARIO_ASYNC",
    LOGIN_AUTOMATICO: "LOGIN_AUTOMATICO_ASYNC",
    USUARIO_SAIR: "USUARIO_SAIR_ASYNC",

    SET_ALL_CHATS: "SET_ALL_CHATS",
    SET_OUVINTE_CHAT: "SET_OUVINTE_CHAT",
    SET_CHAT: "SET_CHAT",
    SET_USUARIO: "SET_USUARIO",
    USUARIO_EDITADO: "SET_USUARIO_EDITADO",
    SET_USUARIO_SAIR: "SET_USUARIO_SAIR"
}

export const Creators = {
    editarImagem: (usuarioID, imagem)=>({
        type: Types.EDITAR_IMAGEM,
        payload: {
            usuarioID,
            imagem
        }
    }),

    editarUsuario: (dadosEditados)=>({
        type: Types.EDITAR_USUARIO,
        payload: {
            dadosEditados
        }
    }),

    registrarUsuario: (nome, email, senha)=>({
        type: Types.REGISTRAR_USUARIO,
        payload: {
            nome,
            email, 
            senha
        }
    }),

    loginUsuario: (email, senha)=>({
        type: Types.LOGIN_USUARIO,
        payload: {
            email,
            senha
        }
    }),

    loginAutomatico: ()=>({
        type: Types.LOGIN_AUTOMATICO,
    }),
    
    usuarioSair: ()=>({
        type: Types.USUARIO_SAIR
    }),


    criaOuvinteChats: (usuarioID)=>({
        type: Types.ATUALIZA_TODOS_CHATS,
        payload: usuarioID
    }),


    setChat: (chat)=>({
        type: Types.SET_CHAT,
        payload: {
            chat
        }
    }),

    setAllChats: (chats)=>({
        type: Types.SET_ALL_CHATS,
        payload: {
            chats
        }
    }),

    setOuvinteChat: (func)=>({
        type: Types.SET_OUVINTE_CHAT,
        payload: func
    }),

    setUsuario: (dadosUsuario)=>({
        type: Types.SET_USUARIO,
        payload: {
            dadosUsuario
        }
    }),

    setUsuarioEditado: (dadosEditados)=>({
        type: Types.USUARIO_EDITADO,
        payload: dadosEditados
    }),

    setUsuarioSair: ()=>({
        type: Types.SET_USUARIO_SAIR
    })

}

const STATE_INICIAL = {
    load: false,
    dadosUsuario: null,
    chats: null,
    atualizaChatsOuvinte: null
}

export default function usuario(state=STATE_INICIAL, { type, payload }) {
    switch(type) {
        
        case Types.SET_USUARIO:
            return payload.dadosUsuario;
         
        case Types.SET_ALL_CHATS: 
        
            return {
                ...state,
                chats: payload.chats
            }
        

        case Types.SET_OUVINTE_CHAT:
            return {
                ...state,
                atualizaChatsOuvinte: payload
            }

        case Types.SET_CHAT:
            const novoState = {
                ...state,
            }
            const verificaExistencia = novoState.chats.filter(chat=>{
                return chat.id === payload.chat.id;
            })

            if(!verificaExistencia[0]) {
                novoState.chats.push(payload.chat);
                localStorage.setItem("dados", JSON.stringify({
                    dadosUsuario: state.dadosUsuario,
                    chats: state.chats
                }))
            }

            return {
                ...novoState
            }


        case Types.USUARIO_EDITADO:
            return {
                ...state,
                dadosUsuario: payload
            }


        case Types.SET_USUARIO_SAIR:
            return {
                ...STATE_INICIAL,
                load: true,
            };


        default:
            return state;
    }
}