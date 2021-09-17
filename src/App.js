import React, { useState } from "react";
import './App.css';

import Lateral from "./componentes/Lateral";

function App() {

  const mensagens = [
    {
      texto: "oi"
    },
    {
      texto: "tudo bem?"
    }
  ]

  const [mensagemTexto, setMensagemTexto] = useState("");

  return (
    <div className="App">

      <Lateral />

      <div className="chat-tela">
        <div className="chat">
          
          {
            mensagens.map((mensagem, key)=>{
              return (
                <div className="caixa-mensagem" key={key}>
                  <p className="caixa-mensagem-texto">{mensagem.texto}</p>
                </div>  
              )
            })
          }

        </div>

        <div className="area-inputs">
          <input
            type="text"
            className="input-mensagem" 
            placeholder="Mensagem" 
            value={mensagemTexto}
            onChange={(value)=>{setMensagemTexto(value.target.value)}} 
          />

          <input type="button" className="input-botao-enviar" value="enviar" 
            onClick={()=>mensagens.push({mensagemTexto})} />
        </div>

      </div>
    </div>
  );
}

export default App;
