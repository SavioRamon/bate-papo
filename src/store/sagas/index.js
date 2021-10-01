import { takeLatest, all } from "redux-saga/effects";

import { Types as chatTypes } from "../ducks/chats";
import { Types as usuarioTypes } from "../ducks/usuario";

import { getMensagens, enviaMensagem } from "./chats";
import { registrarUsuario, loginUsuario, loginAutomatico, usuarioSair } from "./usuario";

export default function* rootSagas() {
    return yield all([
        takeLatest(usuarioTypes.REGISTRAR_USUARIO, registrarUsuario),
        takeLatest(usuarioTypes.LOGIN_USUARIO, loginUsuario),
        takeLatest(usuarioTypes.LOGIN_AUTOMATICO, loginAutomatico),
        takeLatest(usuarioTypes.USUARIO_SAIR, usuarioSair),

        takeLatest(chatTypes.GET_MENSAGENS, getMensagens),
        takeLatest(chatTypes.ENVIA_MENSAGEM, enviaMensagem)
    ])
}