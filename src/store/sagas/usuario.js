import { call, put } from "redux-saga/effects";
import { retornaDadosUsuario, novoUsuario, fazerLogin } from "../../firebase";

import { Creators as usuarioCreators } from "../ducks/usuario";

function* setUsuarioNoReducer(usuarioID) {
    const dadosUsuario = yield call(retornaDadosUsuario, usuarioID);

    yield put(usuarioCreators.setUsuario(dadosUsuario));
}

export function* registrarUsuario(dados){
    const { nome, email, senha } = dados.payload;

    const usuarioID = yield call(novoUsuario, nome, email, senha);

    if(usuarioID) {
        yield call(setUsuarioNoReducer, usuarioID);
    }
}

export function* loginUsuario(dados) {
    const { email, senha } = dados.payload;

    const usuarioID = yield call(fazerLogin, email, senha);

    if(usuarioID) {
        yield call(setUsuarioNoReducer, usuarioID);
    }
}