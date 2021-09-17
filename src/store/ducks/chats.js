export const Types = {
    CHAT_SELECIONADO: "CHAT_SELECIONADO"
}

export const Creators = {
    chatSelecionado: (chatID)=>({
        type: Types.CHAT_SELECIONADO,
        payload: {
            chatID
        }
    })
}

const STATE_INICIAL = {
    chatID: 0
}

export default function chats(state=STATE_INICIAL, {type, payload}) {
    switch(type) {
        case Types.CHAT_SELECIONADO:
            return payload.chatID;

        default:
            return state;
    }
}