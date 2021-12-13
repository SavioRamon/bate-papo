import React, { useState, useEffect } from "react";
import './App.css';

import Rotas from "./rotas";

import { atualizaUsuario } from "./firebase";

import { Creators as usuarioCreators } from "./store/ducks/usuario";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const att = atualizaUsuario();
  const [usuarioAtualizado, setUsuarioAtualizado] = useState("");

  const usuario = useSelector(state=>state.usuario);
  const dispatch = useDispatch();

  useEffect(()=>{
    !usuario.dadosUsuario && dispatch(usuarioCreators.loginAutomatico());
  }, [dispatch, usuario.dadosUsuario]);


  useEffect(()=>{
    /* Lembrar!
      existe um bug aqui
    */
    usuario.dadosUsuario && att(setUsuarioAtualizado, usuario.dadosUsuario.id);
    
  }, [!!usuario.dadosUsuario]);


  useEffect(()=>{
    if(usuarioAtualizado){
      dispatch(usuarioCreators.setUsuario(usuarioAtualizado));
    }
  }, [dispatch, usuarioAtualizado]);

  return (
    <React.Fragment>
      <Rotas />
    </React.Fragment>
  )
}

export default App;
