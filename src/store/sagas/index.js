import { takeEvery, all } from "redux-saga/effects";

import { Types as chatTypes } from "../ducks/chats";
import { Types as usuarioTypes } from "../ducks/usuario";

import { getMensagens, enviaMensagemTexto, enviaMensagemMidia, newChatPrivado } from "./chats";

import { 
    editarUsuario,

    editarImagem,
    registrarUsuario, 
    loginUsuario, 
    loginAutomatico, 
    usuarioSair, 
    criaOuvinteChatsUsuario

} from "./usuario";

export default function* rootSagas() {
    return yield all([
        takeEvery(usuarioTypes.ATUALIZA_TODOS_CHATS, criaOuvinteChatsUsuario),
        takeEvery(usuarioTypes.EDITAR_IMAGEM, editarImagem),
        takeEvery(usuarioTypes.EDITAR_USUARIO, editarUsuario),

        takeEvery(usuarioTypes.REGISTRAR_USUARIO, registrarUsuario),
        takeEvery(usuarioTypes.LOGIN_USUARIO, loginUsuario),
        takeEvery(usuarioTypes.LOGIN_AUTOMATICO, loginAutomatico),
        takeEvery(usuarioTypes.USUARIO_SAIR, usuarioSair),

        takeEvery(chatTypes.GET_MENSAGENS, getMensagens),
        takeEvery(chatTypes.ENVIA_MENSAGEM, enviaMensagemTexto),
        takeEvery(chatTypes.ENVIA_MIDIA, enviaMensagemMidia),
        takeEvery(chatTypes.NOVO_CHAT, newChatPrivado)
    ])
}