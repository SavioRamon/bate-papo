import { call, put } from "redux-saga/effects";
import { 
    editarImagemPerfil, 
    editarDadosUsuario,

    novoUsuario, 
    fazerLogin, 
    autoLogin, 
    sairUsuario, 
    criaOuvinteChats

} from "../../firebase";

import usuario, { Creators as usuarioCreators } from "../ducks/usuario";

export function* editaReducer(dados) {
    if(dados) {
        yield put(usuarioCreators.setUsuario({
            ...dados,
            load: true
        }));

    } else {
        const semUsuario = {
            dadosUsuario: null,
            chats: null,
            load: true
        }
        yield put(usuarioCreators.setUsuario(semUsuario));
    }
}

export function* criaOuvinteChatsUsuario(dados) {
    
    const ouvinte = yield call(criaOuvinteChats, dados.payload);
    
    yield put(usuarioCreators.setOuvinteChat(ouvinte));
    
}


export function* editarImagem(dados) {
    const dadosUsuario = yield call(editarImagemPerfil, dados.payload);

    if(dadosUsuario) {
        localStorage.clear();

        localStorage.setItem("dados", JSON.stringify(dadosUsuario));

        yield call(editaReducer, dadosUsuario);
    }
}


export function* editarUsuario(dados) {
    const situacao = yield call(editarDadosUsuario, dados.payload.dadosEditados);
    
    if(situacao === true) {
        localStorage.setItem("dados", JSON.stringify(dados.payload.dadosEditados));
        yield put(usuarioCreators.setUsuarioEditado(dados.payload.dadosEditados))
    }
}


export function* registrarUsuario(dados){
    const { nome, email, senha } = dados.payload;
    const dadosUsuario = yield call(novoUsuario, nome, email, senha);

    localStorage.setItem("dados", JSON.stringify(dadosUsuario));

    yield call(editaReducer, dadosUsuario);
}

export function* loginUsuario(dados) {
    const { email, senha } = dados.payload;
    const dadosUsuario = yield call(fazerLogin, email, senha);

    localStorage.setItem("dados", JSON.stringify(dadosUsuario));

    yield call(editaReducer, dadosUsuario);
}


export function* loginAutomatico(){
    if(!localStorage.dados) {
        const dadosUsuario = yield call(autoLogin);

        if(dadosUsuario) {
            localStorage.setItem("dados", JSON.stringify(dadosUsuario))
        }
        
        yield call(editaReducer, dadosUsuario);
        
    } else if(localStorage.dados) {

        yield call(editaReducer, JSON.parse(localStorage.getItem("dados")));
    }

}


export function* usuarioSair() {
    
    yield put(usuarioCreators.setUsuarioSair());
    localStorage.clear();
    yield call(sairUsuario);
}