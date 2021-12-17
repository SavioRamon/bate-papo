import { takeEvery, all } from "redux-saga/effects";

import { Types as chatTypes } from "../ducks/chats";
import { Types as usuarioTypes } from "../ducks/usuario";

import { enviaMensagemTexto, enviaMensagemMidia, newChatPrivado } from "./chats";

import { 
    editarUsuario,

    editarImagem, 

} from "./usuario";

export default function* rootSagas() {
    return yield all([
        takeEvery(usuarioTypes.EDITAR_IMAGEM, editarImagem),
        takeEvery(usuarioTypes.EDITAR_USUARIO, editarUsuario),

        takeEvery(chatTypes.ENVIA_MENSAGEM, enviaMensagemTexto),
        takeEvery(chatTypes.ENVIA_MIDIA, enviaMensagemMidia),
        takeEvery(chatTypes.NOVO_CHAT, newChatPrivado)
    ])
}