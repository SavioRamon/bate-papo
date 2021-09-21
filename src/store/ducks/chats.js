export const Types = {
    GET_MENSAGENS: "GET_MENSAGENS_ASYNC",
    CHAT_SELECIONADO: "CHAT_SELECIONADO_ASYNC"
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
    })
}

const STATE_INICIAL = {
    chatID: "4PcLEco0kfdGzGqzeFXb"
}

export default function chats(state=STATE_INICIAL, {type, payload}) {
    switch(type) {
        case Types.CHAT_SELECIONADO:
            return payload.chatID;

        default:
            return state;
    }
}