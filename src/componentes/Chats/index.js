
import React, { useState, useEffect } from "react";
import "./style.css";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector, useDispatch } from "react-redux";

import { Creators as chatCreators } from "../../store/ducks/chats";

function Chat() {
    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const chats = useSelector(state=>state.chats);
    const dispatch = useDispatch();

    const [mensagens, setMensagens] = useState("");
    const [mensagemEnviar, setMensagemEnviar] = useState({
        imagem: "",
        remetente: "",
        idUsuario: "",
        texto: ""
    });

    const [mostraInfoUsuario, setMostraInfoUsuario] = useState(false);

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
                idUsuario: dadosUsuario.id,
                imagem: dadosUsuario.imagem
            })
        }
    }, [dadosUsuario])

    useEffect(()=>{
        const chatTela = document.querySelector(".chat");
        chatTela.scrollTop = chatTela.scrollHeight;
    }, [mensagens])


    return (
    <div className="chat-componente">
        
        {mostraInfoUsuario && 
            <InfoUsuario dados={mostraInfoUsuario} mostraInfo={setMostraInfoUsuario} />
        }

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
                        <div className={`area-mensagem`} key={key}>

                            <div className={`mensagem ${mensagemRemetente}`}>  
                                <img 
                                    className="imagem-perfil-chat" 
                                    alt="imagem-perfil" 
                                    src={mensagem.imagem} 
                                    onClick={()=>{
                                        dadosUsuario &&
                                        mensagem.idUsuario !== dadosUsuario.id && setMostraInfoUsuario(mensagem);
                                    }}
                                />

                                <div className="conteudo">

                                    {mensagemRemetente === "outro-usuario" &&
                                        <p className="nome-remetente">{mensagem.remetente}</p>
                                    }
                                    
                                    <p className="mensagem-texto">{mensagem.texto}</p>
                                </div>
                            </div>
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

function InfoUsuario({ dados, mostraInfo }) {

    const [infoOpcoes, setInfoOpcoes] = useState(false);

    return (
        <div className="tela-escurecida">
            <div className="info-usuario">

                <div className="info-usuario-area-superior">
                    <input type="button" value={"<"} onClick={()=>mostraInfo(false)} />

                    <p className="info-nome">{dados.remetente}</p>

                    <div className="info-opcoes" onClick={()=>{
                        setInfoOpcoes(!infoOpcoes);
                    }}>
                        <FontAwesomeIcon icon={ faEllipsisV } />
                    </div>
                </div>

                {infoOpcoes &&
                    <div className="opcoes">
                        <p onClick={()=>{
                            setInfoOpcoes(false);
                        }}>Conversar com {dados.remetente}</p>
                    </div>
                }

                <img src={dados.imagem} alt="imagem-perfil"/>
            </div>
        </div>
    )
}

export default Chat;