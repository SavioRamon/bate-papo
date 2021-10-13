import { takeEvery, all } from "redux-saga/effects";

import { Types as chatTypes } from "../ducks/chats";
import { Types as usuarioTypes } from "../ducks/usuario";

import { getMensagens, enviaMensagem, newChatPrivado } from "./chats";

import { 
    editarUsuario,

    editarImagem,
    registrarUsuario, 
    loginUsuario, 
    loginAutomatico, 
    usuarioSair 

} from "./usuario";

export default function* rootSagas() {
    return yield all([
        takeEvery(usuarioTypes.EDITAR_IMAGEM, editarImagem),
        takeEvery(usuarioTypes.EDITAR_USUARIO, editarUsuario),

        takeEvery(usuarioTypes.REGISTRAR_USUARIO, registrarUsuario),
        takeEvery(usuarioTypes.LOGIN_USUARIO, loginUsuario),
        takeEvery(usuarioTypes.LOGIN_AUTOMATICO, loginAutomatico),
        takeEvery(usuarioTypes.USUARIO_SAIR, usuarioSair),

        takeEvery(chatTypes.GET_MENSAGENS, getMensagens),
        takeEvery(chatTypes.ENVIA_MENSAGEM, enviaMensagem),
        takeEvery(chatTypes.NOVO_CHAT, newChatPrivado)
    ])
}