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
      </div>
    </div>
  );
}

export default App;
