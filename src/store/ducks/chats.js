export const Types = {
    ENVIA_MENSAGEM: "ENVIA_MENSAGEM_ASYNC",
    ENVIA_MIDIA: "ENVIA_MIDIA_ASYNC",
    CHAT_SELECIONADO: "CHAT_SELECIONADO_ASYNC",
    NOVO_CHAT: "NOVO_CHAT_ASYNC",
}

export const Creators = {

    enviaMensagemTexto: (chatID, mensagemUsuario)=>({
        type: Types.ENVIA_MENSAGEM,
        payload: {
            chatID,
            mensagemUsuario
        }
    }),

    enviaMensagemMidia: (chatID, mensagemUsuario)=>({
        type: Types.ENVIA_MIDIA,
        payload: {
            chatID,
            mensagemUsuario
        }
    }),

    chatSelecionado: (chatID)=>({
        type: Types.CHAT_SELECIONADO,
        payload: {
            chatID
        }
    }),

    novoChatPrivado: (usuarioPrincipal, segundoUsuario)=>({
        type: Types.NOVO_CHAT,
        payload: {
            usuarioPrincipal,
            segundoUsuario
        }
    }),

}

const STATE_INICIAL = {
    // o chatID padrão é o id do chat geral
    
    chatID: "chatGeral",
}

export default function chats(state=STATE_INICIAL, {type, payload}) {
    switch(type) {

        case Types.CHAT_SELECIONADO:
            return {
                ...state,
                chatID: payload.chatID
            };

        default:
            return state;
    }
}