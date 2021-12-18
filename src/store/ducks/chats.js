export const Types = {
    ENVIA_MENSAGEM: "ENVIA_MENSAGEM_ASYNC",
    ENVIA_MIDIA: "ENVIA_MIDIA_ASYNC",
    NOVO_CHAT: "NOVO_CHAT_ASYNC",

    SET_CHAT_SELECIONADO: "SET_CHAT_SELECIONADO",
    SET_MENSAGENS: "SET_MENSAGENS"
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
        type: Types.SET_CHAT_SELECIONADO,
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

    setMensagens: (mensagens)=>({
        type: Types.SET_MENSAGENS,
        payload: {
            mensagens
        }
    })

}

const STATE_INICIAL = {
    // o chatID padrão é o id do chat geral
    
    chatID: "chatGeral",
}

export default function chats(state=STATE_INICIAL, {type, payload}) {
    switch(type) {

        case Types.SET_CHAT_SELECIONADO:
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