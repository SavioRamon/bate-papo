
import React, { useState, useEffect } from "react";
import "./style.css";

import { useSelector, useDispatch } from "react-redux";

import { Creators as chatCreators } from "../../store/ducks/chats";

function Chat() {

    const chatID = useSelector(state=>state.chats.chatID);
    const mensagensFunction = useSelector(state=>state.chats.mensagensFunction);
    const dispatch = useDispatch();

    const [mensagens, setMensagens] = useState("");

    const [mensagemTexto, setMensagemTexto] = useState("");

    useEffect(()=>{
        dispatch(chatCreators.getMensagens(chatID));
    }, [])

    useEffect(()=>{
        mensagensFunction && mensagensFunction(setMensagens);
    }, [mensagensFunction])

    return (
        <div className="chat-componente">
    
        <div className="chat-tela">
        <div className="chat">
              
        { Array.isArray(mensagens) &&
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