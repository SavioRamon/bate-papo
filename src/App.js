import React, { useEffect } from "react";
import './App.css';

import Rotas from "./rotas";

import { Creators as usuarioCreators } from "./store/ducks/usuario";
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(usuarioCreators.loginAutomatico());
  }, [])

  return (
    <Rotas />
  )
}

export default App;
