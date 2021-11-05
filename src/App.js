import React, { useState, useEffect } from "react";
import './App.css';

import Rotas from "./rotas";

import { Creators as usuarioCreators } from "./store/ducks/usuario";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const [chatsAtualizados, setChatsAtualizados] = useState("");

  const usuario = useSelector(state=>state.usuario);
  const dispatch = useDispatch();

  useEffect(()=>{
    !usuario.dadosUsuario && dispatch(usuarioCreators.loginAutomatico());
  }, []);


  useEffect(()=>{
    usuario.dadosUsuario && dispatch(usuarioCreators.criaOuvinteChats(usuario.dadosUsuario.id));
  }, [usuario.dadosUsuario]);


  useEffect(()=>{
    usuario.atualizaChatsOuvinte && usuario.atualizaChatsOuvinte(setChatsAtualizados);
  }, [usuario.atualizaChatsOuvinte]);


  useEffect(()=>{
    chatsAtualizados && dispatch(usuarioCreators.setAllChats(chatsAtualizados));
  }, [chatsAtualizados]);

  return (
    <React.Fragment>
      <Rotas />
    </React.Fragment>
  )
}

export default App;
