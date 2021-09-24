import { call, put } from "redux-saga/effects";
import { novoUsuario, fazerLogin } from "../../firebase";

export function* registrarUsuario(dados){
    const { nome, email, senha } = dados.payload;

    yield call(novoUsuario, nome, email, senha);
}

export function* loginUsuario(dados) {
    const { email, senha } = dados.payload;

    yield call(fazerLogin, email, senha);
}