export const Types = {
    REGISTRAR_USUARIO: "REGISTRAR_USUARIO_ASYNC",
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

    setUsuario: (dadosUsuario)=>({
        type: Types.SET_USUARIO,
        payload: {
            dadosUsuario
        }
    })
}

const STATE_INICIAL = {
    usuario: null
}

export default function usuario(state=STATE_INICIAL, { type, payload }) {
    switch(type) {
        case Types.SET_USUARIO:
            return {
                ...state,
                usuario: payload.dadosUsuario
            }
        
        default:
            return state;
    }
}