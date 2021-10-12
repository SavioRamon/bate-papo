export const Types = {
    EDITAR_IMAGEM: "EDITAR_IMAGEM_ASYNC",
    REGISTRAR_USUARIO: "REGISTRAR_USUARIO_ASYNC",
    LOGIN_USUARIO: "LOGIN_USUARIO_ASYNC",
    LOGIN_AUTOMATICO: "LOGIN_AUTOMATICO_ASYNC",
    USUARIO_SAIR: "USUARIO_SAIR_ASYNC",

    SET_CHATS: "SET_CHATS",
    SET_USUARIO: "SET_USUARIO",
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

    setChats: (chat)=>({
        type: Types.SET_CHATS,
        payload: {
            chat
        }
    }),

    setUsuario: (dadosUsuario)=>({
        type: Types.SET_USUARIO,
        payload: {
            dadosUsuario
        }
    }),

    setUsuarioSair: ()=>({
        type: Types.SET_USUARIO_SAIR
    })

}

const STATE_INICIAL = {
    dadosUsuario: null,
    chats: null
}

export default function usuario(state=STATE_INICIAL, { type, payload }) {
    switch(type) {
        case Types.SET_USUARIO:

            return payload.dadosUsuario;
            
        case Types.SET_CHATS:
            const novoState = {
                ...state,
            }
            novoState.chats.push(payload.chat);

            return {
                ...novoState
            }

        case Types.SET_USUARIO_SAIR:
            
            return STATE_INICIAL;

        default:
            return state;
    }
}