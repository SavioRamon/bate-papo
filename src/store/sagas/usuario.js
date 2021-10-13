import { call, put } from "redux-saga/effects";
import { 
    editarImagemPerfil, 
    editarDadosUsuario,

    novoUsuario, 
    fazerLogin, 
    autoLogin, 
    sairUsuario 

} from "../../firebase";

import { Creators as usuarioCreators } from "../ducks/usuario";


export function* editarImagem(dados) {
    const dadosUsuario = yield call(editarImagemPerfil, dados.payload);
    yield put(usuarioCreators.setUsuario(dadosUsuario));
}


export function* editarUsuario(dados) {
    const situacao = yield call(editarDadosUsuario, dados.payload.dadosEditados);
    
    if(situacao === true) {
        yield put(usuarioCreators.setUsuarioEditado(dados.payload.dadosEditados))
    }
}


export function* registrarUsuario(dados){
    const { nome, email, senha } = dados.payload;
    const dadosUsuario = yield call(novoUsuario, nome, email, senha);

    if(dadosUsuario) {
        yield put(usuarioCreators.setUsuario(dadosUsuario));
    }
}


export function* loginUsuario(dados) {
    const { email, senha } = dados.payload;
    const dadosUsuario = yield call(fazerLogin, email, senha);

    if(dadosUsuario) {
        yield put(usuarioCreators.setUsuario(dadosUsuario));
    }
}


export function* loginAutomatico(){

    
    const dadosUsuario = yield call(autoLogin);

    if(dadosUsuario) {
        yield put(usuarioCreators.setUsuario(dadosUsuario));
    }
    
    
}


export function* usuarioSair() {
    
    yield put(usuarioCreators.setUsuarioSair());
    yield call(sairUsuario);
}