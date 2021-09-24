import { call, put } from "redux-saga/effects";
import { novoUsuario } from "../../firebase";

export function* registrarUsuario(dados){
    const { nome, email, senha } = dados.payload;

    yield call(novoUsuario, nome, email, senha);
}