export const Types = {
    LATERAL_ABRIR: "SET_LATERAL_ABRIR"
}

export const Creators = {
    setLateralAbrir: (situacao)=>({
        type: Types.LATERAL_ABRIR,
        payload: {
            situacao
        }
    })
}

const STATE_INICIAL = {
    lateralAbrir: true
}

export default function componentes(state=STATE_INICIAL, {type, payload}) {
    switch(type) {
        case Types.LATERAL_ABRIR:
            return {
                ...state,
                lateralAbrir: payload.situacao
            }

        default: 
            return state;
    }
}