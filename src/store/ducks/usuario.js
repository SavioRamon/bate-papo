export const Types = {
    EDITAR_IMAGEM: "EDITAR_IMAGEM_ASYNC",
    REGISTRAR_USUARIO: "REGISTRAR_USUARIO_ASYNC",
    LOGIN_USUARIO: "LOGIN_USUARIO_ASYNC",
    LOGIN_AUTOMATICO: "LOGIN_AUTOMATICO_ASYNC",
    USUARIO_SAIR: "USUARIO_SAIR_ASYNC",
    SET_USUARIO: "SET_USUARIO"
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

    setUsuario: (dadosUsuario)=>({
        type: Types.SET_USUARIO,
        payload: {
            dadosUsuario
        }
    }),

}

const STATE_INICIAL = {
    dadosUsuario: null
}

export default function usuario(state=STATE_INICIAL, { type, payload }) {
    switch(type) {
        case Types.SET_USUARIO:
            return {
                ...state,
                dadosUsuario: payload.dadosUsuario
            }
        
        default:
            return state;
    }
}