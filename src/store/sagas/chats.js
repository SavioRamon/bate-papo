import { call, put } from "redux-saga/effects";

import { retornaMensagens } from "../../firebase";

import { Creators as chatCreators } from "../ducks/chats";

export function* getMensagens(dados) {
    const mensagensFunction = yield call(retornaMensagens, dados.payload.chatID);
    yield put(chatCreators.setMensagens(mensagensFunction));
}