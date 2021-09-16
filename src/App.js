import React, { useState } from "react";
import './App.css';

function App() {

  const [mensagens, setMensagens] = useState([
    {
      texto: "Olá",
    },

    {
      texto: "Tudo bem?",
    }
  ]);

  const [mensagemTexto, setMensagemTexto] = useState("");

  return (
    <div className="App">
      <div className="chat-tela">
        <div className="chat">
          
          {
            mensagens.map((mensagem)=>{
              return (
                <div className="caixa-mensagem">
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
          
          <input type="button" className="input-botao-enviar" value="enviar" />
        </div>

      </div>
    </div>
  );
}

export default App;
