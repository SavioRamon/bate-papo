
import React, { useState, useEffect } from "react";
import "./style.css";

import { retornaMensagens } from "../../firebase";

import Anexos from "./Anexos";
import Mensagens from "./Mensagens";

import chatGeralIMG from "../../imagens/chatGeral.jpg";

import { faBars, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector, useDispatch } from "react-redux";

import { Creators as componentesCreators } from "../../store/ducks/componentes";
import { Creators as chatCreators } from "../../store/ducks/chats";

function Chat() {
    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const chatsUsuarioData = useSelector(state=>state.usuario.chats);
    const mensagens = useSelector(state=>state.chats.mensagens);

    const chats = useSelector(state=>state.chats);
    const dispatch = useDispatch();

    const [mensagemEnviar, setMensagemEnviar] = useState({
        imagem: "",
        nome: "",
        id: "",
        texto: ""
    });


    function enviaMensagem() {
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
    }



    useEffect(()=>{
        retornaMensagens(chats.chatID, (mensagens)=>{
            dispatch(chatCreators.setMensagens(mensagens));
        });
    }, [chats.chatID]);

    useEffect(()=>{
        if(dadosUsuario){
            setMensagemEnviar({
                ...mensagemEnviar,
                nome: dadosUsuario.nome,
                id: dadosUsuario.id,
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
            return chats.chatID === chatDados.idChat
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
        

        <div className="chat-tela">

            <div className="cabecalho-chat">
            
                <div className="abrir-lateral" onClick={()=>{
                    dispatch(componentesCreators.setLateralAbrir(true));
                }}>
                    <FontAwesomeIcon icon={faBars} />
                </div>

                {
                    <img src={ chatsUsuarioData? getImagemChat() : chatGeralIMG} onClick={()=>{
                        
                    }} />
                }

            </div>

            <div className="chat">
                <div className="chat-crescente">
                    
                    <Mensagens />

                </div>
            </div>
    
            <div className="area-inputs">
                
                <Anexos />

                <input
                    type="text"
                    className="input-mensagem" 
                    placeholder="Mensagem" 
                    value={mensagemEnviar.texto}
                    onKeyPress={(e)=>{
                        if(e.key === "Enter") {
                            enviaMensagem();
                            
                        }
                    }}
                    onChange={(e)=>{
                        setMensagemEnviar({
                            ...mensagemEnviar,
                            texto: e.target.value
                        })
                    }} 
                />

                <div className="botao-enviar" onClick={()=>{
                    enviaMensagem();

                }}>
                    <FontAwesomeIcon icon={ faPaperPlane }/>
                </div>
                
            </div>
        
        </div>
    </div>
    );
}

export default Chat;