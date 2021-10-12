import React, { useEffect, useState } from "react";
import "./style.css";

import chatGeralImg from "../../imagens/chatGeral.jpg";

import PerfilConfig from "../PerfilConfig";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import { Creators as chatCreators } from "../../store/ducks/chats";
import { Creators as usuarioCreators } from "../../store/ducks/usuario";
import { useDispatch, useSelector } from "react-redux";

function  OpcoesLateral({ setOpcoesAbrir }) {
    const dispatch = useDispatch();
    return (
        <div className="lista-opcoes" onClick={()=>setOpcoesAbrir(false)}>
            <div className="usuario-sair" onClick={()=>{
                dispatch(usuarioCreators.usuarioSair());
            }}>
                Sair
            </div>
        </div>
    )
}

function Lateral(){

    const chatSelecionado = useSelector(state=>state.chats.chatID);
    const usuario = useSelector(state=>state.usuario);
    const dispatch = useDispatch();

    console.log(usuario)
    
    const [opcoesAbrir, setOpcoesAbrir] = useState(false);

    const chatSelecionadoEstilo = {
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    }

    useEffect(()=>{

    })

    return (
        <div className="lateral">

            <div className="lateral-cabecalho">
                {usuario.dadosUsuario &&
                    <div className="cabecalho-conteudo">       
                        <PerfilConfig />

                        <div className="icone-opcoes" onClick={()=>setOpcoesAbrir(!opcoesAbrir)}>
                            <FontAwesomeIcon icon={ faEllipsisV } />
                        </div>

                        {opcoesAbrir &&
                            <OpcoesLateral setOpcoesAbrir={setOpcoesAbrir} />
                        }
                    </div>
                }
                
                {!usuario.dadosUsuario && 
                    <React.Fragment>
                        <Link to="/login" className="link-selecao">
                            Login
                        </Link>

                        <Link to="/registrar" className="link-selecao">
                            Registrar
                        </Link>
                    </React.Fragment>
                }
                
            </div>


            <div className="chats">
                {usuario.chats? 
                    usuario.chats.map((chat, key)=>{
                        return (
                            <div 
                                className="chats-selecao" key={key} 
                                onClick={()=>{
                                    dispatch(chatCreators.chatSelecionado(chat.id));
                                }}
                                style={chatSelecionado === chat.id? chatSelecionadoEstilo : {} }
                            >
                                <img src={chat.imagem? chat.imagem : chatGeralImg} />
                                <p>{chat.chatNome}</p>
                            </div>
                        )
                    })
                    
                    :

                    <div 
                        className="chats-selecao" 
                        style={chatSelecionadoEstilo}
                    >
                        <img src={chatGeralImg} />
                        <p>Geral</p>
                    </div>
                }
            </div>

        </div>
    )
}

export default Lateral;