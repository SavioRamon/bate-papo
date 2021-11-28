import React, { useState, useEffect } from "react";
import './App.css';

import Rotas from "./rotas";

import { Creators as usuarioCreators } from "./store/ducks/usuario";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const [usuarioAtualizado, setUsuarioAtualizado] = useState("");

  const usuario = useSelector(state=>state.usuario);
  const dispatch = useDispatch();

  useEffect(()=>{
    !usuario.dadosUsuario && dispatch(usuarioCreators.loginAutomatico());
  }, []);


  useEffect(()=>{
    usuario.dadosUsuario && dispatch(usuarioCreators.atualizaUsuario(usuario.dadosUsuario.id));
  }, [!!usuario.dadosUsuario && !usuario.ouvinteUsuario]);


  useEffect(()=>{
    usuario.ouvinteUsuario && usuario.ouvinteUsuario(setUsuarioAtualizado);
  }, [!!usuario.ouvinteUsuario]);


  useEffect(()=>{
    
    if(usuarioAtualizado){
      dispatch(usuarioCreators.setUsuario(usuarioAtualizado));
      localStorage.clear();
      localStorage.setItem("dados", JSON.stringify(usuarioAtualizado));

    }
  }, [usuarioAtualizado]);

  return (
    <React.Fragment>
      <Rotas />
    </React.Fragment>
  )
}

export default App;
