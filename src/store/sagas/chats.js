import { call, put } from "redux-saga/effects";

import { retornaMensagens, sendMensagem, novoChatPrivado } from "../../firebase";

import { Creators as chatCreators } from "../ducks/chats";
import { Creators as usuarioCreators } from "../ducks/usuario";

export function* getMensagens(dados) {
    const mensagensFunction = yield call(retornaMensagens, dados.payload.chatID);
    yield put(chatCreators.setMensagens(mensagensFunction));
}

export function* enviaMensagem(dados) {
    yield call(sendMensagem, dados.payload);
}

export function* newChatPrivado(dados) {
    const dadosChat = yield call(novoChatPrivado, dados.payload);

    yield put(chatCreators.chatSelecionado(dadosChat.id))

    yield put(usuarioCreators.setChats(dadosChat));
}