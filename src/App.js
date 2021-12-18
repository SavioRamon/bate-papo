import React, { useState, useEffect, useLayoutEffect } from "react";
import './App.css';

import Rotas from "./rotas";

import { 
    recebeInfoUsuario,
    buscaUsuarioLogado 
} from "./firebase";

import { Creators as usuarioCreators } from "./store/ducks/usuario";
import { useDispatch } from "react-redux";

function App() {


    const [fezRequisicaoID, setFezRequisicaoID] = useState(false);
    const [reqID, setReqID] = useState("");

    const dispatch = useDispatch();

    useEffect(()=>{
        const idLoginStorage = localStorage.getItem("login");

        if(idLoginStorage) {
            
            setFezRequisicaoID(true);
            setReqID(idLoginStorage);
        } else {
            
            buscaUsuarioLogado(setReqID);
            setFezRequisicaoID(true);
        }
        
    }, []);

    useLayoutEffect(()=>{
        function callbackInfo(dados) {
            if(dados) {
                dispatch(usuarioCreators.setUsuario({...dados, load: true}));
            };
        };

        if(fezRequisicaoID) {
            if(reqID) {
                const funcExecutaChamadaDadosUsuario = recebeInfoUsuario();
                funcExecutaChamadaDadosUsuario(callbackInfo, reqID);

            } else {
                dispatch(usuarioCreators.setUsuario({load: true}));
            };
        };
        
    }, [reqID, dispatch]);

    return (
        <React.Fragment>
        <Rotas />
        </React.Fragment>
    );
};

export default App;
