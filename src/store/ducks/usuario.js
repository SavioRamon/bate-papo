export const Types = {
    REGISTRAR_USUARIO: "REGISTRAR_USUARIO_ASYNC",
    LOGIN_USUARIO: "LOGIN_USUARIO_ASYNC",
    SET_USUARIO: "SET_USUARIO"
}

export const Creators = {
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

    setUsuario: (dadosUsuario)=>({
        type: Types.SET_USUARIO,
        payload: {
            dadosUsuario
        }
    })
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