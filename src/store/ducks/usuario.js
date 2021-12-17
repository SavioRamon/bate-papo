export const Types = {
    EDITAR_IMAGEM: "EDITAR_IMAGEM_ASYNC",
    EDITAR_USUARIO: "EDITAR_USUARIO_ASYNC",

    SET_USUARIO: "SET_USUARIO",
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

    setUsuario: (dadosUsuario)=>({
        type: Types.SET_USUARIO,
        payload: {
            dadosUsuario
        }
    })

}

const STATE_INICIAL = {
    load: false,
    dadosUsuario: null,
    chats: null
}

export default function usuario(state=STATE_INICIAL, { type, payload }) {
    switch(type) {
        
        case Types.SET_USUARIO:
            return {
                ...state,
                ...payload.dadosUsuario
            };

        default:
            return state;
    }
}