export const Types = {
    GET_MENSAGENS: "GET_MENSAGENS_ASYNC",
    CHAT_SELECIONADO: "CHAT_SELECIONADO_ASYNC",
    SET_MENSAGENS: "SET_MENSAGENS"
}

export const Creators = {
    getMensagens: (chatID)=>({
        type: Types.GET_MENSAGENS,
        payload: {
            chatID
        }
    }),

    chatSelecionado: (chatID)=>({
        type: Types.CHAT_SELECIONADO,
        payload: {
            chatID
        }
    }),

    setMensagens: (mensagens)=>({
        type: Types.SET_MENSAGENS,
        payload: {
            mensagens
        }
    })

}

const STATE_INICIAL = {
    chatID: "4PcLEco0kfdGzGqzeFXb",
    mensagens: null
}

export default function chats(state=STATE_INICIAL, {type, payload}) {
    switch(type) {

        case Types.CHAT_SELECIONADO:
            return {
                ...state,
                chatID: payload.chatID
            };
            
        case Types.SET_MENSAGENS:
            return {
                ...state,
                mensagens: payload.mensagens
            };

        default:
            return state;
    }
}