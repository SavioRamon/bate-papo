
import React, { useState } from "react";
import "./style.css";

function Chat() {
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
        <div className="chat-componente">
    
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

export default Chat;