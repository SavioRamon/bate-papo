import { call } from "redux-saga/effects";
import { 
    editarImagemPerfil, 
    editarDadosUsuario,

} from "../../firebase";


export function* editarImagem(dados) {
    yield call(editarImagemPerfil, dados.payload);
}


export function* editarUsuario(dados) {
    yield call(editarDadosUsuario, dados.payload.dadosEditados);
}

