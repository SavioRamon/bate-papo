
import React, { useState, useEffect } from "react";
import "./style.css";

import Anexos from "./Anexos";

import chatGeralIMG from "../../imagens/chatGeral.jpg";

import { faComments, faBars, faTimes, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector, useDispatch } from "react-redux";

import { Creators as componentesCreators } from "../../store/ducks/componentes";
import { Creators as chatCreators } from "../../store/ducks/chats";

function Chat() {
    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const chatsUsuarioData = useSelector(state=>state.usuario.chats);

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
    }, [chats.chatID])

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



    function getImagemChat() {
        const dados = chatsUsuarioData.filter((chatDados)=>{
            return chats.chatID === chatDados.id
        })
        if(dados[0]) {
            if(dados[0].imagem) {
                return dados[0].imagem;
    
            } else if(!dados[0].imagem) {
                return chatGeralIMG;
            } 
        } else {
            return chatGeralIMG;
        }
    }


    return (
    <div className="chat-componente">
        
        {mostraInfoUsuario && 
            <InfoUsuario dados={mostraInfoUsuario} mostraInfo={setMostraInfoUsuario} />
        }

        <div className="chat-tela">

            <div className="cabecalho-chat">
            
                <div className="abrir-lateral" onClick={()=>{
                    dispatch(componentesCreators.setLateralAbrir(true));
                }}>
                    <FontAwesomeIcon icon={faBars} />
                </div>

                {
                    <img src={ chatsUsuarioData? getImagemChat() : chatGeralIMG} />
                }

            </div>

            <div className="chat">
                <div className="chat-crescente">
                    { Array.isArray(mensagens) &&
                        mensagens.map((mensagem, key)=>{
                            

                            let remetente = "outro-usuario";
                            if(dadosUsuario) {
                                remetente = mensagem.idUsuario === dadosUsuario.id?
                                "usuario-principal"
                                :
                                "outro-usuario";
                            }
                            
                            return (
                                <div className={`area-mensagem`} key={key}>

                                    <div className={`mensagem ${remetente}`}>
                                        {remetente === "outro-usuario" &&
                                            <div className="mensagem-conteudo-superior">
                                                <img 
                                                    className="imagem-perfil-chat"
                                                    src={mensagem.imagem} 
                                                    onClick={()=>{
                                                        dadosUsuario &&
                                                        mensagem.idUsuario !== dadosUsuario.id && setMostraInfoUsuario(mensagem);
                                                    }}
                                                />
                                                
                                                <p className="nome-remetente">{mensagem.remetente}</p>
                                            </div>  
                                        }
                                        
                                        
                                        <div className="horario">
                                            {mensagem.horarioEnvio}
                                        </div>

                                        <div className="conteudo">

                                            
                                            {mensagem.texto &&
                                                <p className="mensagem-texto">{mensagem.texto}</p>
                                            }
                                            
                                            
                                            {mensagem.midia && mensagem.tipoMidia === "image" &&
                                                <img src={mensagem.midia} className="mensagem-midia" />
                                            }

                                            {mensagem.midia && mensagem.tipoMidia === "video" &&
                                                <video className="mensagem-midia" controls>
                                                    <source src={mensagem.midia} />
                                                </video>
                                            }


                                        </div>
                                    </div>
                                </div>  
                            )
                        })
                    }
                </div>
            </div>
    
            <div className="area-inputs">
                
                <Anexos />

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

                <div className="botao-enviar" onClick={()=>{
                    if(dadosUsuario) {

                        const preparaMensagem = {
                            ...mensagemEnviar,
                            texto: mensagemEnviar.texto.trim()
                        }

                        if(preparaMensagem.texto) {
                            dispatch(chatCreators.enviaMensagemTexto(chats.chatID, preparaMensagem))
                            setMensagemEnviar({
                                ...mensagemEnviar,
                                texto: ""
                            });
                        }
                            
                    }
                        
                }}>
                    <FontAwesomeIcon icon={ faPaperPlane }/>
                </div>
                
            </div>
        
        </div>
    </div>
    );
}

function InfoUsuario({ dados, mostraInfo }) {

    const usuarioPrincipal = useSelector(state=>state.usuario.dadosUsuario);
    const dispatch = useDispatch();
    

    const segundoUsuario = {
        nome: dados.remetente,
        imagem: dados.imagem,
        id: dados.idUsuario
    }

    return (
        <div className="tela-escurecida">
            <div className="info-usuario">

                <div className="info-usuario-area-superior">
                    <div className="info-usuario-sair" onClick={()=>{
                        mostraInfo(false);
                    }}>
                        <FontAwesomeIcon icon={faTimes}>

                        </FontAwesomeIcon>
                    </div>

                </div>

                <div className="info-usuario-dados">
                    
                    <img src={dados.imagem} alt="imagem-perfil"/>
                    <p className="info-nome">{dados.remetente}</p>

                </div>

                <div className="info-opcoes">
                    <div onClick={()=>{
                        dispatch(chatCreators.novoChatPrivado(usuarioPrincipal, segundoUsuario));

                        mostraInfo(false);
                    }}>
                        <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
                        <p>conversar</p>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default Chat;