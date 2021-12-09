export const Types = {
    LATERAL_ABRIR: "SET_LATERAL_ABRIR",
    DETALHAR_USUARIO: "SET_DETALHAR_USUARIO",
}

export const Creators = {
    setLateralAbrir: (situacao)=>({
        type: Types.LATERAL_ABRIR,
        payload: {
            situacao
        }
    }),

    setTelaDetalharUsuarioAbrir: (usuario)=>({
        type: Types.DETALHAR_USUARIO,
        payload: {usuario}
    })
}

const STATE_INICIAL = {
    lateralAbrir: true,

    // Informacoes de algum usuario em específico
    usuarioDetalhar: null
}

export default function componentes(state=STATE_INICIAL, {type, payload}) {
    switch(type) {
        case Types.LATERAL_ABRIR:
            return {
                ...state,
                lateralAbrir: payload.situacao
            }

        case Types.DETALHAR_USUARIO:
            return {
                ...state,
                usuarioDetalhar: payload.usuario
            }

        default: 
            return state;
    }
}