import React, { useEffect } from "react";
import './App.css';

import Rotas from "./rotas";

import { Creators as usuarioCreators } from "./store/ducks/usuario";
import { useSelector, useDispatch } from "react-redux";

function App() {

  const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(usuarioCreators.loginAutomatico());
  }, [])

  return (
    <React.Fragment>
      {typeof dadosUsuario !== "undefined" &&
        <Rotas />
      }
    </React.Fragment>
  )
}

export default App;
