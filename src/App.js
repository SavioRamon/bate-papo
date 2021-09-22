import React, { useState } from "react";
import './App.css';

import Lateral from "./componentes/Lateral";
import Chats from "./componentes/Chats";

function App() {
  return (
    <div className="app">
      <Lateral />
      <Chats />
    </div>
  )
}

export default App;
