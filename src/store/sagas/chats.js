import { call, put } from "redux-saga/effects";

import { retornaMensagens } from "../../firebase";

export function* getMensagens(dados) {
    const mensagens = yield call(retornaMensagens, dados.payload.chatID);
    console.log(mensagens);
}