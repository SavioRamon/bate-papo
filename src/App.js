import React, { useEffect } from "react";
import './App.css';

import Rotas from "./rotas";

import { Creators as usuarioCreators } from "./store/ducks/usuario";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
  const dispatch = useDispatch();

  useEffect(()=>{
    !dadosUsuario && dispatch(usuarioCreators.loginAutomatico());
  }, [])

  return (
    <React.Fragment>
      <Rotas />
    </React.Fragment>
  )
}

export default App;
