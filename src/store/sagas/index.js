import { takeLatest, all } from "redux-saga/effects";

import { Types as chatTypes } from "../ducks/chats";
import { Types as usuarioTypes } from "../ducks/usuario";

import { getMensagens } from "./chats";
import { registrarUsuario, loginUsuario } from "./usuario";

export default function* rootSagas() {
    return yield all([
        takeLatest(usuarioTypes.REGISTRAR_USUARIO, registrarUsuario),
        takeLatest(usuarioTypes.LOGIN_USUARIO, loginUsuario),
        takeLatest(chatTypes.GET_MENSAGENS, getMensagens),
    ])
}