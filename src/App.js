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
    <React.Fragment>
      <Rotas />
    </React.Fragment>
  )
}

export default App;
