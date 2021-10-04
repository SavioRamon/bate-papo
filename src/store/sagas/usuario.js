import { call, put } from "redux-saga/effects";
import { editarImagemPerfil, retornaDadosUsuario, novoUsuario, fazerLogin, autoLogin, sairUsuario } from "../../firebase";

import { Creators as usuarioCreators } from "../ducks/usuario";

function* setUsuarioNoReducer(usuarioID) {
    const dadosUsuario = yield call(retornaDadosUsuario, usuarioID);

    yield put(usuarioCreators.setUsuario(dadosUsuario));
}


export function* editarImagem(dados) {
    yield call(editarImagemPerfil, dados.payload);
    yield call(setUsuarioNoReducer, dados.payload.usuarioID);

}


export function* registrarUsuario(dados){
    const { nome, email, senha } = dados.payload;

    const usuarioID = yield call(novoUsuario, nome, email, senha);

    if(usuarioID) {
        console.log(usuarioID)
        yield call(editarImagemPerfil, {usuarioID});
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


export function* loginAutomatico(){

    
    const usuarioID = yield call(autoLogin);

    if(usuarioID) {
        yield call(setUsuarioNoReducer, usuarioID);
    }
    
    
}


export function* usuarioSair() {
    yield call(sairUsuario);

    yield put(usuarioCreators.setUsuario(null));
}