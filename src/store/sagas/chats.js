import { call, put } from "redux-saga/effects";

import { sendMensagemTexto, sendMensagemMidia, novoChatPrivado } from "../../firebase";

import { Creators as chatCreators } from "../ducks/chats";

export function* enviaMensagemTexto(dados) {
    yield call(sendMensagemTexto, dados.payload);
}


export function* enviaMensagemMidia(dados) {
    yield call(sendMensagemMidia, dados.payload);
}


export function* newChatPrivado(dados) {
    const chatID = yield call(novoChatPrivado, dados.payload);
    
    yield put(chatCreators.chatSelecionado(chatID));
}
