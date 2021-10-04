export const Types = {
    GET_MENSAGENS: "GET_MENSAGENS_ASYNC",
    ENVIA_MENSAGEM: "ENVIA_MENSAGEM_ASYNC",
    CHAT_SELECIONADO: "CHAT_SELECIONADO_ASYNC",
    SET_MENSAGENS: "SET_MENSAGENS"
}

export const Creators = {

    // Essa creator chama o redux-saga para retornar as mensagens de um determinado chat
    getMensagens: (chatID)=>({
        type: Types.GET_MENSAGENS,
        payload: {
            chatID
        }
    }),

    enviaMensagem: (chatID, mensagemUsuario)=>({
        type: Types.ENVIA_MENSAGEM,
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

    // Essa creator armazena no reducer uma função que aceita uma função de callback como parâmetro 
    // para retornar as tarefas
    setMensagens: (mensagensFunction)=>({
        type: Types.SET_MENSAGENS,
        payload: {
            mensagensFunction
        }
    })

}

const STATE_INICIAL = {
    // o chatID padrão é o id do chat geral
    
    chatID: "chatGeral",
    mensagensFunction: null
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
                mensagensFunction: payload.mensagensFunction
            };

        default:
            return state;
    }
}