
import React, { useState, useEffect } from "react";
import "./style.css";

import { useSelector, useDispatch } from "react-redux";

import { Creators as chatCreators } from "../../store/ducks/chats";

function Chat() {
    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);

    const chats = useSelector(state=>state.chats);
    const dispatch = useDispatch();

    const [mensagens, setMensagens] = useState("");

    const [mensagemEnviar, setMensagemEnviar] = useState({
        remetente: dadosUsuario? dadosUsuario.nome : "",
        idUsuario: dadosUsuario? dadosUsuario.id : "",
        texto: ""
    });

    useEffect(()=>{
        dispatch(chatCreators.getMensagens(chats.chatID));
    }, [])

    useEffect(()=>{
        chats.mensagensFunction && chats.mensagensFunction(setMensagens);
    }, [chats])

    useEffect(()=>{
        if(dadosUsuario){
            setMensagemEnviar({
                ...mensagemEnviar,
                remetente: dadosUsuario.nome,
                idUsuario: dadosUsuario.id
            })
        }
    }, [dadosUsuario])

    return (
        <div className="chat-componente">
    
        <div className="chat-tela">
        <div className="chat">
              
        { Array.isArray(mensagens) &&
             mensagens.map((mensagem, key)=>{
                let mensagemRemetente = "outro-usuario";
                if(dadosUsuario) {
                    mensagemRemetente = mensagem.idUsuario === dadosUsuario.id?
                    "usuario-principal"
                    :
                    "outro-usuario";
                }
                
                return (
                    <div className="area-mensagem" key={key}>
                        <p className={`mensagem ${mensagemRemetente}`}>{mensagem.texto}</p>
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
                value={mensagemEnviar.texto}
                onChange={(e)=>{
                    setMensagemEnviar({
                        ...mensagemEnviar,
                        texto: e.target.value
                    })
                }} 
            />
    
            <input type="button" className="input-botao-enviar" value="enviar" 
                onClick={()=>{
                    if(dadosUsuario) {
                        dispatch(chatCreators.enviaMensagem(chats.chatID, mensagemEnviar))
                        setMensagemEnviar({
                            ...mensagemEnviar,
                            texto: ""
                        });
                    }
                    
                }} />
            </div>
    
        </div>
    </div>
    );
}

export default Chat;