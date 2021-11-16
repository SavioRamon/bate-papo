import { call, put } from "redux-saga/effects";

import { retornaMensagens, sendMensagemTexto, sendMensagemMidia, novoChatPrivado } from "../../firebase";

import { Creators as chatCreators } from "../ducks/chats";
import { Creators as usuarioCreators } from "../ducks/usuario";

export function* getMensagens(dados) {
    const mensagensFunction = yield call(retornaMensagens, dados.payload.chatID);
    yield put(chatCreators.setMensagens(mensagensFunction));
}

export function* enviaMensagemTexto(dados) {
    yield call(sendMensagemTexto, dados.payload);
}


export function* enviaMensagemMidia(dados) {
    yield call(sendMensagemMidia, dados.payload);
}


export function* newChatPrivado(dados) {
    const dadosChat = yield call(novoChatPrivado, dados.payload);

    if(dadosChat.novoChat) {
        
        yield put(chatCreators.chatSelecionado(dadosChat.id));
        yield put(usuarioCreators.setChat(dadosChat));

    } else {
        yield put(chatCreators.chatSelecionado(dadosChat.id));
    }
}
